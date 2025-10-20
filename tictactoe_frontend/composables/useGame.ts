import type { Board, CellValue, GameMode, GameResult, GameStatus, Player } from '~/types/game'

/*
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-FE-002
User Story: Provide a reusable game state composable with win/draw detection and simple AI.
Acceptance Criteria: makeMove validation, status updates, reset, mode toggle, AI responds in PVAI.
GxP Impact: NO - local computation only; audit hooks handled by caller.
Risk Level: LOW
Validation Protocol: VP-FE-001 (unit tests in tests/unit/useGame.spec.ts)
============================================================================
*/

// Winning combinations (by board indices)
const LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
]

// PUBLIC_INTERFACE
export function useGame() {
  /**
   * Reactive game state
   */
  const board = useState<CellValue[]>('board', () => Array<CellValue>(9).fill(null))
  const currentPlayer = useState<Player>('currentPlayer', () => 'X')
  const status = useState<GameStatus>('status', () => 'IN_PROGRESS')
  const winningLine = useState<number[] | null>('winningLine', () => null)
  const mode = useState<GameMode>('mode', () => 'PVP')

  /**
   * Validate index and move legality.
   */
  function validateMove(index: number) {
    if (status.value !== 'IN_PROGRESS') throw new Error('Game is already finished.')
    if (typeof index !== 'number' || !Number.isInteger(index)) throw new Error('Index must be an integer.')
    if (index < 0 || index > 8) throw new Error('Index must be between 0 and 8.')
    if (board.value[index] !== null) throw new Error('Cell already occupied.')
  }

  /**
   * Compute winner and set status/line if found.
   */
  function updateStatusAfterMove(): GameResult | null {
    for (const line of LINES) {
      const [a, b, c] = line
      const va = board.value[a]
      if (va && va === board.value[b] && va === board.value[c]) {
        winningLine.value = line
        status.value = va === 'X' ? 'WIN_X' : 'WIN_O'
        return { winner: va, line }
      }
    }
    if (board.value.every(v => v !== null)) {
      status.value = 'DRAW'
      return { winner: null, line: null }
    }
    return null
  }

  /**
   * Switch current player X <-> O
   */
  function togglePlayer() {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }

  /**
   * Simple AI heuristic:
   * - Win if possible
   * - Block opponent win
   * - Take center if free
   * - Take a corner
   * - Otherwise take first free
   */
  function aiChooseMove(ai: Player): number | null {
    const opp: Player = ai === 'X' ? 'O' : 'X'

    // Helper: try line completion for p
    function findWinningMove(p: Player): number | null {
      for (const [a, b, c] of LINES) {
        const cells = [board.value[a], board.value[b], board.value[c]]
        const countP = cells.filter(v => v === p).length
        const countEmpty = cells.filter(v => v === null).length
        if (countP === 2 && countEmpty === 1) {
          if (board.value[a] === null) return a
          if (board.value[b] === null) return b
          if (board.value[c] === null) return c
        }
      }
      return null
    }

    // 1) Win
    const winIdx = findWinningMove(ai)
    if (winIdx !== null) return winIdx
    // 2) Block
    const blockIdx = findWinningMove(opp)
    if (blockIdx !== null) return blockIdx
    // 3) Center
    if (board.value[4] === null) return 4
    // 4) Corner
    const corners = [0, 2, 6, 8].filter(i => board.value[i] === null)
    if (corners.length) return corners[0]
    // 5) First free
    const free = board.value.findIndex(v => v === null)
    return free >= 0 ? free : null
  }

  /**
   * Execute a move for current player with validation and update status.
   * Returns previous player on success to aid logging.
   */
// PUBLIC_INTERFACE
  function makeMove(index: number): { previousPlayer: Player } | undefined {
    validateMove(index)
    const prev = currentPlayer.value
    board.value[index] = prev

    const result = updateStatusAfterMove()
    if (!result) {
      togglePlayer()
      // Let AI move if enabled and game still in progress
      if (mode.value === 'PVAI' && currentPlayer.value === 'O' && status.value === 'IN_PROGRESS') {
        const aiIdx = aiChooseMove('O')
        if (aiIdx !== null) {
          board.value[aiIdx] = 'O'
          const _result = updateStatusAfterMove()
          if (!_result) togglePlayer()
        }
      }
    }
    return { previousPlayer: prev }
  }

  /**
   * Reset game state
   */
// PUBLIC_INTERFACE
  function reset() {
    board.value = Array<CellValue>(9).fill(null)
    currentPlayer.value = 'X'
    status.value = 'IN_PROGRESS'
    winningLine.value = null
  }

  /**
   * Set mode and reset board to ensure fair start
   */
// PUBLIC_INTERFACE
  function setMode(next: GameMode) {
    if (next !== 'PVP' && next !== 'PVAI') throw new Error('Invalid mode.')
    mode.value = next
    reset()
  }

  return {
    board,
    currentPlayer,
    status,
    winningLine,
    mode,
    makeMove,
    reset,
    setMode,
  }
}
