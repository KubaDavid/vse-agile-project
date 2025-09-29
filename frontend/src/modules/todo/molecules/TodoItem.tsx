import { Checkbox, Flex, IconButton } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

import type { Todo } from '../types';

type Props = {
  todo: Todo;
  onToggle: (id: Todo['id']) => void;
  isLast: boolean;
};

export function TodoItem({ todo, onToggle, isLast }: Props) {
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

      <IconButton
        aria-label="Delete todo"
        icon={<FiTrash2 />}
        size="sm"
        colorScheme="red"
        borderRadius="full"
        opacity={0}
        transform="scale(0.95)"
        transition="all 0.2s ease"
        pointerEvents="none"
        _groupHover={{ opacity: 1, transform: 'scale(1)' }}
        variant="solid"
      />
    </Flex>
  );
}
