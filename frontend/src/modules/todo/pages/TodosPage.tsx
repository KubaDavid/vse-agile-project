import { Box } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system/components';

import { useTodos } from '../hooks/useTodos';
import { AddTodoForm } from '../molecules/AddTodoForm';
import { TodoList } from '../organisms/TodoList';

export function TodosPage() {
  const { todos, add, toggle } = useTodos();

  return (
    <Box>
      <Heading mb={10}>Practical 02</Heading>

      <AddTodoForm onSubmit={add} />
      <TodoList todos={todos} onToggle={toggle} mt={10} />
    </Box>
  );
}
