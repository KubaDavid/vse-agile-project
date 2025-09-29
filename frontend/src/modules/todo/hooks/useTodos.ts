import { useState } from 'react';

import { Todo } from '../types';

export function useTodos(initialState: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialState);

  const add = (title: Todo['title']) => {
    const t = title.trim();
    if (!t) return;

    const newTodo: Todo = { id: crypto.randomUUID(), title: t, isDone: false };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggle = (id: Todo['id']) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  // TODO: Implement `remove` function

  return { todos, add, toggle };
}
