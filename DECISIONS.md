# Aiken — Phase 0 decisions and assumptions

This file records decisions made during Phase 0 scaffold.

- Client: Expo + TypeScript + Expo Router (as specified in the SRS).
- Backend scaffold: Node.js + Express (minimal), expandable later.
- Styling: Plain React Native StyleSheet for Phase 0 to avoid extra runtime deps; may adopt NativeWind later.
- All external integrations (AUTH_PROVIDER, LLM_PROVIDER, VECTOR_STORE) default to mock in .env.example.
- Repo created under yskooo/aiken and initialized with a README and Node .gitignore.

Anything deferred:
- Full ESLint rules and Prettier config (kept minimal in this phase).
- Real OAuth / Supabase wiring — left as mock adapters behind interfaces.
