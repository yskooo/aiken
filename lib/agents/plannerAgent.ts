import type { CalendarEvent, StudyPlanStep } from '../../types/models';

// Mock PlannerAgent: given a goal and list of events, returns a simple DAG of steps
// and proposes Deep Work blocks that avoid overlapping existing events.

export async function planStudy(goal: string, events: CalendarEvent[], userId: string): Promise<StudyPlanStep[]> {
  // naive planner: split goal into 3 steps of 60 minutes each
  const now = new Date();
  const steps: StudyPlanStep[] = [];

  // find a free 90-minute window in the next 7 days
  const windowStart = new Date(now.getTime() + 24 * 60 * 60 * 1000); // start tomorrow
  const windowEnd = new Date(windowStart.getTime() + 7 * 24 * 60 * 60 * 1000);

  function overlaps(s: Date, e: Date) {
    return events.some((ev) => {
      const a = new Date(ev.start);
      const b = new Date(ev.end);
      return Math.max(a.getTime(), s.getTime()) < Math.min(b.getTime(), e.getTime());
    });
  }

  // try to find three 60-min blocks
  let foundBlocks: { start: string; end: string }[] = [];
  for (let day = 0; day < 7 && foundBlocks.length < 3; day++) {
    const d = new Date(windowStart.getTime() + day * 24 * 60 * 60 * 1000);
    for (let hour = 8; hour <= 20 && foundBlocks.length < 3; hour++) {
      const s = new Date(d);
      s.setHours(hour, 0, 0, 0);
      const e = new Date(s.getTime() + 60 * 60000);
      if (s >= windowStart && e <= windowEnd && !overlaps(s, e)) {
        foundBlocks.push({ start: s.toISOString(), end: e.toISOString() });
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    steps.push({
      id: `step_${i + 1}`,
      label: `${goal} — Step ${i + 1}`,
      estimatedMinutes: 60,
      dependsOn: i === 0 ? [] : [`step_${i}`],
      proposedBlock: foundBlocks[i] || undefined
    });
  }

  return steps;
}
