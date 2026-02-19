// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title CCCLib — Contributor Code Convention Utilities
/// @notice Validation and parsing for CCC-ID format: <CCC>_<YYYY>-W<WW>_<NNN>
library CCCLib {
    function isValidCCC(string memory ccc) internal pure returns (bool) {
        bytes memory b = bytes(ccc);
        if (b.length != 3) return false;
        for (uint256 i = 0; i < 3; i++) {
            if (b[i] < 0x41 || b[i] > 0x5A) return false;
        }
        return true;
    }

    function isValidWeek(uint8 week) internal pure returns (bool) {
        return week >= 1 && week <= 53;
    }

    function isValidSequence(uint16 sequence) internal pure returns (bool) {
        return sequence >= 1 && sequence <= 999;
    }

    function isReservedSlot(uint16 sequence) internal pure returns (bool) {
        return sequence >= 1 && sequence <= 3;
    }

    function firstAssignable() internal pure returns (uint16) {
        return 4;
    }

    function hashCCCId(
        string memory ccc,
        uint16 year,
        uint8 week
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(ccc, year, week));
    }

    function buildCCCId(
        string memory ccc,
        uint16 year,
        uint8 week,
        uint16 sequence
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    ccc,
                    "_",
                    _uint16ToString(year),
                    "-W",
                    _uint8PadTwo(week),
                    "_",
                    _uint16PadThree(sequence)
                )
            );
    }

    function _uint16ToString(
        uint16 value
    ) private pure returns (string memory) {
        if (value == 0) return "0";
        uint16 temp = value;
        uint8 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + uint16(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function _uint8PadTwo(uint8 value) private pure returns (string memory) {
        bytes memory buffer = new bytes(2);
        buffer[0] = bytes1(uint8(48 + value / 10));
        buffer[1] = bytes1(uint8(48 + (value % 10)));
        return string(buffer);
    }

    function _uint16PadThree(
        uint16 value
    ) private pure returns (string memory) {
        bytes memory buffer = new bytes(3);
        buffer[0] = bytes1(uint8(48 + value / 100));
        buffer[1] = bytes1(uint8(48 + ((value / 10) % 10)));
        buffer[2] = bytes1(uint8(48 + (value % 10)));
        return string(buffer);
    }
}
