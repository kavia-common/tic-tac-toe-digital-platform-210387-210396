import type { AuditEntry, AuditLogAction } from '~/types/game'

/*
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-FE-003
User Story: As a compliance-conscious developer, I need audit scaffolding to capture actions in UI.
Acceptance Criteria: In-memory array of entries with ISO timestamp, action, before/after, metadata.
GxP Impact: NO - Demo-only in-memory; no persistence.
Risk Level: LOW
Validation Protocol: VP-FE-001 (unit tests optional; simple structure)
============================================================================
*/

// PUBLIC_INTERFACE
export function useAuditTrail() {
  const entries = useState<AuditEntry[]>('auditEntries', () => [])

  // PUBLIC_INTERFACE
  function log(payload: {
    action: AuditLogAction
    actorUserId: string
    reason?: string
    beforeState: Record<string, unknown>
    afterState: Record<string, unknown>
    metadata?: Record<string, unknown>
  }) {
    const ts = new Date().toISOString()
    const entry: AuditEntry = {
      timestamp: ts,
      ...payload,
    }
    entries.value = [entry, ...entries.value].slice(0, 200) // cap to 200
  }

  // PUBLIC_INTERFACE
  function clear() {
    entries.value = []
  }

  return { entries, log, clear }
}
