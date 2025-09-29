import { Checkbox, Flex } from '@chakra-ui/react';

import type { Todo } from '../types';

type Props = {
  todo: Todo;
  onToggle: (id: Todo['id']) => void;
};

export function TodoItem({ todo, onToggle }: Props) {
  return (
    <Flex justify="space-between">
      <Checkbox.Root checked={todo.isDone} onChange={() => onToggle(todo.id)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label
          textDecoration={todo.isDone ? 'line-through' : undefined}
        >
          {todo.title}
        </Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  );
}
