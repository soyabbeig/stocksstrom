const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let adminPassword = 'admin123';

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User exists' });
  }
  users.push({ username, password, approved: false });
  res.json({ message: 'Registered, pending approval' });
});

app.post('/api/admin/approve', (req, res) => {
  const { username, adminPass } = req.body;
  if (adminPass !== adminPassword) return res.status(403).json({ message: 'Forbidden' });
  let user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.approved = true;
  res.json({ message: 'User approved' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  let user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (!user.approved) return res.status(403).json({ message: 'User not approved yet' });
  res.json({ message: 'Login successful' });
});

app.listen(4000, () => console.log('Backend running on port 4000'));
