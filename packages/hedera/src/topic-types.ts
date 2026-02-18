/**
 * HCS Topic categories for the CCC Gateway
 * Each topic type = separate HCS topic for clean indexing
 */
export enum HCSTopicType {
    CCC_ID = "ccc-id",                     // CCC-ID attestations
    CONTEXT_VOLLEY = "context-volley",     // Agent-to-agent messages
    GOVERNANCE = "governance",             // Rule locks, #BadAgent
    VSA = "vsa",                           // Verification attestations
    AGENT_REGISTRY = "agent-registry",     // Agent registration events
    SEASON = "season",                     // Season lifecycle events
}
