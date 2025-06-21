import { create } from 'zustand';

export interface Column {
  _id: number;
  title: string;
}
export interface Todo {
  _id: number;
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
  columns: [],
  todos: [],
  viewTodo: false,
  maxValue: 0,
  selectedTodo: { _id: 0, parentId: 0, title: '', description: '', order: 0 },
  addColumn: (title: string) => {
    set((state) => ({
      columns: [
        ...state.columns,
        { _id: generateId(), title },
      ],
    }));
  },
  setSelectedTodo: (parentId, childId, maxValue) =>
    set((state) => {
      const todo = state.todos.find((item) => item.parentId === parentId && item._id === childId);
      return {
        selectedTodo: todo || {
          _id: childId,
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
        todos: state.todos.filter((todo) => todo.parentId !== column._id),
      };
    }),
  addTask: (parentId, title,order) => {
    set((state) => {
      const maxId = state.todos.length ? Math.max(...state.todos.map(t => t._id)) : 100;
      return {
        todos: [
          ...state.todos,
          {
            _id: maxId + 1,
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
      todos: state.todos.filter((todo) => !(todo.parentId === parentId && todo._id === childId)),
    })),
  updateTask: (parentId: number, childId: number, updatedTask: Partial<Todo>) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.parentId === parentId && todo._id === childId
          ? { ...todo, ...updatedTask }
          : todo
      )
    })),
  toNext: (id: Number) =>
    set((state) => {
      const columns = [...state.columns];
      const index = columns.findIndex((cl) => cl._id === id);
      if (index !== -1 && index < columns.length - 1) {
        const [item] = columns.splice(index, 1);
        columns.splice(index + 1, 0, item);
      }
      return { columns };
    }),
  toPrevious: (id: Number) =>
    set((state) => {
      const columns = [...state.columns];
      const index = columns.findIndex((cl) => cl._id === id);
      if (index > 0) {
        const [item] = columns.splice(index, 1);
        columns.splice(index - 1, 0, item);
      }
      return { columns };
    }),
  changeTitle: (id, title) => set((state) => ({
    columns: state.columns.map(col =>
      col._id === id ? { ...col, title } : col
    ),
  }))
}));
