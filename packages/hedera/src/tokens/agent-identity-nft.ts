import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey } from "../config";
import type { TokenCreateResult, TokenMintResult, AgentIdMetadata } from "./types";

export async function createAgentIdCollection(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const tx = await new TokenCreateTransaction()
        .setTokenName("FedArch Agent Identity")
        .setTokenSymbol("AGENTID")
        .setTokenType(TokenType.NonFungibleUnique)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(999)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setTokenMemo("Agent Identity NFT — FedArch | team weown")
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

export async function mintAgentId(
    tokenId: string,
    metadata: AgentIdMetadata
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
