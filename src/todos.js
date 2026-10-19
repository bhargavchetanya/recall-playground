// In-memory to-do list. It starts empty every time the server starts.

function createStore() {
  let items = [];
  let nextId = 1;

  return {
    list() {
      return items;
    },

    add(title) {
      const clean = typeof title === 'string' ? title.trim() : '';
      if (!clean) {
        throw new Error('title is required');
      }
      const todo = { id: nextId++, title: clean, done: false };
      items.push(todo);
      return todo;
    },

    complete(id) {
      const todo = items.find((t) => t.id === id);
      if (todo) {
        todo.done = true;
      }
      return todo;
    },

    remove(id) {
      const before = items.length;
      items = items.filter((t) => t.id !== id);
      return items.length < before;
    },

    stats() {
      const done = items.filter((t) => t.done).length;
      // Challenge 6: this line has a bug. `npm test` finds it.
      const remaining = items.filter((t) => t.done).length;
      return { total: items.length, done, remaining };
    },
  };
}

module.exports = { createStore };
