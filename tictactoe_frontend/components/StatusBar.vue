<template>
  <div class="statusbar">
    <div class="status-left">
      <span class="badge" :class="modeClass">{{ modeLabel }}</span>
      <span class="sep">•</span>
      <span class="label">Turn:</span>
      <span class="pill" :class="turnClass">{{ currentPlayer }}</span>
      <span class="sep">•</span>
      <span class="label">Status:</span>
      <span class="pill" :class="statusClass">{{ statusText }}</span>
    </div>
    <div v-if="error" class="error" role="alert">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import type { GameMode, GameStatus, Player } from '~/types/game'

const props = defineProps<{
  currentPlayer: Player
  status: GameStatus
  mode: GameMode
  error?: string | null
}>()

const modeLabel = computed(() => props.mode === 'PVP' ? 'Player vs Player' : 'Player vs AI')
const modeClass = computed(() => props.mode === 'PVP' ? 'badge--blue' : 'badge--amber')

const statusText = computed(() => {
  switch (props.status) {
    case 'IN_PROGRESS': return 'In Progress'
    case 'WIN_X': return 'X Wins'
    case 'WIN_O': return 'O Wins'
    case 'DRAW': return 'Draw'
  }
})
const statusClass = computed(() => {
  if (props.status === 'IN_PROGRESS') return 'pill--neutral'
  if (props.status === 'DRAW') return 'pill--amber'
  return 'pill--green'
})
const turnClass = computed(() => props.currentPlayer === 'X' ? 'pill--blue' : 'pill--amber')
</script>

<style scoped>
.statusbar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.status-left {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
}
.badge--blue { color: var(--primary); background: rgba(37,99,235,0.08); border-color: rgba(37,99,235,0.18); }
.badge--amber { color: var(--secondary); background: rgba(245,158,11,0.12); border-color: rgba(245,158,11,0.22); }
.pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: var(--surface);
  border: 1px solid rgba(0,0,0,0.06);
}
.pill--neutral { color: #374151; }
.pill--blue { color: var(--primary); border-color: rgba(37,99,235,0.22); }
.pill--amber { color: var(--secondary); border-color: rgba(245,158,11,0.28); }
.pill--green { color: #16A34A; border-color: rgba(22,163,74,0.28); }
.sep { color: #9CA3AF; }
.label { color: #6B7280; }
.error {
  font-size: 12px;
  color: #B91C1C;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  padding: 6px 8px;
  border-radius: 8px;
}
</style>
