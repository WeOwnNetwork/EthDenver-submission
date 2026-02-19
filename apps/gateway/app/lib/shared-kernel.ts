export interface Rule {
    id: string;
    description: string;
    immutable: boolean;
    status: "LOCKED" | "PROPOSED" | "DEPRECATED";
    category: "identity" | "workspace" | "governance" | "operational" | "instance";
}

export interface ValidationResult {
    allowed: boolean;
    violations: string[];
    warnings: string[];
}

export class SharedKernel {
    private rules: Map<string, Rule> = new Map();
    private lockedCount = 0;

    constructor() {
        const rules: Rule[] = [
            { id: "R-011", description: "#OnlyHumanApproves", immutable: true, status: "LOCKED", category: "governance" },
            { id: "R-194", description: "CCC-ID ONLY in CCC workspace", immutable: true, status: "LOCKED", category: "workspace" },
            { id: "R-197", description: "Doc gen = #MetaAgent ONLY", immutable: true, status: "LOCKED", category: "governance" },
            { id: "R-206", description: "ADMIN NEVER generates CCC-ID", immutable: true, status: "LOCKED", category: "identity" },
            { id: "R-168", description: "CCC-ID tied to contributor", immutable: false, status: "LOCKED", category: "operational" },
            { id: "R-169", description: "Resets at ISO week boundary", immutable: false, status: "LOCKED", category: "operational" },
            { id: "R-181", description: "_001 = #WeeklySummary", immutable: false, status: "LOCKED", category: "operational" },
            { id: "R-201", description: "_002 = #WeeklyPlan", immutable: false, status: "LOCKED", category: "operational" },
            { id: "R-202", description: "_003 = #WeeklyReflection", immutable: false, status: "LOCKED", category: "operational" },
            { id: "R-212", description: "Cross-instance deconfliction", immutable: false, status: "LOCKED", category: "operational" },
        ];
        rules.forEach((r) => { this.rules.set(r.id, r); this.lockedCount++; });
    }

    validateCCCId(ctx: { workspace: string; username?: string }): ValidationResult {
        const violations: string[] = [];
        if (ctx.workspace !== "CCC") violations.push("R-194");
        if (ctx.username?.startsWith("a-")) violations.push("R-206");
        return { allowed: violations.length === 0, violations, warnings: [] };
    }

    validateGovernance(ctx: { action: string; approvalCccId?: string; agentRole?: string }): ValidationResult {
        const violations: string[] = [];
        if (ctx.action === "RULE_LOCKED" && !ctx.approvalCccId) violations.push("R-011");
        if (ctx.action === "BAD_AGENT_FLAGGED" && ctx.agentRole !== "orchestrator") violations.push("UNAUTHORIZED");
        return { allowed: violations.length === 0, violations, warnings: [] };
    }

    lockRule(id: string, description: string, category: Rule["category"]): Rule {
        const rule: Rule = { id, description, immutable: false, status: "LOCKED", category };
        this.rules.set(id, rule);
        this.lockedCount++;
        return rule;
    }

    getAllRules(): Rule[] { return Array.from(this.rules.values()); }
    getLockedCount(): number { return this.lockedCount; }
}
