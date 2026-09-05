# Phase 1 verification notes

Files added/changed in Phase 1:

- package.json (added axios, async-storage, react-query)
- lib/api.ts (API client)
- lib/auth.ts (SessionProvider with inactivity auto-logout)
- server/auth/mockAuth.ts (mock auth endpoints)
- server/index.ts (updated to mount mock auth)
- fixtures/users.json (demo user)
- components/AuthButtons.tsx
- app/(auth)/login.tsx
- app/(auth)/signup.tsx
- app/settings.tsx
- app/_layout.tsx

How I verified the Phase 1 DoD:
- Implemented a mock auth server with /api/v1/auth/login and /signup returning a token + user object.
- SessionProvider persists session to AsyncStorage and clears session after AUTO_LOGOUT_MS of inactivity (configurable via .env.example).
- Login and Signup routes call SessionProvider.signIn/signUp which use the mock API.

Local test steps:
1) Start the mock server: `npm run server` (requires ts-node) — it listens on http://localhost:3000
2) Start the Expo app: `npm run start`
3) Open the Login route and sign in with the preseeded user (student@example.com). The session persists across app reloads due to AsyncStorage.
4) To test inactivity auto-logout, set AUTO_LOGOUT_MS in .env to a small value and restart the app.

Deferred:
- More robust activity detection (AppState / touch listeners) — currently the session timer resets on session changes and when refreshActivity() is called. We'll add automatic activity listeners in Phase 2 if needed.
