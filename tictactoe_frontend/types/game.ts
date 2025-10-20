export type Player = 'X' | 'O'
export type CellValue = Player | null
export type Board = CellValue[]

export type GameStatus = 'IN_PROGRESS' | 'WIN_X' | 'WIN_O' | 'DRAW'
export type GameMode = 'PVP' | 'PVAI'

export interface GameResult {
  winner: Player | null
  line: number[] | null
}

export type AuditLogAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'ERROR'

export interface AuditEntry {
  timestamp: string // ISO8601
  action: AuditLogAction
  actorUserId: string
  reason?: string
  beforeState: Record<string, unknown>
  afterState: Record<string, unknown>
  metadata?: Record<string, unknown>
}
