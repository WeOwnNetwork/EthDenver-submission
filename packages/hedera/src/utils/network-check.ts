
/**
 * Utility to ensure Hedera resources are propagated before use.
 * The Mirror Node or occasional gossip lag can cause "INVALID_ID" 
 * errors if used immediately after creation receipt.
 */
export async function waitForPropagation(ms: number = 3000): Promise<void> {
    console.log(`    ⏳ Waiting ${ms}ms for network propagation...`);
    return new Promise(resolve => setTimeout(resolve, ms));
}
