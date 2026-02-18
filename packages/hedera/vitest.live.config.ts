
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        // Exclude setupFiles to prevent mocking
        setupFiles: [],
        include: ['__tests__/e2e-live.test.ts', '__tests__/hts-verification.test.ts'],
        testTimeout: 300000, // 5 minutes for HCS consensus
        hookTimeout: 120000,
    },
});
