import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult, TokenMintResult } from "./types";

export async function createGovToken(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const tx = await new TokenCreateTransaction()
        .setTokenName("CCC Governance Token")
        .setTokenSymbol("GOV")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(0)
        .setInitialSupply(0)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setTokenMemo("GOV — FedArch Governance Token | team weown")
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

export async function mintGovReward(
    tokenId: string,
    amount: number
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .setAmount(amount)
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);
    client.close();

    return {
        amount,
        transactionId: response.transactionId.toString(),
    };
}
