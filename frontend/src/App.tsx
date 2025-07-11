import { useEffect } from 'react';
import FullToDo from './components/FullTodo';
import Input from './components/Input';
import ToDo from './components/ToDo';
import { useTaskStore } from './store/useTaskStore';
import client from './service/axios-client';
import { CanceledError } from 'axios';

const App = () => {
  const { columns } = useTaskStore();

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await client.get('column',{signal:controller.signal});
        useTaskStore.setState({ columns: res.data.data });
      } catch (err) {
        if (err instanceof CanceledError) return;
        console.log(err);
      }
    };
    const fetchTodos = async () => {
      try {
        const res = await client.get('todo',{signal:controller.signal});
        useTaskStore.setState({ todos: res.data.data });
      } catch (err) {
        if (err instanceof CanceledError) return;
        console.log(err);
      }
    };
    const controller = new AbortController();
    fetchColumns();
    fetchTodos();
    return () => controller.abort();
  }, [client]);

  return (
    <div className='bg-[#e6f0fa] min-h-screen'>
      <main className='grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-5 py-5 px-3 items-start'>
        {columns.map((column, index) => (
          <ToDo key={column._id} index={index} data={column} />
        ))}
        <div
          className={
            'bg-[#f7f9fa] p-2 rounded-md flex flex-col justify-center ' +
            `order-1`
          }
        >
          <Input onSubmit={useTaskStore.getState().addColumn} place='New column' />
        </div>
      </main>
      {useTaskStore.getState().viewTodo && <FullToDo />}
    </div>
  );
};

export default App;
