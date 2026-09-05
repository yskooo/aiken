# Phase 0 verification notes

Files created in Phase 0:

- package.json
- tsconfig.json
- .env.example
- .eslintrc.json
- .prettierrc
- README.md
- DECISIONS.md
- lib/theme.ts
- types/models.ts
- components/NavBar.tsx
- app/index.tsx
- server/index.ts
- fixtures/events.json

How to verify locally:
1. Clone the repo: `git clone https://github.com/yskooo/aiken.git`
2. Install: `npm install` (or `yarn`)
3. Run typecheck: `npm run typecheck` (should pass with the provided tsconfig)
4. Start Expo: `npm run start` and open in simulator or Expo Go. The home screen shows the 4-tab nav shell.

Notes / deferred items:
- Full Expo-managed app creation (npx create-expo-app) is not run in CI here; files scaffolded mimic the expected structure.
- NativeWind/Tailwind not included to keep initial deps small; can be adopted in Phase 2 if desired.
