import { getISOWeek, getISOWeekYear } from "date-fns";

export interface GeneratedCCCId {
    id: string;
    contributor: string;
    year: number;
    week: number;
    sequence: number;
}

interface WeekState {
    year: number;
    week: number;
    sequence: number;
    history: GeneratedCCCId[];
}

export class CCCIdGenerator {
    private state: Map<string, WeekState> = new Map();
    private static readonly FIRST_ASSIGNABLE = 3;
    private static readonly MAX_SEQUENCE = 999;

    generate(contributor: string, externalHighWater: number = 0): GeneratedCCCId | null {
        if (!/^[A-Z]{3}$/.test(contributor)) {
            throw new Error(`Invalid CCC: ${contributor}`);
        }

        const now = new Date();
        const year = getISOWeekYear(now);
        const week = getISOWeek(now);
        const weekKey = `${contributor}_${year}_${week}`;

        let weekState = this.state.get(weekKey);
        if (!weekState || weekState.year !== year || weekState.week !== week) {
            weekState = { year, week, sequence: CCCIdGenerator.FIRST_ASSIGNABLE, history: [] };
            this.state.set(weekKey, weekState);
        }

        const effectiveSequence = Math.max(weekState.sequence, externalHighWater);
        const nextSequence = effectiveSequence + 1;

        if (nextSequence > CCCIdGenerator.MAX_SEQUENCE) return null;

        weekState.sequence = nextSequence;

        const cccId: GeneratedCCCId = {
            id: `${contributor}_${year}-W${week.toString().padStart(2, "0")}_${nextSequence.toString().padStart(3, "0")}`,
            contributor,
            year,
            week,
            sequence: nextSequence,
        };

        weekState.history.push(cccId);
        return cccId;
    }

    getHighWaterMark(contributor: string): number {
        const now = new Date();
        const weekKey = `${contributor}_${getISOWeekYear(now)}_${getISOWeek(now)}`;
        return this.state.get(weekKey)?.sequence || 0;
    }

    setHighWaterMark(contributor: string, sequence: number): void {
        const now = new Date();
        const year = getISOWeekYear(now);
        const week = getISOWeek(now);
        const weekKey = `${contributor}_${year}_${week}`;
        let state = this.state.get(weekKey);
        if (!state) {
            state = { year, week, sequence, history: [] };
            this.state.set(weekKey, state);
        } else {
            state.sequence = Math.max(state.sequence, sequence);
        }
    }

    getHistory(contributor: string, week?: number): GeneratedCCCId[] {
        const now = new Date();
        const weekKey = `${contributor}_${getISOWeekYear(now)}_${week || getISOWeek(now)}`;
        return this.state.get(weekKey)?.history || [];
    }

    getTotalGenerated(): number {
        let total = 0;
        for (const state of this.state.values()) total += state.history.length;
        return total;
    }
}
