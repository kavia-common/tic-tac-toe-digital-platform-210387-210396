<template>
  <div class="surface-card rounded-xl shadow-md p-3">
    <button class="audit-toggle" @click="open = !open">
      <span>Audit Trail</span>
      <span class="count">{{ entries.length }}</span>
      <span class="chev" :class="{rot: open}">▾</span>
    </button>
    <div v-if="open" class="audit-list">
      <div
        v-for="(entry, idx) in entries"
        :key="idx"
        class="audit-item"
      >
        <div class="row">
          <span class="ts">{{ entry.timestamp }}</span>
          <span class="act">{{ entry.action }}</span>
          <span class="usr">{{ entry.actorUserId }}</span>
        </div>
        <details>
          <summary>Details</summary>
          <pre class="json">{{ pretty(entry) }}</pre>
        </details>
      </div>
      <div v-if="!entries.length" class="empty">No audit entries yet.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuditEntry } from '~/types/game'

const props = defineProps<{ entries: AuditEntry[] }>()
const open = ref(false)

// PUBLIC_INTERFACE
function pretty(obj: unknown) {
  return JSON.stringify(obj, null, 2)
}
</script>

<style scoped>
.audit-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 10px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  color: #374151;
}
.count {
  font-size: 12px;
  color: #6B7280;
}
.chev { transition: transform 120ms ease; }
.chev.rot { transform: rotate(180deg); }
.audit-list {
  margin-top: 10px;
  display: grid;
  gap: 8px;
}
.audit-item {
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 8px;
  background: white;
}
.row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
}
.ts { color: #6B7280; }
.act { color: #2563EB; }
.usr { color: #F59E0B; }
.json {
  font-size: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  padding: 8px;
}
.empty { color: #9CA3AF; font-size: 12px; }
</style>
