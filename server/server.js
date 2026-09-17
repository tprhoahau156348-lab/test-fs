import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import jwt from 'jsonwebtoken';


const PORT = 3000;
const SECRET_KEY = 'jan_oblak_the_king_of_Barcelona';

const app = express();
const USERS_FILE = './users.json';


app.use(cors());
app.use(express.json());


const getUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};


const saveUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};




app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const users = await getUsers();
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password
  };

  users.push(newUser);
  await saveUsers(users);

  res.status(201).json({ message: 'User created successfully' });
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};



app.get('/api/me', authenticateToken, async (req, res) => {
  const users = await getUsers();
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});