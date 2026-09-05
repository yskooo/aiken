import axios from 'axios';

const BASE = process.env.AIKEN_API_URL || 'http://localhost:3000';
export const api = axios.create({ baseURL: BASE + '/api/v1', timeout: 5000 });

export async function queryDocuments(q: string) {
  const res = await api.post('/docs/query', { q });
  return res.data.hits as { doc: string; quote: string; score: number }[];
}
