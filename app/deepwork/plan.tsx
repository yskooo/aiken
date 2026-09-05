diff --git a/app/deepwork/plan.tsx b/app/deepwork/plan.tsx
index 0000000..0000000
--- a/app/deepwork/plan.tsx
+++ b/app/deepwork/plan.tsx
@@
   const proposeDeep = async () => {
-    // For Phase 4 we create a session log but do NOT add to calendar (HITL in Phase 5)
-    await api.post('/sessions', { userId: session?.user?.id || 'user_1', kind: 'deep_work', start: proposedBlock?.start, end: proposedBlock?.end });
-    qc.invalidateQueries(['sessions']);
-    alert('Deep Work proposed (logged). It will require approval in Phase 5.');
+    // For Phase 5, create a PendingAction to propose the deep work event. It will need approval to appear on calendar.
+    await api.post('/pending', { userId: session?.user?.id || 'user_1', kind: 'create_event', payload: { title: 'Deep Work: focused session', start: proposedBlock?.start, end: proposedBlock?.end, type: 'deep_work', userId: session?.user?.id || 'user_1' }, reasoning: 'User proposed Deep Work via Planner' });
+    qc.invalidateQueries(['sessions']);
+    alert('Deep Work proposal created (pending approval).');
   };
