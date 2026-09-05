import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const pendingFile = path.join(process.cwd(), 'fixtures', 'pending.json');
const eventsFile = path.join(process.cwd(), 'fixtures', 'events.json');

function readPending() {
  try { return JSON.parse(fs.readFileSync(pendingFile, 'utf-8')); } catch (e) { return []; }
}
function writePending(d:any[]) { fs.writeFileSync(pendingFile, JSON.stringify(d, null, 2)); }

function readEvents() {
  try { return JSON.parse(fs.readFileSync(eventsFile, 'utf-8')); } catch (e) { return []; }
}
function writeEvents(d:any[]) { fs.writeFileSync(eventsFile, JSON.stringify(d, null, 2)); }

router.get('/', (req, res) => {
  const now = Date.now();
  const pend = readPending();
  // expire old pending actions
  let changed = false;
  pend.forEach((p:any) => {
    if (p.status === 'pending' && new Date(p.expiresAt).getTime() <= now) {
      p.status = 'expired';
      changed = true;
    }
  });
  if (changed) writePending(pend);
  res.json({ pending: pend });
});

router.post('/', (req, res) => {
  const { userId, kind, payload, reasoning } = req.body;
  const pend = readPending();
  const id = 'pend_' + (pend.length + 1);
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(); // 48h TTL
  const entry = { id, userId, kind, payload, reasoning, status: 'pending', createdAt, expiresAt };
  pend.push(entry);
  writePending(pend);
  res.status(201).json({ pending: entry });
});

router.post('/:id/approve', (req, res) => {
  const { id } = req.params;
  const pend = readPending();
  const item = pend.find((p:any) => p.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  if (item.status !== 'pending') return res.status(400).json({ error: 'not pending' });

  // apply action
  if (item.kind === 'create_event') {
    const events = readEvents();
    const evt = item.payload;
    const newId = 'evt_' + (events.length + 1);
    const newEvt = { ...evt, id: newId };
    events.push(newEvt);
    writeEvents(events);
    item.status = 'approved';
    writePending(pend);
    return res.json({ pending: item, applied: { event: newEvt } });
  }

  // handle other kinds as no-op for now
  item.status = 'approved';
  writePending(pend);
  res.json({ pending: item });
});

router.post('/:id/reject', (req, res) => {
  const { id } = req.params;
  const pend = readPending();
  const item = pend.find((p:any) => p.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  if (item.status !== 'pending') return res.status(400).json({ error: 'not pending' });
  item.status = 'rejected';
  writePending(pend);
  res.json({ pending: item });
});

export default router;
