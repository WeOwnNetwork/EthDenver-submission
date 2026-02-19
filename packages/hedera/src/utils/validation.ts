
import { Client, TokenId, TopicId, TokenInfoQuery, TopicInfoQuery, TokenType } from "@hashgraph/sdk";

/**
 * Validates that a string is a valid Hedera ID in the format shard.realm.num
 * e.g. "0.0.12345"
 */
export function isValidHederaId(id: string): boolean {
    // Regex for shard.realm.num (allowing for multiple digits)
    // ^\d+\.\d+\.\d+$
    const regex = /^\d+\.\d+\.\d+$/;
    return regex.test(id);
}

/**
 * Validates that a Token exists on-chain and matches the expected type.
 * @param client Hedera Client
 * @param tokenId Token ID string (0.0.xxx)
 * @param expectedType TokenType (FungibleCommon or NonFungibleUnique)
 */
export async function validateTokenType(
    client: Client,
    tokenId: string,
    expectedType: TokenType
): Promise<boolean> {
    try {
        const info = await new TokenInfoQuery()
            .setTokenId(TokenId.fromString(tokenId))
            .execute(client);

        // TokenType is an object/enum in SDK, simpler comparison via string or strict equality if same instance
        // SDK returns info.tokenType which is the enum

        // Debug log
        console.log(`    ℹ️ Token ${tokenId} Type: ${info.tokenType?.toString()}`);

        return info.tokenType === expectedType;
    } catch (error) {
        console.error(`    ❌ Failed to validate token ${tokenId}:`, error);
        return false;
    }
}

/**
 * Validates that a Topic exists on-chain.
 */
export async function validateTopic(client: Client, topicId: string): Promise<boolean> {
    try {
        const info = await new TopicInfoQuery()
            .setTopicId(TopicId.fromString(topicId))
            .execute(client);

        console.log(`    ℹ️ Topic ${topicId} Sequence: ${info.sequenceNumber.toString()}`);
        return true;
    } catch (error) {
        console.error(`    ❌ Failed to validate topic ${topicId}:`, error);
        return false;
    }
}
