// Simple in-memory vector store (mock) using substring scoring.
// Accepts documents with id, filename, text and returns top matching chunks.

type Chunk = { docId: string; doc: string; quote: string; chunkIndex: number };

const store: Chunk[] = [];

export const MockVectorStore = {
  async upsert(docId: string, filename: string, text: string) {
    // naive chunking by sentences
    const sentences = text.split(/[\.\n]+/).map(s => s.trim()).filter(Boolean);
    sentences.forEach((s, i) => {
      store.push({ docId, doc: filename, quote: s.slice(0, 200), chunkIndex: i });
    });
    return { ok: true };
  },

  async query(q: string, topK = 3) {
    const ql = q.toLowerCase();
    const scored = store.map(c => ({ c, score: c.quote.toLowerCase().includes(ql) ? 1 : 0 }));
    scored.sort((a,b) => b.score - a.score);
    return scored.filter(s => s.score>0).slice(0, topK).map(s => ({ doc: s.c.doc, quote: s.c.quote, score: s.score }));
  }
};
