import { useTaskStore } from '../store/useTaskStore';

const FullToDo = () => {
  const { columns, setViewTodo, selectedTodo , maxValue , todos, updateTask} = useTaskStore();

  const selectTarget = (evt: React.MouseEvent<HTMLElement>) => {
    const target = evt.target as HTMLElement;
    if (!target.classList.contains('form') && target.classList.contains('parent'))
      setViewTodo(false);
  };

  const handleUpdate = () => {
    const originalData = todos.find((todo) => todo._id === selectedTodo._id);
    if (originalData)
      updateTask(selectedTodo.parentId, selectedTodo._id, selectedTodo, originalData);
    setViewTodo(false);
  };
  return (
    <div
      onClick={(evt) => selectTarget(evt)}
      className='parent fixed top-0 flex w-full h-screen bg-black/30 justify-center items-center'
    >
      <div className=' p-20'>
        <div className='form w-md bg-white m-auto p-4 rounded-lg'>
        <label htmlFor='title' className='text-[17px] font-semibold '>
          Title
        </label>
        <input
          id='title'
          type='text'
          defaultValue={selectedTodo.title}
          className='border border-gray-300 rounded-md p-2 w-full outline-orange-500 my-2'
          placeholder='Enter task title'
          onChange={() =>
            (selectedTodo.title = (
              document.getElementById('title') as HTMLInputElement
            ).value)
          }
        />
        <label htmlFor='description' className='text-[17px] font-semibold'>
          Description
        </label>
        <textarea
          name=''
          id='description'
          placeholder='Description'
          className='border border-gray-300 rounded-md p-2 w-full outline-orange-500 my-2'
          defaultValue={selectedTodo?.description || ''}
          onChange={() =>
            (selectedTodo.description = (
              document.getElementById('description') as HTMLTextAreaElement
            ).value)
          }
        ></textarea>
        <div className='grid grid-cols-2 gap-x-2'>
          <label className='text-[17px] font-semibold' htmlFor='column'>
            Column
          </label>
          <label className='text-[17px] font-semibold' htmlFor='order'>
            Order
          </label>
          <select
            name='column'
            id='column'
            className='border border-gray-300 rounded-md p-2 w-full outline-orange-500 my-2'
            onChange={() => {
              selectedTodo.parentId = 
                (document.getElementById('column') as HTMLSelectElement).value
            }}
          >
            <option defaultValue={selectedTodo._id}>
              {
                columns.find((column) => column._id === selectedTodo.parentId)
                  ?.title
              }
            </option>
            {columns.map(
              (column) =>
                column._id !== selectedTodo.parentId && (
                  <option key={column._id} value={column._id}>
                    {column.title}
                  </option>
                )
            )}
          </select>
          <input
            id='order'
            type='number'
            defaultValue={selectedTodo.order}
            max={maxValue}
            className='border border-gray-300 rounded-md p-2 w-full outline-orange-500 my-2'
            placeholder='Enter task order'
            onChange={() => {
              const value = Number((document.getElementById('order') as HTMLInputElement).value);
              selectedTodo.order = value > maxValue ? maxValue : value;
            }}
          />
        </div>
        <div className='flex justify-between items-center mt-15'>
          <button
            className='bg-red-500 py-2 px-3 text-white font-semibold rounded-lg'
            onClick={() => {
              useTaskStore.getState().deleteTask(selectedTodo.parentId, selectedTodo._id)
                setViewTodo(false);
            }}
          >
            Delete
          </button>
          <button
            className='bg-blue-500 py-2 px-3 text-white font-semibold rounded-lg'
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FullToDo;
