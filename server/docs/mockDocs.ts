import express from 'express';
import fs from 'fs';
import path from 'path';
import { MockVectorStore } from '../../lib/vectorstore/mockVectorStore';

const router = express.Router();
const docsFile = path.join(process.cwd(), 'fixtures', 'documents.json');

function readDocs() {
  try { return JSON.parse(fs.readFileSync(docsFile, 'utf-8')); } catch (e) { return []; }
}
function writeDocs(d) { fs.writeFileSync(docsFile, JSON.stringify(d, null,2)); }

router.post('/', (req, res) => {
  const { filename, text, userId } = req.body;
  const docs = readDocs();
  const id = 'doc_' + (docs.length+1);
  const doc = { id, filename, text, userId, uploadedAt: new Date().toISOString() };
  docs.push(doc);
  writeDocs(docs);
  // upsert into mock vector store
  MockVectorStore.upsert(id, filename, text);
  res.status(201).json({ doc });
});

router.post('/query', async (req, res) => {
  const { q } = req.body;
  const hits = await MockVectorStore.query(q || '', 5);
  res.json({ hits });
});

export default router;
