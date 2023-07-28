import { Checkbox, HStack, Stack, Text } from '@chakra-ui/react';
import { useFilter, useTodos } from '../store.js';

const Todo = ({ id, title, completed }) => {
  const toggleTodo = useTodos((state) => state.toggleTodo);
  return (
    <HStack spacing={4}>
      <Checkbox isChecked={completed} onChange={() => toggleTodo(id)} />
      <Text>{title}</Text>
    </HStack>
  );
};

const TodoList = () => {
  const filter = useFilter((state) => state.filter);
  const todos = useTodos((state) => {
    //! switch буде відбуватись по фільтру
    switch (filter) {
      //! якщо filter буде = 'completed' тоді будем повертати і фільтрувати тудушки тільки ті які completed
      case 'completed':
        return state.todos.filter((todo) => todo.completed);
      //! якщо filter буде = 'uncompleted' тоді будем повертати і фільтрувати тудушки тільки ті які !completed
      case 'uncompleted':
        return state.todos.filter((todo) => !todo.completed);
      //! по дефолту в нас просто повертаються всі тудушки
      default:
        return state.todos;
    }
  });

  return (
    <Stack minH="300px">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Stack>
  );
};

export { TodoList };
