import { create } from 'zustand';

export interface Column {
  id: number;
  title: string;
}
export interface Todo {
  id: number;
  parentId: number;
  title: string;
  description?: string;
  order: number;
}

interface TaskStoreProps {
  columns: Column[];
  todos: Todo[];
  viewTodo: boolean;
  selectedTodo: Todo;
  maxValue: number;
  toNext: (id:Number) => void;
  toPrevious: (id:Number) => void;
  setSelectedTodo: (parentId: number, childId: number, maxValue:number) => void;
  setViewTodo: (view: boolean) => void;
  addColumn: (title: string) => void;
  removeColumn: (title: string) => void;
  addTask: (parentId: number, title: string , order:number) => void;
  deleteTask: (parentId: number, childId: number) => void;
  updateTask: (parentId: number, childId: number, updatedTask: Partial<Todo>) => void;
  changeTitle : (id:Number,title:string) => void
}

const generateId = () => Date.now() + Math.floor(Math.random() * 10000);

export const useTaskStore = create<TaskStoreProps>((set) => ({
  columns: [
    { id: 123, title: 'ToDo' },
    { id: 456, title: 'In Progress' },
    { id: 789, title: 'Done' },
  ],
  todos: [
    {
      id: 101,
      parentId: 123,
      title: 'Task 1',
      description: 'Description for Task 1',
      order: 1,
    },
    {
      id: 102,
      parentId: 123,
      title: 'Task 2',
      description: 'Description for Task 2',
      order: 2,
    },
    {
      id: 103,
      parentId: 123,
      title: 'Task 3',
      description: 'Description for Task 3',
      order: 3,
    },
    {
      id: 201,
      parentId: 456,
      title: 'Task 4',
      description: 'Description for Task 4',
      order: 1,
    },
    {
      id: 202,
      parentId: 456,
      title: 'Task 5',
      description: 'Description for Task 5',
      order: 2,
    },
    {
      id: 301,
      parentId: 789,
      title: 'Task 6',
      description: 'Description for Task 6',
      order: 1,
    },
  ],
  viewTodo: false,
  maxValue: 0,
  selectedTodo: {
      id: 101,
      parentId: 123,
      title: 'Task 1',
      description: 'Description for Task 1',
      order: 1,
    },
  addColumn: (title: string) => {
    set((state) => ({
      columns: [
        ...state.columns,
        { id: generateId(), title },
      ],
    }));
  },
  setSelectedTodo: (parentId, childId, maxValue) =>
    set((state) => {
      const todo = state.todos.find((item) => item.parentId === parentId && item.id === childId);
      return {
        selectedTodo: todo || {
          id: childId,
          parentId,
          title: '',
          description: '',
          order: 0,
        },
        maxValue
      };
    }),
  setViewTodo: (view: boolean) => set(() => ({ viewTodo: view })),
  removeColumn: (title: string) =>
    set((state) => {
      const column = state.columns.find((col) => col.title === title);
      if (!column) return {};
      return {
        columns: state.columns.filter((col) => col.title !== title),
        todos: state.todos.filter((todo) => todo.parentId !== column.id),
      };
    }),
  addTask: (parentId, title,order) => {
    set((state) => {
      const maxId = state.todos.length ? Math.max(...state.todos.map(t => t.id)) : 100;
      return {
        todos: [
          ...state.todos,
          {
            id: maxId + 1,
            parentId,
            title,
            description: '',
            order,
          },
        ],
      };
    });
  },
  deleteTask: (parentId: number, childId: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => !(todo.parentId === parentId && todo.id === childId)),
    })),
  updateTask: (parentId: number, childId: number, updatedTask: Partial<Todo>) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.parentId === parentId && todo.id === childId
          ? { ...todo, ...updatedTask }
          : todo
      )
    })),
  toNext: (id: Number) =>
    set((state) => {
      const columns = [...state.columns];
      const index = columns.findIndex((cl) => cl.id === id);
      if (index !== -1 && index < columns.length - 1) {
        const [item] = columns.splice(index, 1);
        columns.splice(index + 1, 0, item);
      }
      return { columns };
    }),
  toPrevious: (id: Number) =>
    set((state) => {
      const columns = [...state.columns];
      const index = columns.findIndex((cl) => cl.id === id);
      if (index > 0) {
        const [item] = columns.splice(index, 1);
        columns.splice(index - 1, 0, item);
      }
      return { columns };
    }),
  changeTitle: (id, title) => set((state) => ({
    columns: state.columns.map(col =>
      col.id === id ? { ...col, title } : col
    ),
  }))
}));
