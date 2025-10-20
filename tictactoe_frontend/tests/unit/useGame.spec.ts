import { describe, it, expect, beforeEach } from 'vitest'
import { useGame } from '~/composables/useGame'

// Note: This test assumes Nuxt test runner provides useState in test env.
// If not, composable can be adapted to plain refs for testability.

describe('useGame composable', () => {
  let game: ReturnType<typeof useGame>

  beforeEach(() => {
    // Reset Nuxt states by calling composable anew (Nuxt test env resets between tests)
    game = useGame()
    game.reset()
  })

  it('initializes with empty board and X to start', () => {
    expect(game.board.value.filter(Boolean).length).toBe(0)
    expect(game.currentPlayer.value).toBe('X')
    expect(game.status.value).toBe('IN_PROGRESS')
  })

  it('prevents move on occupied cell', () => {
    game.makeMove(0)
    expect(() => game.makeMove(0)).toThrow()
  })

  it('detects win across a row', () => {
    game.setMode('PVP')
    // X 0 0
    // X 0 0
    // X 0 0
    game.makeMove(0) // X
    game.makeMove(1) // O
    game.makeMove(3) // X
    game.makeMove(2) // O
    game.makeMove(6) // X -> wins column 0
    expect(game.status.value === 'WIN_X' || game.status.value === 'WIN_O').toBe(true)
  })

  it('detects draw when board fills without winner', () => {
    game.setMode('PVP')
    // X O X
    // X X O
    // O X O
    const seq = [0,1,2,5,3,6,4,8,7]
    seq.forEach(i => { if (game.status.value === 'IN_PROGRESS') game.makeMove(i) })
    expect(game.status.value).toBe('DRAW')
  })

  it('AI makes a move when in PVAI mode and O turn', () => {
    game.setMode('PVAI')
    // X moves at 0; AI should respond as O
    game.makeMove(0)
    const countO = game.board.value.filter(v => v === 'O').length
    expect(countO).toBe(1)
  })
})
