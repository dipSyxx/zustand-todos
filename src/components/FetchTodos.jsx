import React from 'react';
import { useTodos } from '../store';
import shallow from 'zustand/shallow';
import { Button } from '@chakra-ui/react';

const FetchTodos = () => {
  const { loading, error, fetchTodos } = useTodos(
    (state) => ({
      loading: state.loading,
      error: state.error,
      fetchTodos: state.fetchTodos,
    }),
    shallow
  );
  return (
    <div>
      <Button isLoading={loading} onClick={fetchTodos}>
        {!error ? 'GET todos' : { error }}
      </Button>
    </div>
  );
};

export { FetchTodos };
