A) Single instance (fastest path)
- Start stack.
- Open Hedera tab in gateway UI.
- Click Bootstrap HCS.
Confirm HCS topics show “Active”.
Click Test Attestation.
Confirm Last Attestation Tx ID appears.
Go governance lock action once; confirm no topic-missing error.
Click Bootstrap Tokens.
Confirm all 5 token cards become Active.
Run Mint $CCC with tokenId + cccId + sequence.
Validate:
/tokens returns active ids
/events contains Hedera action events
/persistence shows persisted events/aggregates
B) Multi-instance (INT-E01 + another)
Register/connect agents in two instances.
Trigger token/HCS actions from both.
Validate in /events:
cross-instance event summaries present
ADI + Hedera events coexist
Validate in /graph:
node/edge stats update
C) Org journey (recommended acceptance test)
Admin runs Bootstrap HCS once.
Admin runs Bootstrap Tokens once.
Contributors perform:
governance lock
CCC-ID generation
mint reward
Ops validates:
/stats (hcsMessages increasing)
/events (all operational actions persisted)
/persistence (Timescale mode + recent events + aggregates)
/graph (network topology consistency)
