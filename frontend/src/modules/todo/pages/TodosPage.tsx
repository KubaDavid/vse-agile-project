import { Box, Tabs } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system/components';

import { TodoFilter, useTodos } from '../hooks/useTodos';
import { AddTodoForm } from '../molecules/AddTodoForm';
import { TodoList } from '../organisms/TodoList';

const FILTERS: Array<{ label: string; value: TodoFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Not completed', value: 'active' },
];

export function TodosPage() {
  const { todos, add, toggle, remove, filter, setFilter } = useTodos();

  return (
    <Box>
      <Heading mb={10}>Practical 02</Heading>

      <AddTodoForm onSubmit={add} />
      <Tabs.Root
        variant="soft-rounded"
        colorPalette="blue"
        mt={10}
        value={filter}
        onValueChange={({ value }) => setFilter(value as TodoFilter)}
      >
        <Tabs.List>
          {FILTERS.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      <TodoList todos={todos} onToggle={toggle} onRemove={remove} mt={6} />
    </Box>
  );
}
