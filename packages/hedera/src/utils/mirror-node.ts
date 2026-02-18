
import axios from 'axios';

const MIRROR_NODE_URL = 'https://testnet.mirrornode.hedera.com';

export interface TransactionLog {
    consensus_timestamp: string;
    transaction_id: string;
    result: string;
    name: string;
    memo_base64: string;
}

export class MirrorNode {
    static async getLogs(accountId: string, limit: number = 20) {
        try {
            const url = `${MIRROR_NODE_URL}/api/v1/transactions?account.id=${accountId}&order=desc&limit=${limit}`;
            const response = await axios.get(url);

            return response.data.transactions.map((tx: any) => ({
                time: new Date(parseFloat(tx.consensus_timestamp) * 1000).toISOString(),
                type: tx.name,
                status: tx.result,
                memo: tx.memo_base64 ? Buffer.from(tx.memo_base64, 'base64').toString('utf-8') : '',
                id: tx.transaction_id
            }));
        } catch (error) {
            console.error("Error fetching from Mirror Node:", error);
            return [];
        }
    }

    static async printLogs(accountId: string, limit: number = 20) {
        console.log(`\n📜 Fetching last ${limit} transactions for ${accountId}...\n`);
        const logs = await this.getLogs(accountId, limit);

        if (logs.length === 0) {
            console.log("No transactions found.");
            return;
        }

        console.table(logs.map(l => ({
            Time: l.time.split('T')[1].replace('Z', ''),
            Type: l.type,
            Status: l.status === 'SUCCESS' ? '✅ SUCCESS' : `❌ ${l.status}`,
            Memo: l.memo.length > 50 ? l.memo.substring(0, 50) + '...' : l.memo
        })));
    }
}
