import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const eventsFile = path.join(process.cwd(), 'fixtures', 'events.json');

function readEvents() {
  try {
    const raw = fs.readFileSync(eventsFile, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeEvents(events: any[]) {
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
}

router.get('/', (_req, res) => {
  const events = readEvents();
  res.json({ events });
});

router.post('/', (req, res) => {
  const evt = req.body;
  const events = readEvents();
  const id = 'evt_' + (events.length + 1);
  const newEvt = { ...evt, id };
  events.push(newEvt);
  writeEvents(events);
  res.status(201).json({ event: newEvt });
});

export default router;
