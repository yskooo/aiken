export type User = { id: string; name: string; email: string; avatarUrl?: string; timezone: string };

export type ConnectedPlatform = {
  id: string;
  userId: string;
  provider: 'google_classroom' | 'canvas' | 'ms_teams' | 'google_calendar' | 'outlook';
  status: 'connected' | 'disconnected' | 'error';
  lastSyncedAt?: string;
};

export type CalendarEvent = {
  id: string;
  userId: string;
  title: string;
  type: 'class' | 'deadline' | 'meeting' | 'deep_work' | 'pomodoro' | 'custom';
  start: string;
  end: string;
  sourcePlatform?: string;
  sourceUrl?: string;
  weight?: number;
};

export type PendingAction = {
  id: string;
  userId: string;
  kind: 'create_event' | 'reschedule_event' | 'toggle_dnd' | 'delete_data';
  payload: unknown;
  reasoning: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  createdAt: string;
  expiresAt: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: any[];
  sourceSnippets?: { doc: string; quote: string }[];
  createdAt: string;
};

export type StudyPlanStep = {
  id: string;
  label: string;
  estimatedMinutes: number;
  dependsOn: string[];
  proposedBlock?: { start: string; end: string };
};

export type AssistantConfig = {
  userId: string;
  name: string;
  role: string;
  program: string;
  tone: 'professional' | 'friendly' | 'casual';
  connectedTools: string[];
};

export type Document = {
  id: string;
  userId: string;
  filename: string;
  kind: 'syllabus' | 'handbook' | 'other';
  uploadedAt: string;
  chunkCount: number;
};
