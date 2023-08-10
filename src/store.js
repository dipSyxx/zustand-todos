import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useTodos = create(
  persist(
    devtools((set, get) => ({
      todos: [
        { id: 1, title: 'Learn JS', completed: true },
        { id: 2, title: 'Learn React', completed: false },
      ],
      loading: false,
      error: null,
      //   addTodo: (title) =>
      //     set((state) => {
      //! створюємо нову тудушку з такими параметрами...
      //       const newTodo = { id: nanoid(), title, completed: false };
      //! повертаєм в масив todos всі текущі тудушки(...state.todos) і додаєм сторену до цього масиву newTodo
      //       return { todos: [...state.todos, newTodo] };
      //     }),

      //! в цьому варіанті ми зразу повертаєм і створюєм нову тудушку одночасно (коротки запис)
      //   addTodo: (title) =>
      //     set((state) => ({
      //       todos: [...state.todos, { id: nanoid(), title, completed: false }],
      //     })),

      deleteTodo: (todoId) =>
        set((state) => {
          // Видаляємо тудушку зі списку за заданим todoId
          const updatedTodos = state.todos.filter((todo) => todo.id !== todoId);
          return { todos: updatedTodos };
        }),

      addTodo: (title) => {
        const newTodo = { id: nanoid(), title, completed: false };

        //! Отримання всіх тудушок через ...get() і створення нової
        set({ todos: [...get().todos, newTodo] });
      },

      toggleTodo: (todoId) =>
        set({
          //! Додаєм сюди нові тудушки,візьми всі існуючі тудушки і замапь їх ( todos: get().todos.map((todo))
          todos: get().todos.map((todo) =>
            //! В такому випадку якщо ми отримали id яке рівне todo.id яке є в самої тудушки, якщо дорівнює то ми копіруєм тудушку(...todo)
            //! і змінюєм її стан на протилежне їй (completed: !todo.completed) якщо не дорвінює тоді просто верни тудушку
            todoId === todo.id ? { ...todo, completed: !todo.completed } : todo
          ),
        }),

      //! Асинхроні запроси
      fetchTodos: async () => {
        set({ loading: true });
        try {
          const res = await fetch(
            'https://jsonplaceholder.typicode.com/todos?_limit=10'
          );

          if (!res.ok) throw new Error('Failed to fetch');
          //! якщо все добре ми встановлюєм отримані тудушки set({todos: await res.json()})
          set({ todos: await res.json(), error: null });
        } catch (error) {
          set({ error: error.massage });
        } finally {
          set({ loading: false });
        }
      },
    }))
  )
);

export const useFilter = create((set) => ({
  //! текущий фільтр
  filter: 'all',
  //! оновелння фільтру
  setFilter: (value) => set({ filter: value }),
}));
