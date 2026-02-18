import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
    CustomRoyaltyFee,
    CustomFixedFee,
    Hbar,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult, TokenMintResult, CCCIdNFTMetadata } from "./types";

export async function createCCCIdNFTCollection(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const royaltyFee = new CustomRoyaltyFee()
        .setNumerator(5)
        .setDenominator(100)
        .setFeeCollectorAccountId(operatorId)
        .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(1)));

    const tx = await new TokenCreateTransaction()
        .setTokenName("CCC-ID Attestation")
        .setTokenSymbol("CCCID")
        .setTokenType(TokenType.NonFungibleUnique)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setFreezeKey(operatorKey.publicKey)
        .setCustomFees([royaltyFee])
        .setTokenMemo("CCC-ID NFT — FedArch Contribution Attestation | team weown")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

export async function mintCCCIdNFT(
    tokenId: string,
    metadata: CCCIdNFTMetadata
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .addMetadata(Buffer.from(JSON.stringify(metadata)))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    client.close();

    return {
        serial: (receipt.serials[0] as Long).toNumber(),
        transactionId: response.transactionId.toString(),
    };
}
