import { vi } from "vitest";

// Mock @hashgraph/sdk
vi.mock("@hashgraph/sdk", () => {
    return {
        Client: {
            forTestnet: vi.fn().mockReturnThis(),
            forMainnet: vi.fn().mockReturnThis(),
            setOperator: vi.fn().mockReturnThis(),
            close: vi.fn(),
        },
        PrivateKey: {
            fromString: vi.fn((key) => ({
                toString: () => key,
                publicKey: { toString: () => "mock-public-key" }
            })),
            fromStringECDSA: vi.fn((key) => ({
                toString: () => key,
                publicKey: { toString: () => "mock-public-key" }
            })),
        },
        AccountId: {
            fromString: vi.fn((id) => ({
                toString: () => id,
            })),
        },
        TopicId: {
            fromString: vi.fn((id) => ({
                toString: () => id,
            })),
        },
        TokenId: {
            fromString: vi.fn((id) => ({
                toString: () => id,
            })),
        },
        Hbar: vi.fn(function (amount) {
            return {
                toTinybars: () => amount * 100000000,
                toString: () => `${amount} ℏ`,
            };
        }),
        // Transaction Mocks
        TopicCreateTransaction: vi.fn().mockImplementation(function () {
            return {
                setTopicMemo: vi.fn().mockReturnThis(),
                setSubmitKey: vi.fn().mockReturnThis(),
                setAdminKey: vi.fn().mockReturnThis(),
                freezeWith: vi.fn().mockReturnThis(),
                sign: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValue({
                    getReceipt: vi.fn().mockResolvedValue({
                        topicId: { toString: () => "0.0.99999" },
                        status: { toString: () => "SUCCESS" }
                    }),
                    transactionId: { toString: () => "0.0.12345@1234567890.000000000" }
                }),
            };
        }),
        TopicMessageSubmitTransaction: vi.fn().mockImplementation(function () {
            return {
                setTopicId: vi.fn().mockReturnThis(),
                setMessage: vi.fn().mockReturnThis(),
                freezeWith: vi.fn().mockReturnThis(),
                sign: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValue({
                    getReceipt: vi.fn().mockResolvedValue({
                        topicSequenceNumber: { toNumber: () => 42 },
                        status: { toString: () => "SUCCESS" }
                    }),
                    transactionId: { toString: () => "0.0.12345@1234567890.000000000" }
                }),
            };
        }),
        TopicInfoQuery: vi.fn().mockImplementation(function () {
            return {
                setTopicId: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValue({
                    topicMemo: "Mock Topic Memo",
                    sequenceNumber: { toNumber: () => 42 },
                }),
            };
        }),
        // Token Mocks
        TokenCreateTransaction: vi.fn().mockImplementation(function () {
            return {
                setTokenName: vi.fn().mockReturnThis(),
                setTokenSymbol: vi.fn().mockReturnThis(),
                setDecimals: vi.fn().mockReturnThis(),
                setInitialSupply: vi.fn().mockReturnThis(),
                setTreasuryAccountId: vi.fn().mockReturnThis(),
                setAdminKey: vi.fn().mockReturnThis(),
                setSupplyKey: vi.fn().mockReturnThis(),
                setFreezeKey: vi.fn().mockReturnThis(),
                setWipeKey: vi.fn().mockReturnThis(),
                setPauseKey: vi.fn().mockReturnThis(),
                setKycKey: vi.fn().mockReturnThis(),
                setCustomFees: vi.fn().mockReturnThis(),
                setTokenType: vi.fn().mockReturnThis(),
                setSupplyType: vi.fn().mockReturnThis(),
                setMaxSupply: vi.fn().mockReturnThis(),
                setTokenMemo: vi.fn().mockReturnThis(),
                freezeWith: vi.fn().mockReturnThis(),
                sign: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValue({
                    getReceipt: vi.fn().mockResolvedValue({
                        tokenId: { toString: () => "0.0.88888" },
                        status: { toString: () => "SUCCESS" }
                    }),
                    transactionId: { toString: () => "0.0.12345@1234567890.000000000" }
                }),
            };
        }),
        TokenMintTransaction: vi.fn().mockImplementation(function () {
            return {
                setTokenId: vi.fn().mockReturnThis(),
                setAmount: vi.fn().mockReturnThis(),
                addMetadata: vi.fn().mockReturnThis(),
                freezeWith: vi.fn().mockReturnThis(),
                sign: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValue({
                    getReceipt: vi.fn().mockResolvedValue({
                        status: { toString: () => "SUCCESS" },
                        serials: [{ toNumber: () => 1 }]
                    }),
                    transactionId: { toString: () => "0.0.12345@1234567890.000000000" }
                }),
            };
        }),
        TokenFreezeTransaction: vi.fn().mockImplementation(function () {
            return {
                setTokenId: vi.fn().mockReturnThis(),
                setAccountId: vi.fn().mockReturnThis(),
                freezeWith: vi.fn().mockReturnThis(),
                sign: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValue({
                    getReceipt: vi.fn().mockResolvedValue({
                        status: { toString: () => "SUCCESS" }
                    }),
                    transactionId: { toString: () => "0.0.12345@1234567890.000000000" }
                }),
            };
        }),
        TokenPauseTransaction: vi.fn().mockImplementation(function () {
            return {
                setTokenId: vi.fn().mockReturnThis(),
                freezeWith: vi.fn().mockReturnThis(),
                sign: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValue({
                    getReceipt: vi.fn().mockResolvedValue({
                        status: { toString: () => "SUCCESS" }
                    }),
                    transactionId: { toString: () => "0.0.12345@1234567890.000000000" }
                }),
            };
        }),
        CustomRoyaltyFee: vi.fn().mockImplementation(function () {
            return {
                setNumerator: vi.fn().mockReturnThis(),
                setDenominator: vi.fn().mockReturnThis(),
                setFeeCollectorAccountId: vi.fn().mockReturnThis(),
                setFallbackFee: vi.fn().mockReturnThis(),
            };
        }),
        CustomFixedFee: vi.fn().mockImplementation(function () {
            return {
                setAmount: vi.fn().mockReturnThis(),
                setDenominatingTokenId: vi.fn().mockReturnThis(),
                setFeeCollectorAccountId: vi.fn().mockReturnThis(),
                setHbarAmount: vi.fn().mockReturnThis(),
            };
        }),
        CustomFractionalFee: vi.fn().mockImplementation(function () {
            return {
                setNumerator: vi.fn().mockReturnThis(),
                setDenominator: vi.fn().mockReturnThis(),
                setMin: vi.fn().mockReturnThis(),
                setMax: vi.fn().mockReturnThis(),
                setFeeCollectorAccountId: vi.fn().mockReturnThis(),
                setAssessmentMethod: vi.fn().mockReturnThis(),
            };
        }),
        TokenType: {
            FungibleCommon: { toString: () => "FUNGIBLE_COMMON" },
            NonFungibleUnique: { toString: () => "NON_FUNGIBLE_UNIQUE" },
        },
        TokenSupplyType: {
            Infinite: { toString: () => "INFINITE" },
            Finite: { toString: () => "FINITE" },
        },
        FeeAssessmentMethod: {
            Inclusive: { toString: () => "INCLUSIVE" },
            Exclusive: { toString: () => "EXCLUSIVE" },
        },
        Timestamp: {
            fromDate: vi.fn(),
        },
        Status: {
            Success: { toString: () => "SUCCESS" }
        }
    };
});
