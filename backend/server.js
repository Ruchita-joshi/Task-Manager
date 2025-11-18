const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (no database)
let tasks = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a REST API', completed: false },
  { id: 3, title: 'Deploy application', completed: false }
];

let nextId = 4;

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (req.body.title) task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.completed;

  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
