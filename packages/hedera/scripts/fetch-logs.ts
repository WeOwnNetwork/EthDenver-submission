
import { MirrorNode } from '../src/utils/mirror-node.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const accountId = process.env.HEDERA_ACCOUNT_ID;

if (!accountId) {
    console.error("❌ HEDERA_ACCOUNT_ID not found in .env");
    process.exit(1);
}

async function main() {
    await MirrorNode.printLogs(accountId!, 50);
}

main();
