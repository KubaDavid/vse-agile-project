import { useMemo, useState } from 'react';

import { Todo } from '../types';

export type TodoFilter = 'all' | 'completed' | 'active';

export function useTodos(initialState: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialState);
  const [filter, setFilter] = useState<TodoFilter>('all');

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

  const remove = (id: Todo['id']) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.isDone);
      case 'active':
        return todos.filter((todo) => !todo.isDone);
      default:
        return todos;
    }
  }, [filter, todos]);

  return { todos: filteredTodos, add, toggle, remove, filter, setFilter };
}
