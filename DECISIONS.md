# Aiken — Decisions log

This file records decisions made during the build phases.

Phase 0 decisions:
- Client: Expo + TypeScript + Expo Router.
- Backend scaffold: Node.js + Express (minimal), expandable later.
- Styling: Plain React Native StyleSheet for Phase 0 and kept for consistency.
- All external integrations (AUTH_PROVIDER, LLM_PROVIDER, VECTOR_STORE) default to mock in .env.example.

Phase 1:
- Mock Supabase-auth adapter implemented under server/auth/mockAuth.ts.
- Session persistence via AsyncStorage; inactivity auto-logout implemented with AUTO_LOGOUT_MS env override.

Phase 2:
- Calendar week/month views implemented with mock events API; Add Event initially created events directly (reworked in Phase 5 to go through PendingAction).

Phase 3 & 3b:
- RouterAgent and PlannerAgent and RAG are mock-first; MockVectorStore uses substring scoring to provide citation snippets.

Phase 4:
- PlannerAgent returns deterministic StudyPlanStep[] and finds non-overlapping blocks with simple scheduling logic.
- Pomodoro persists to AsyncStorage using timestamp math to survive backgrounding.

Phase 5:
- Implemented PendingAction HITL store and endpoints. Calendar writes and Deep Work proposals now create PendingAction objects with 48h TTL; approving create_event writes the event into fixtures/events.json.
- For approvals, current implementation only applies create_event; reschedule/delete flows are noted as future work.

Phase 6:
- Reports dashboard implemented using session logs; charts are lightweight and zero-dependency.

Deferred / future work:
- Replace mock VectorStore with pgvector or Pinecone adapter (Phase 7 when credentials are available).
- Expand HITL to cover reschedules and deletions.
- Accessibility/a11y polish and WCAG checks in Phase 8.

If any of these decisions are incorrect or you want a different approach (e.g., NativeWind for styling), tell me and I will record the change and adjust subsequent phases.
