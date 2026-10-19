const test = require('node:test');
const assert = require('node:assert');
const { createStore } = require('../src/todos');

test('adds a to-do with a trimmed title', () => {
  const todos = createStore();
  const todo = todos.add('  buy milk  ');
  assert.deepStrictEqual(todo, { id: 1, title: 'buy milk', done: false });
});

test('refuses an empty title', () => {
  const todos = createStore();
  assert.throws(() => todos.add('   '), /title is required/);
});

test('completes and removes to-dos', () => {
  const todos = createStore();
  todos.add('a');
  todos.add('b');
  assert.strictEqual(todos.complete(2).done, true);
  assert.strictEqual(todos.remove(1), true);
  assert.strictEqual(todos.remove(1), false);
  assert.deepStrictEqual(todos.list().map((t) => t.title), ['b']);
});

test('counts what is left to do', () => {
  const todos = createStore();
  todos.add('a');
  todos.add('b');
  todos.add('c');
  todos.complete(1);
  assert.deepStrictEqual(todos.stats(), { total: 3, done: 1, remaining: 2 });
});
