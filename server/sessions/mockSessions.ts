import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const file = path.join(process.cwd(),'fixtures','sessions.json');

function read() {
  try { return JSON.parse(fs.readFileSync(file,'utf-8')); } catch (e) { return []; }
}
function write(d:any[]) { fs.writeFileSync(file, JSON.stringify(d,null,2)); }

router.get('/', (_req,res)=>{
  const s = read();
  res.json({ sessions: s });
});

router.post('/', (req,res)=>{
  const body = req.body;
  const s = read();
  const id = 'sess_' + (s.length + 1);
  const entry = { id, ...body, createdAt: new Date().toISOString() };
  s.push(entry);
  write(s);
  res.status(201).json({ session: entry });
});

export default router;
