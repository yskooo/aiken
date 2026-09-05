import { ChatMessage } from '../../types/models';
import { api } from '../api';

// Simple RouterAgent mock implementation. Pattern-matches a few intents and
// calls into local tools (the events API) to return data-backed responses.

export async function handleUserMessage(text: string, userId: string): Promise<ChatMessage> {
  const lower = text.toLowerCase().trim();

  // Student concerns quick-pills
  const concernsMap: Record<string, string> = {
    'missed a class': 'If you missed a class, notify your instructor and check the syllabus for the attendance policy.',
    'late assignment submission': 'Late submissions may be accepted with a penalty; check your syllabus for exact deductions.',
    'academic appeal': 'Academic appeals follow the university process; gather evidence and submit within the deadline.',
    'exam conflict': 'Notify your instructor and registrar immediately — conflicts are handled case-by-case.',
    'medical leave': 'Provide documentation to Student Services; they can help arrange accommodations.',
    'attendance exception': 'Exceptions require instructor approval and supporting documentation.'
  };

  for (const k of Object.keys(concernsMap)) {
    if (lower.includes(k)) {
      return {
        id: 'msg_' + Date.now(),
        userId,
        role: 'assistant',
        content: concernsMap[k] + ' [citation: handbook.pdf]',
        createdAt: new Date().toISOString()
      } as ChatMessage;
    }
  }

  // "what's due this week" intent
  if (lower.includes("due this week") || lower.includes("what's due this week") || lower.includes('due this week?')) {
    // fetch events and filter next 7 days
    try {
      const res = await api.get('/events');
      const events = res.data.events as any[];
      const now = new Date();
      const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const due = events.filter((e) => new Date(e.start) >= now && new Date(e.start) <= in7 && e.type === 'deadline');

      if (due.length === 0) {
        return {
          id: 'msg_' + Date.now(),
          userId,
          role: 'assistant',
          content: "You don't have any deadlines due in the next 7 days.",
          createdAt: new Date().toISOString()
        } as ChatMessage;
      }

      const lines = due.map((d) => `• ${d.title} — ${new Date(d.start).toLocaleString()}`);
      return {
        id: 'msg_' + Date.now(),
        userId,
        role: 'assistant',
        content: `Here are your deadlines this week:\n${lines.join('\n')}`,
        createdAt: new Date().toISOString()
      } as ChatMessage;
    } catch (e) {
      return {
        id: 'msg_' + Date.now(),
        userId,
        role: 'assistant',
        content: "Sorry, I couldn't fetch your events right now.",
        createdAt: new Date().toISOString()
      } as ChatMessage;
    }
  }

  // Default fallback: echo + suggestion
  return {
    id: 'msg_' + Date.now(),
    userId,
    role: 'assistant',
    content: "I can help with your calendar (try: \"what's due this week\") or use the Student Concerns quick-pills.",
    createdAt: new Date().toISOString()
  } as ChatMessage;
}
