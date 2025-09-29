import { Button, Checkbox, Flex } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

import type { Todo } from '../types';

type Props = {
  todo: Todo;
  onToggle: (id: Todo['id']) => void;
  onRemove: (id: Todo['id']) => void;
  isLast: boolean;
};

export function TodoItem({ todo, onToggle, onRemove, isLast }: Props) {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={4}
      py={3}
      borderBottomWidth={isLast ? 0 : '1px'}
      borderColor="gray.100"
      bg="white"
      _hover={{ bg: 'blue.50' }}
      role="group"
      transition="background-color 0.2s ease"
    >
      <Checkbox.Root
        checked={todo.isDone}
        onChange={() => onToggle(todo.id)}
        colorPalette="blue"
        display="flex"
        alignItems="center"
        gap={3}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control rounded="md" boxSize="20px" />
        <Checkbox.Label
          fontWeight="medium"
          color={todo.isDone ? 'gray.400' : 'gray.800'}
          textDecoration={todo.isDone ? 'line-through' : undefined}
        >
          {todo.title}
        </Checkbox.Label>
      </Checkbox.Root>

      <Button
        leftIcon={<FiTrash2 />}
        colorScheme="red"
        variant="solid"
        size="sm"
        borderRadius="md"
        onClick={() => onRemove(todo.id)}
        data-testid="todo-delete"
      >
        Delete
      </Button>
    </Flex>
  );
}
