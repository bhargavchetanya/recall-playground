// A tiny to-do API. The code is deliberately simple: what matters is the terminal work around it,
// which Recall turns into shared team knowledge. See README.md for the challenges.
const express = require('express');
const { createStore } = require('./src/todos');

const app = express();
const todos = createStore();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/todos', (req, res) => res.json(todos.list()));

app.post('/todos', (req, res) => {
  try {
    res.status(201).json(todos.add(req.body && req.body.title));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/todos/:id/done', (req, res) => {
  const todo = todos.complete(Number(req.params.id));
  return todo ? res.json(todo) : res.status(404).json({ error: 'no such to-do' });
});

app.delete('/todos/:id', (req, res) => {
  return todos.remove(Number(req.params.id)) ? res.status(204).end() : res.status(404).json({ error: 'no such to-do' });
});

app.get('/stats', (req, res) => res.json(todos.stats()));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`To-do API on http://localhost:${port}`));
