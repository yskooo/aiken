import { api } from './api';

export async function createPending(userId: string, kind: string, payload: any, reasoning = '') {
  const res = await api.post('/pending', { userId, kind, payload, reasoning });
  return res.data.pending;
}

export async function listPending() {
  const res = await api.get('/pending');
  return res.data.pending as any[];
}

export async function approvePending(id: string) {
  const res = await api.post(`/pending/${id}/approve`);
  return res.data;
}

export async function rejectPending(id: string) {
  const res = await api.post(`/pending/${id}/reject`);
  return res.data;
}
