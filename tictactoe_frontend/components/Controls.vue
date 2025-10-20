<template>
  <div class="controls surface-card rounded-xl p-3 shadow-md">
    <div class="mb-3">
      <label class="block text-xs text-gray-600 mb-1">Mode</label>
      <div class="flex gap-2">
        <button
          :class="['btn', mode === 'PVP' ? 'btn--primary' : 'btn--ghost']"
          @click="$emit('mode-change', 'PVP')"
        >Player vs Player</button>
        <button
          :class="['btn', mode === 'PVAI' ? 'btn--primary' : 'btn--ghost']"
          @click="$emit('mode-change', 'PVAI')"
        >Player vs AI</button>
      </div>
    </div>
    <button class="btn btn--secondary w-full" @click="$emit('reset')">New Game</button>
  </div>
</template>

<script setup lang="ts">
import type { GameMode } from '~/types/game'
defineProps<{ mode: GameMode }>()
defineEmits<{
  (e: 'reset'): void
  (e: 'mode-change', mode: GameMode): void
}>()
</script>

<style scoped>
.btn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.08);
  background: var(--surface);
  transition: all 120ms ease;
  font-size: 14px;
}
.btn--primary {
  color: white;
  background: var(--primary);
  border-color: rgba(37,99,235,0.5);
  box-shadow: 0 4px 14px rgba(37,99,235,0.22);
}
.btn--secondary {
  color: white;
  background: var(--secondary);
  border-color: rgba(245,158,11,0.4);
  box-shadow: 0 4px 14px rgba(245,158,11,0.22);
}
.btn--ghost {
  color: #374151;
  background: #F3F4F6;
  border-color: #E5E7EB;
}
.btn:hover { transform: translateY(-1px); }
</style>
