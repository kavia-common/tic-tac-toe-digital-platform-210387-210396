<!--
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-FE-001
User Story: As a user, I want to play Tic-Tac-Toe with a modern UI and clear status so I can play against a friend or simple AI.
Acceptance Criteria: Ocean Professional theme, grid renders, status/controls, PvP/PvAI, audit trail panel, validation, error handling.
GxP Impact: NO - UI-only with local in-memory state and audit scaffolding; no persistence or PII.
Risk Level: LOW
Validation Protocol: VP-FE-001 (unit tests for core game composables)
============================================================================
-->
<template>
  <div class="min-h-screen bg-gradient-to-b from-[#e6eefc] to-[#f9fafb] text-[#111827]">
    <NuxtRouteAnnouncer />
    <div class="max-w-3xl mx-auto px-4 py-8">
      <header class="mb-6">
        <h1 class="text-3xl font-semibold text-[#2563EB]">Tic-Tac-Toe</h1>
        <p class="text-sm text-gray-600">Ocean Professional</p>
      </header>
      <main>
        <NuxtPage />
      </main>
      <footer class="mt-10 text-xs text-gray-500 text-center">
        Built with Nuxt 3 • Demo UI with in-memory audit trail
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * App shell for Nuxt. Applies theme variables and layout container.
 * No props. Provides global structure for pages and components.
 */
</script>

<style>
/* Base resets and smooth transitions */
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
</style>
