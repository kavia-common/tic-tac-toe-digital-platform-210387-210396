<template>
  <div>
    <div class="surface-card rounded-xl shadow-md p-4 md:p-6 mb-6">
      <StatusBar
        :current-player="game.currentPlayer"
        :status="game.status"
        :mode="game.mode"
        :error="uiError"
      />
      <div class="grid md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-start mt-4">
        <GameBoard
          :board="game.board"
          :winning-line="game.winningLine"
          :disabled="game.status !== 'IN_PROGRESS'"
          @cell-click="handleCellClick"
        />
        <div class="space-y-4 w-full md:w-[240px]">
          <Controls
            :mode="game.mode"
            @reset="handleReset"
            @mode-change="handleModeChange"
          />
          <AuditPanel
            :entries="audit.entries"
            class="w-full"
          />
        </div>
      </div>
    </div>
    <div v-if="uiError" class="alert-error" role="alert">
      {{ uiError }}
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// IMPORTS AND DEPENDENCIES
// ============================================================================
import GameBoard from '~/components/GameBoard.vue'
import StatusBar from '~/components/StatusBar.vue'
import Controls from '~/components/Controls.vue'
import AuditPanel from '~/components/AuditPanel.vue'
import { useGame } from '~/composables/useGame'
import { useAuditTrail } from '~/composables/useAuditTrail'
import type { Player, GameMode } from '~/types/game'

// ============================================================================
// FEATURE IMPLEMENTATION
// ============================================================================
/**
 * Page: Home
 * Purpose: Present Tic-Tac-Toe game UI with Ocean Professional theme.
 * GxP Critical: No (frontend only; audit scaffolding present)
 * Audit: Logs each move with timestamp, player, board before/after, action type.
 */

const game = useGame()
const audit = useAuditTrail()

const uiError = ref<string | null>(null)

/**
// PUBLIC_INTERFACE
 * handleCellClick
 * This function handles user clicks on the game board cells safely with validation and error surface.
 * @param {number} index - 0..8 index for the clicked cell
 */
function handleCellClick(index: number) {
  try {
    uiError.value = null
    const before = [...game.board.value]
    const result = game.makeMove(index)

    // Create in-memory audit entry for move (frontend scaffolding)
    audit.log({
      action: 'UPDATE',
      actorUserId: 'local-user', // Placeholder; would be bound to auth context in a real app
      reason: 'Player attempted move',
      beforeState: { board: before, player: result?.previousPlayer },
      afterState: { board: [...game.board.value], player: game.currentPlayer.value },
      metadata: { index, mode: game.mode.value, status: game.status.value }
    })

  } catch (err: any) {
    console.error('Move error', err)
    uiError.value = err?.message || 'Unexpected error while making a move.'
    // Log error to audit scaffold as a technical event
    audit.log({
      action: 'ERROR',
      actorUserId: 'system',
      reason: 'Exception during move',
      beforeState: {},
      afterState: {},
      metadata: { error: String(err) }
    })
  }
}

/**
// PUBLIC_INTERFACE
 * handleReset
 * Reset the game safely and log audit event.
 */
function handleReset() {
  try {
    uiError.value = null
    const before = [...game.board.value]
    game.reset()
    audit.log({
      action: 'UPDATE',
      actorUserId: 'local-user',
      reason: 'User reset game',
      beforeState: { board: before },
      afterState: { board: [...game.board.value] },
      metadata: { status: game.status.value }
    })
  } catch (err: any) {
    console.error('Reset error', err)
    uiError.value = err?.message || 'Unexpected error during reset.'
    audit.log({
      action: 'ERROR',
      actorUserId: 'system',
      reason: 'Exception during reset',
      beforeState: {},
      afterState: {},
      metadata: { error: String(err) }
    })
  }
}

/**
// PUBLIC_INTERFACE
 * handleModeChange
 * Change between PvP and PvAI modes with reset and logging.
 * @param {GameMode} mode
 */
function handleModeChange(mode: GameMode) {
  try {
    uiError.value = null
    const before = { mode: game.mode.value, board: [...game.board.value] }
    game.setMode(mode)
    audit.log({
      action: 'UPDATE',
      actorUserId: 'local-user',
      reason: 'User changed game mode',
      beforeState: before,
      afterState: { mode: game.mode.value, board: [...game.board.value] },
      metadata: {}
    })
  } catch (err: any) {
    console.error('Mode change error', err)
    uiError.value = err?.message || 'Unexpected error during mode change.'
    audit.log({
      action: 'ERROR',
      actorUserId: 'system',
      reason: 'Exception during mode change',
      beforeState: {},
      afterState: {},
      metadata: { error: String(err) }
    })
  }
}
</script>

<style scoped>
.surface-card {
  background: var(--surface);
  border: 1px solid rgba(0,0,0,0.05);
}
.alert-error {
  background: #FEF2F2;
  color: #991B1B;
  border: 1px solid #FCA5A5;
  padding: 12px;
  border-radius: 10px;
}
</style>
