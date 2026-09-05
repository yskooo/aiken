# Phase 2 verification notes

Files added/changed in Phase 2:

- server/events/mockEvents.ts (events API endpoints)
- components/EventCard.tsx
- components/AddEventModal.tsx
- app/calendar/week.tsx
- app/calendar/month.tsx
- fixtures/events.json (seeded more demo events)

How I verified the Phase 2 DoD:
- Implemented mock /api/v1/events endpoints to list and create events using fixtures/events.json.
- Week and Month views fetch events via react-query and render EventCard components.
- Add Event modal posts to /events and invalidates the events query so the new event appears in both views (client-side immediate effect). This meets the Phase 2 DoD.
- Manual pull-to-refresh triggers refetch via RefreshControl.

Deferred / Decisions:
- To respect the overall project's HITL requirement, writes currently create events immediately (Phase 2 DoD). This will be reworked in Phase 5 to route calendar writes through the PendingAction HITL layer. Recorded in DECISIONS.md.
- Overlap-rendering, visual grid layout, and clash detection are simplified for Phase 2; Phase 4/8 will improve rendering and accessibility.
