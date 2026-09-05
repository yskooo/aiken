# Phase 3b verification notes

Files added/changed in Phase 3b (branch feature/phase-3b-rag):

- lib/vectorstore/mockVectorStore.ts (in-memory TF-like store)
- server/docs/mockDocs.ts (document upload + query endpoints)
- fixtures/documents.json (seed document)
- lib/rag.ts (client helper to query documents)
- app/handbook/index.tsx (handbook upload UI + ask demo)
- server/index.ts updated to mount docs router

DoD verification steps (local):
1. Start mock server: npm run server
2. Start Expo: npm run start
3. Open Handbook tab: upload the sample handbook text or use the seeded document
4. Ask a policy question using the "Ask (demo query)" button; if the document contains matching text the app shows the snippet + filename; otherwise it shows the low-confidence fallback.

Notes:
- The vector store is a simple substring-match mock to satisfy RAG citation requirements for demos.
- Phase 4 will integrate the RAG path into the RouterAgent for policy-backed replies in chat.
