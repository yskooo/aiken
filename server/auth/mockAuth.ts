import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const usersFile = path.join(process.cwd(), 'fixtures', 'users.json');

function readUsers() {
  try {
    const raw = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u: any) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // in mock we ignore password
  return res.json({ token: 'mock-token-' + user.id, user });
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const users = readUsers();
  const exists = users.find((u: any) => u.email === email);
  if (exists) return res.status(400).json({ error: 'User exists' });
  const id = 'user_' + (users.length + 1);
  const newUser = { id, name, email, timezone: 'UTC' };
  users.push(newUser);
  writeUsers(users);
  return res.json({ token: 'mock-token-' + id, user: newUser });
});

export default router;
