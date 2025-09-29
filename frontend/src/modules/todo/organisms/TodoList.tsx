import { Box, Stack, type StackProps } from '@chakra-ui/react';

import { TodoItem } from '../molecules/TodoItem';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
  onToggle: (id: Todo['id']) => void;
} & Omit<StackProps, 'onToggle'>;

export function TodoList({ todos, onToggle, ...stackProps }: Props) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="blue.200"
      bg="white"
      boxShadow="sm"
      overflow="hidden"
      {...stackProps}
    >
      <Stack spacing={0}>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            isLast={index === todos.length - 1}
          />
        ))}
      </Stack>
    </Box>
  );
}
