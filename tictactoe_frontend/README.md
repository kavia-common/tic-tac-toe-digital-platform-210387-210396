# Tic-Tac-Toe Nuxt Frontend

Ocean Professional themed Tic-Tac-Toe UI built with Nuxt 3.

## Features
- Modern responsive 3x3 grid UI
- Player vs Player and Player vs AI (simple heuristic: win/block/center/corner/first)
- StatusBar with current turn and game status
- Controls to reset and switch modes
- In-memory audit trail panel with ISO8601 timestamps
- Validation for illegal moves and out-of-turn clicks (occupied cells ignored)
- Error handling scaffolding with user-facing message area
- Reusable composables:
  - useGame: game state, validation, win/draw detection, AI moves
  - useAuditTrail: structured logging scaffold
- Basic unit tests for core logic (Vitest-style)

## Run
- npm install
- npm run dev
- Open http://localhost:3000

## Structure
- pages/index.vue: main page that assembles components
- components/: GameBoard, GameCell, Controls, StatusBar, AuditPanel
- composables/: useGame.ts, useAuditTrail.ts
- types/game.ts: shared types
- assets/styles/theme.css: Ocean Professional theme variables and utilities
- plugins/theme.client.ts: injects theme stylesheet on client

## Compliance (GxP-style scaffolding)
- Audit entries include: user ID (placeholder), timestamp, action, before/after states, metadata.
- No backend or e-signature integration at this stage; scaffolding only.
- Input validation and error handling with friendly UI messages.

## Tests
- tests/unit/useGame.spec.ts validates win/draw detection, move validation, and AI response.

