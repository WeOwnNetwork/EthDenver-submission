import winston from "winston";

// ═══════════════════════════════════════════════════════
// CCC GATEWAY LOGGER — Winston
//
// Structured JSON logging for the CCC Gateway.
// Auto-injects gateway context (instance, season)
// into every log entry.
//
// Levels (npm default):
//   error → warn → info → http → verbose → debug → silly
//
// Usage:
//   import { glog } from "@/lib/logger";
//   glog.cccId("LDC_2026-W07_026", "LDC", 10);
//   glog.volley("AI:@LDC", "AI:@RMN", "SEEK");
// ═══════════════════════════════════════════════════════

// ── Winston Instance ──

const { combine, timestamp, json, errors, printf } = winston.format;

const instance = process.env.GATEWAY_INSTANCE || "INT-E01";
const season = parseInt(process.env.GATEWAY_SEASON || "3");

// Inject gateway context into every log
const gatewayContext = winston.format((info) => {
    info.instance = instance;
    info.season = season;
    info.service = "ccc-gateway";
    info.pid = process.pid;
    return info;
});

// Redact sensitive fields
const redact = winston.format((info) => {
    if (info.hederaPrivateKey) info.hederaPrivateKey = "[REDACTED]";
    if (info.privateKey) info.privateKey = "[REDACTED]";
    if (info.apiKey) info.apiKey = "[REDACTED]";
    if (info.basePrivateKey) info.basePrivateKey = "[REDACTED]";
    return info;
});

// Dev-friendly console format
const devFormat = printf(({ level, message, timestamp, event, ...meta }) => {
    const eventTag = event ? ` [${event}]` : "";
    const metaStr = Object.keys(meta).length > 3
        ? ` ${JSON.stringify(meta)}`
        : "";
    return `${timestamp} ${level}${eventTag}: ${message}${metaStr}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    defaultMeta: {
        service: "ccc-gateway",
        instance,
        season,
    },
    format: combine(
        errors({ stack: true }),
        gatewayContext(),
        redact(),
        timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSSZ" }),
        json()
    ),
    transports: [
        // Production: JSON to stdout (for log aggregation)
        new winston.transports.Console({
            format:
                process.env.NODE_ENV === "production"
                    ? combine(timestamp(), json())
                    : combine(timestamp({ format: "HH:mm:ss" }), devFormat),
        }),
    ],
});

// File transport in non-serverless environments
if (process.env.LOG_FILE === "true") {
    logger.add(
        new winston.transports.File({
            filename: "logs/gateway-error.log",
            level: "error",
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5,
        })
    );
    logger.add(
        new winston.transports.File({
            filename: "logs/gateway.log",
            maxsize: 10 * 1024 * 1024, // 10MB
            maxFiles: 10,
        })
    );
}

// ── Gateway Logger API ──

export const glog = {
    // ── Agent Lifecycle ──

    agentRegistered(ccc: string, tier: string) {
        logger.info(`✅ AI:@${ccc} registered (${tier})`, {
            event: "agent.registered",
            ccc,
            agentId: `AI:@${ccc}`,
            tier,
        });
    },

    agentAlreadyRegistered(ccc: string) {
        logger.info(`ℹ️ AI:@${ccc} already registered`, {
            event: "agent.already_registered",
            ccc,
        });
    },

    // ── CCC-ID ──

    cccId(cccId: string, contributor: string, reward: number) {
        logger.info(`🆔 ${cccId} (+${reward} $CCC)`, {
            event: "cccid.generated",
            cccId,
            contributor,
            reward,
        });
    },

    cccIdViolation(contributor: string, violations: string[]) {
        logger.warn(`🚫 CCC-ID denied for ${contributor}`, {
            event: "cccid.violation",
            contributor,
            violations,
        });
    },

    cccIdExhausted(contributor: string) {
        logger.warn(`⚠️ CCC-ID exhausted for ${contributor} (999/week)`, {
            event: "cccid.exhausted",
            contributor,
        });
    },

    // ── #ContextVolley ──

    volley(from: string, to: string, volleyType: string, attested = false) {
        logger.info(
            `🏐 ${from} → ${to} (${volleyType})${attested ? " [HCS]" : ""}`,
            {
                event: "volley.sent",
                from,
                to,
                volleyType,
                attested,
            }
        );
    },

    // ── #ContextBroadcast ──

    broadcast(from: string, broadcastType: string, recipients: number) {
        logger.info(`📢 ${from} → ALL (${broadcastType}) [${recipients} agents]`, {
            event: "broadcast.sent",
            from,
            broadcastType,
            recipients,
        });
    },

    // ── Governance ──

    governance(action: string, ruleId: string, lockedBy: string) {
        logger.info(`🔒 ${ruleId} — ${action} by ${lockedBy}`, {
            event: "governance.action",
            action,
            ruleId,
            lockedBy,
        });
    },

    governanceViolation(action: string, violations: string[]) {
        logger.warn(`🚫 Governance denied: ${action}`, {
            event: "governance.violation",
            action,
            violations,
        });
    },

    // ── #BadAgent ──

    badAgent(
        targetCcc: string,
        reason: string,
        severity: string,
        reportedBy: string
    ) {
        logger.warn(
            `🚨 #BadAgent: ${targetCcc} — ${reason} [${severity}]`,
            {
                event: "badagent.flagged",
                targetCcc,
                reason,
                severity,
                reportedBy,
            }
        );
    },

    // ── HCS Attestation ──

    hcsSuccess(topicType: string, txId: string, sequenceNumber?: number) {
        logger.info(`📜 HCS [${topicType}] attested`, {
            event: "hcs.success",
            topicType,
            txId,
            sequenceNumber,
        });
    },

    hcsFailed(topicType: string, error: unknown) {
        logger.error(`⚠️ HCS [${topicType}] attestation failed`, {
            event: "hcs.failed",
            topicType,
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
    },

    // ── HTTP Request Logging ──

    request(method: string, path: string, status: number, durationMs: number) {
        logger.http(`${method} ${path} ${status} ${durationMs}ms`, {
            event: "http.request",
            method,
            path,
            status,
            durationMs,
        });
    },

    // ── Generic ──

    info(message: string, meta?: Record<string, unknown>) {
        logger.info(message, meta);
    },

    warn(message: string, meta?: Record<string, unknown>) {
        logger.warn(message, meta);
    },

    error(message: string, meta?: Record<string, unknown>) {
        logger.error(message, meta);
    },

    debug(message: string, meta?: Record<string, unknown>) {
        logger.debug(message, meta);
    },
};

// Export raw winston logger for advanced usage
export { logger };
