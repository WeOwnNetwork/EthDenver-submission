import {
    TokenFreezeTransaction,
    TokenPauseTransaction,
    TokenId,
    AccountId,
} from "@hashgraph/sdk";
import { createClient, getOperatorKey } from "../config.js";

import { waitForPropagation } from "../utils/network-check";

export async function freezeBadAgent(
    cccTokenId: string,
    agentAccountId: string,
    reason: string
): Promise<string> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenFreezeTransaction()
        .setTokenId(TokenId.fromString(cccTokenId))
        .setAccountId(AccountId.fromString(agentAccountId))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);

    console.log(`🚨 #BadAgent FREEZE: ${agentAccountId} — ${reason}`);
    await waitForPropagation(3000);

    client.close();
    return response.transactionId.toString();
}

export async function pauseForSeasonTransition(
    tokenId: string
): Promise<string> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const tx = await new TokenPauseTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);

    console.log(`⏸️ Token ${tokenId} PAUSED for season transition`);
    await waitForPropagation(3000);

    client.close();
    return response.transactionId.toString();
}
