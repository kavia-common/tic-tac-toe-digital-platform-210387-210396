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
    :aria-label="getAriaLabel(value)"
  >
    <span class="cell-value" aria-hidden="true">
      <component :is="getIconComponent(value)" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { CellValue } from '~/types/game'

withDefaults(defineProps<{
  value: CellValue
  highlighted?: boolean
  disabled?: boolean
}>(), {
  highlighted: false,
  disabled: false
})

/**
// PUBLIC_INTERFACE
 * getAriaLabel
 * Returns accessible label for the cell, reflecting the player or empty state.
 */
function getAriaLabel(v: CellValue): string {
  if (v === 'X') return 'Cell X, knight'
  if (v === 'O') return 'Cell O, queen'
  return 'Cell empty'
}

/**
 * Inline SVG components for Knight (X) and Queen (O).
 * Implemented using Vue h() to avoid JSX dependency.
 */

// PUBLIC_INTERFACE
const KnightIcon = {
  /** Accessible knight icon (horse) used for player X. */
  render() {
    return h(
      'svg',
      {
        class: 'icon',
        viewBox: '0 0 24 24',
        role: 'img',
        'aria-label': 'Knight',
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'currentColor',
      },
      [
        h('title', null, 'Knight'),
        h('path', {
          d: 'M6 20h12v-2H8.5c.2-1.37 1.13-2.34 2.77-3.23 1.22-.66 2.07-1.27 2.6-2.2.42-.74.57-1.7.3-2.72-.35-1.31-1.2-2.41-2.54-3.27l-.32-.2 1.24-1.76c.19-.27.16-.64-.08-.87-.23-.23-.6-.26-.87-.07L8.3 5.5c-1.3.9-2.2 2.02-2.7 3.33-.44 1.16-.5 2.4-.18 3.5l.08.26c.05.17.08.34.08.5 0 .55-.45 1-1 1H4v2h.88c1.05 0 1.96-.66 2.27-1.64l.06-.2c.2.47.49.88.86 1.23-1.15.86-1.85 1.92-2.04 3.02H6v2Z',
        }),
      ],
    )
  },
}

// PUBLIC_INTERFACE
const QueenIcon = {
  /** Accessible queen icon (crown) used for player O. */
  render() {
    return h(
      'svg',
      {
        class: 'icon',
        viewBox: '0 0 24 24',
        role: 'img',
        'aria-label': 'Queen',
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'currentColor',
      },
      [
        h('title', null, 'Queen'),
        h('path', {
          d: 'M4 18c2.5-1.5 4.5-3.5 5.5-6l2.5 2 2.5-2c1 2.5 3 4.5 5.5 6v2H4v-2Z',
        }),
        h('circle', { cx: '6', cy: '8', r: '1.5' }),
        h('circle', { cx: '12', cy: '6.5', r: '1.5' }),
        h('circle', { cx: '18', cy: '8', r: '1.5' }),
      ],
    )
  },
}

/**
// PUBLIC_INTERFACE
 * getIconComponent
 * Returns the correct icon component for the given value, or a spacer to avoid layout shift.
 */
function getIconComponent(v: CellValue) {
  if (v === 'X') return KnightIcon
  if (v === 'O') return QueenIcon
  // Return an empty box-sized span to avoid layout shift on hover/focus
  return {
    render() {
      return h('span', { class: 'icon icon--placeholder', 'aria-hidden': 'true' })
    },
  }
}
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
  /* font-size retained for potential future text use; icons use explicit sizing */
  font-size: 28px;
  transition: transform 120ms ease, box-shadow 120ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  color: var(--text); /* default */
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
  border-color: rgba(37,99,235,0.25);
}
.cell:focus-visible {
  outline: 2px solid rgba(37,99,235,0.5);
  outline-offset: 2px;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon {
  width: 2em;
  height: 2em;
  display: inline-block;
}
/* Provide a stable box even when empty to avoid layout shift */
.icon--placeholder {
  opacity: 0;
}
</style>
