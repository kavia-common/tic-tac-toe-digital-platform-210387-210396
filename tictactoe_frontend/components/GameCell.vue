<template>
  <button
    class="cell"
    :class="{
      'cell--x': value === 'X',
      'cell--o': value === 'O',
      'cell--highlight': highlighted
    }"
    :disabled="disabled"
    @click="$emit('click')"
    :aria-pressed="!!value"
    :aria-label="`Cell ${value || 'empty'}`"
  >
    <span class="cell-value">{{ value }}</span>
  </button>
</template>

<script setup lang="ts">
import type { CellValue } from '~/types/game'

withDefaults(defineProps<{
  value: CellValue
  highlighted?: boolean
  disabled?: boolean
}>(), {
  highlighted: false,
  disabled: false
})
</script>

<style scoped>
.cell {
  width: 92px;
  height: 92px;
  background: var(--surface);
  border: 1.5px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 28px;
  transition: transform 120ms ease, box-shadow 120ms ease, background 160ms ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}
@media (min-width: 768px) {
  .cell {
    width: 110px;
    height: 110px;
    font-size: 34px;
  }
}
.cell:hover:enabled {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(37,99,235,0.15);
}
.cell:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}
.cell--x {
  color: var(--primary);
}
.cell--o {
  color: var(--secondary);
}
.cell--highlight {
  background: linear-gradient(180deg, rgba(37,99,235,0.12), rgba(245,158,11,0.12));
}
.cell-value {
  user-select: none;
}
</style>
