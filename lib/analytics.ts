// Analytics helpers for Reports

export function computeFocusMinutes(sessions: any[]) {
  // sum deep_work durations (end - start) and pomodoro count * 25
  let minutes = 0;
  for (const s of sessions) {
    if (s.kind === 'deep_work' && s.start && s.end) {
      const st = new Date(s.start).getTime();
      const en = new Date(s.end).getTime();
      if (!isNaN(st) && !isNaN(en) && en > st) {
        minutes += Math.round((en - st) / 60000);
      }
    } else if (s.kind === 'pomodoro') {
      // assume standard 25m
      minutes += 25;
    }
  }
  return minutes;
}

export function countPomodoros(sessions: any[]) {
  return sessions.filter((s) => s.kind === 'pomodoro').length;
}

export function completionRate(tasks: any[]) {
  // tasks: array with completed boolean
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
}
