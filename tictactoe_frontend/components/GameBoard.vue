<template>
  <div class="board p-3 rounded-xl shadow-inner">
    <div class="grid grid-cols-3 gap-2">
      <GameCell
        v-for="(cell, idx) in board"
        :key="idx"
        :value="cell"
        :highlighted="winningLine?.includes(idx) ?? false"
        :disabled="disabled || !!cell"
        @click="onClick(idx)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCell from './GameCell.vue'
import type { Board } from '~/types/game'

const props = defineProps<{
  board: Board
  winningLine?: number[] | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'cell-click', index: number): void
}>()

/**
// PUBLIC_INTERFACE
 * onClick
 * Handle cell click with index validation and disabled checks.
 * @param {number} idx - 0..8
 * @throws Error when invalid index or interaction disabled.
 */
function onClick(idx: number) {
  if (props.disabled) return
  if (typeof idx !== 'number' || !Number.isInteger(idx) || idx < 0 || idx > 8) {
    throw new Error('Invalid cell index.')
  }
  if (props.board[idx]) return // ignore clicks on occupied cells
  emit('cell-click', idx)
}
</script>

<style scoped>
.board {
  background: linear-gradient(180deg, rgba(37,99,235,0.06), rgba(255,255,255,0.8));
  border: 1px solid rgba(37,99,235,0.15);
}
</style>
