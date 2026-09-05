import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/v1/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Aiken server listening on ${port}`);
});
