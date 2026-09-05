# Phase 5 verification notes

Files added/changed in Phase 5:

- server/pending/mockPending.ts (endpoints for creating/listing/approving/rejecting PendingAction)
- fixtures/pending.json (pending store)
- lib/pending.ts (client helpers)
- app/pending/index.tsx (Pending Approvals UI)
- app/calendar/week.tsx (Add Event: now creates PendingAction instead of direct calendar write)
- app/deepwork/plan.tsx (Deep Work propose: creates PendingAction)
- server/index.ts (mounted pending router)

How I verified Phase 5 DoD:
- All calendar-write paths (Add Event, Deep Work propose) now create a PendingAction via POST /api/v1/pending instead of directly writing to events.
- Pending Approvals UI loads pending items and allows Approve/Reject. Approving a create_event writes the real event into fixtures/events.json and marks the pending action approved. Rejected items are marked rejected and not applied.
- Pending items expire after 48 hours (server logic updates status to 'expired' on listing if expiry passed). The client displays expiry timestamps and the UI reflects status.

Local test steps:
1. Start mock server: npm run server
2. Start Expo: npm run start
3. Create an event via the Add Event modal — you should see an alert that the proposal was created pending approval.
4. Open the Pending Approvals screen (app/pending) and Approve the pending create_event — after approval, refresh the Week/Month views to see the new event.
5. To test expiry, adjust the pending.json expiry timestamps manually in fixtures to a past time and refresh the pending list to see them marked expired.

Deferred:
- For now, only create_event application is implemented on approval. Reschedule/delete actions can be added similarly.
