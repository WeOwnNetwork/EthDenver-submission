import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult } from "./types";

export async function createCoopMembershipCollection(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const tx = await new TokenCreateTransaction()
        .setTokenName("WeOwnNet Cooperative Membership")
        .setTokenSymbol("COOPMEM")
        .setTokenType(TokenType.NonFungibleUnique)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setFreezeKey(operatorKey.publicKey)
        .setKycKey(operatorKey.publicKey)
        .setTokenMemo("Cooperative Membership — ♾️ WeOwnNet 🌐 | team weown")
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
