import { create } from 'zustand';
import client from '../service/axios-client';

export interface Column {
  _id: string;
  title: string;
}
export interface Todo {
  _id: string;
  parentId: string;
  title: string;
  description?: string | null;
  order: number;
}

interface TaskStoreProps {
  columns: Column[];
  todos: Todo[];
  viewTodo: boolean;
  maxValue: number;
  selectedTodo: Todo;
  addColumn: (title: string) => void;
  removeColumn: (id: string) => void;
  addTask: (parentId: string, title: string , order:number) => void;
  toNext: (id:string) => void;
  toPrevious: (id:string) => void;
  setSelectedTodo: (parentId: string, childId: string, maxValue:number) => void;
  setViewTodo: (view: boolean) => void;
  deleteTask: (parentId: string, childId: string) => void;
  updateTask: (parentId: string, childId: string, updatedTask: Todo) => void;
  changeTitle : (id:string,title:string) => void
}

const generateId = () => {
  const timestamp = Date.now().toString(16); // vaqtni hex formatda
  const random = Math.floor(Math.random() * 1e16).toString(16); // katta random son
  return (timestamp + random).padEnd(24, "0").slice(0, 24); // 24 belgiga to‘ldirish
};

export const useTaskStore = create<TaskStoreProps>((set,get) => ({
  columns: [],
  todos: [],
  viewTodo: false,
  maxValue: 0,
  selectedTodo: { _id: "0", parentId: "0", title: '', description: '', order: 0 },
  addColumn: async (title: string) => {
    const originalData = [...get().columns];
    const newData = { _id: generateId(), title }
    try {
      set((state) => ({
        columns: [
          ...state.columns,
          newData
        ],
      }));
      await client.post("column", newData);
    } catch (error) {
      console.error("Error posting column:", error);
      set({ columns: originalData });
    }
  },
  removeColumn: async (id: string) => {
    const originalColumn = [...get().columns];
    const originalTodo = [...get().todos];
    const selectedTodos = get().todos.filter((todo) => todo.parentId === id).map((todo) => todo._id);
    try {
      set((state) => {
        const column = state.columns.find((col) => col._id === id);
        if (!column) return {};
        return {
          columns: state.columns.filter((col) => col._id !== id),
          todos: state.todos.filter((todo) => todo.parentId !== id),
        };
      });

      await client.delete(`column/${id}`);

      await Promise.all(
        selectedTodos.map((todoId) => client.delete(`todo/${todoId}`))
      );
    } catch (error) {
      console.error("Error deleting column:", error);
      set({ columns: originalColumn, todos: originalTodo });
    }
  },
  addTask: async (parentId, title,order) => {
    const originalTodo = [...get().todos];
    const newTask = {_id: generateId(),parentId,title,order,};
    try {
      set((state) => ({ todos: [...state.todos, newTask] }));

      await client.post("todo", newTask);

    } catch (error) {
      console.error("Error posting todo:", error);
      set({ todos: originalTodo });
    }
  },
  deleteTask: async (parentId, childId) => {
    const originalTodo = [...get().todos];
    try {
      set((state) => ({
        todos: state.todos.filter((todo) => !(todo.parentId === parentId && todo._id === childId)),
      }));
      await client.delete(`todo/${childId}`);
    } catch (error) {
      console.error("Error deleting todo:", error);
      set({ todos: originalTodo });
    }
  },
  updateTask: async (parentId, childId, updatedTask) => {
    const originalTodo = [...get().todos];
    try {
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo.parentId === parentId && todo._id === childId) return updatedTask;
          return todo;
        }),
      }));

      const { data } = await client.put(`todo/${childId}`, updatedTask);
      console.log(data);
    } catch (error) {
      console.error("Error updating todo:", error);
      set({ todos: originalTodo });
    }
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
  setViewTodo: (view) => set(() => ({ viewTodo: view })),
  toNext: (id) =>
    set((state) => {
      const columns = [...state.columns];
      const index = columns.findIndex((cl) => cl._id === id);
      if (index !== -1 && index < columns.length - 1) {
        const [item] = columns.splice(index, 1);
        columns.splice(index + 1, 0, item);
      }
      return { columns };
    }),
  toPrevious: (id) =>
    set((state) => {
      const columns = [...state.columns];
      const index = columns.findIndex((cl) => cl._id === id);
      if (index > 0) {
        const [item] = columns.splice(index, 1);
        columns.splice(index - 1, 0, item);
      }
      return { columns };
    }),
  changeTitle: async (id, title) => {
    const originalColumns = [...get().columns];
    try {
      set((state) => ({
        columns: state.columns.map(col =>
          col._id === id ? { ...col, title } : col
        )}));
      const {data}  = await client.put(`column/${id}`, { title });
      console.log(data);
    } catch (error) {
      console.error("Error updating column:", error);
      set({ columns: originalColumns });
    }
  }
}));

