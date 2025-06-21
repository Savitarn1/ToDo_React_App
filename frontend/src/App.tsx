import { useEffect } from 'react';
import FullToDo from './components/FullTodo';
import Input from './components/Input';
import ToDo from './components/ToDo';
import { useTaskStore } from './store/useTaskStore';
import client from './service/axios-client';

const App = () => {
  const {addColumn, viewTodo , columns} = useTaskStore();

  useEffect(() => {
    const controller = new AbortController();
    client.get('column' , {signal: controller.signal}).then(res => {
      const data = res.data;
      useTaskStore.setState({columns: data.data});
      console.log(data.data);
    })
    return () => controller.abort();
  }, [client]);

  useEffect(() => {
    const controller = new AbortController();
    client.get('todo' , {signal: controller.signal}).then(res => {
      const data = res.data;
      useTaskStore.setState({todos: data.data});
      console.log(data.data);
    })
    return () => controller.abort();
  },[client]);


  return (
    <div className='bg-[#e6f0fa] min-h-screen'>
      <main className='grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-5 py-5 px-3 items-start'>
        {columns.map((column , index) => (
          <ToDo key={column._id} index={index} data={column} />
        ))}
        <div
          className={
            'bg-[#f7f9fa] p-2 rounded-md flex flex-col justify-center ' +
            `order-1`
          }
        >
          <Input onSubmit={addColumn} place='New column' />
        </div>
      </main>
      {viewTodo && <FullToDo />}
    </div>
  );
};

export default App;
