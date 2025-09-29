import { Stack, type StackProps } from '@chakra-ui/react';

import { TodoItem } from '../molecules/TodoItem';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
  onToggle: (id: Todo['id']) => void;
} & Omit<StackProps, 'onToggle'>;

export function TodoList({ todos, onToggle, ...stackProps }: Props) {
  return (
    <Stack spaceY={2} {...stackProps}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </Stack>
  );
}
