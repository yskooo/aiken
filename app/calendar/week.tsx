diff --git a/app/calendar/week.tsx b/app/calendar/week.tsx
index 0000000..0000000
--- a/app/calendar/week.tsx
+++ b/app/calendar/week.tsx
@@
-  const onCreate = async (payload: { title: string; start: string; end: string }) => {
-    // For Phase 2 we create immediately (will be gated behind HITL in Phase 5)
-    await api.post('/events', { ...payload, userId: 'user_1', type: 'custom' });
-    await qc.invalidateQueries(['events']);
-    setShowAdd(false);
-  };
+  const onCreate = async (payload: { title: string; start: string; end: string }) => {
+    // Route calendar writes through PendingAction (HITL). Create a pending create_event.
+    await api.post('/pending', { userId: 'user_1', kind: 'create_event', payload: { ...payload, userId: 'user_1', type: 'custom' }, reasoning: 'User created event via Add Event modal' });
+    await qc.invalidateQueries(['events']);
+    setShowAdd(false);
+    alert('Event proposal created and is pending approval.');
+  };
