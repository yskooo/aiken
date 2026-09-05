import express from 'express';
import docsRouter from './docs/mockDocs';
import fs from 'fs';
import path from 'path';

// extend server index to mount docs

const docsFile = path.join(process.cwd(),'fixtures','documents.json');

function ensureDocs() {
  try { fs.accessSync(docsFile); } catch (e) { fs.writeFileSync(docsFile, '[]'); }
}
ensureDocs();

export default docsRouter;
