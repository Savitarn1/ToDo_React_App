import { useEffect, useState } from 'react';
import { useTaskStore, type Column, type Todo } from '../store/useTaskStore';
import Input from './Input';
import Section from './Section';

interface TaskData {
  data: Column;
  index?: number;
}

const ToDo = ({ data , index}: TaskData) => {
  const { removeColumn, addTask, todos , toNext , toPrevious , changeTitle, columns} = useTaskStore();

  const [filtered, setFiltered] = useState<Todo[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [title, setTitle] = useState('');
  const sortedTodos = todos.filter((todo) => todo.parentId === data._id).sort((a, b) => a.order - b.order);

  const handleAddTask = (title: string) => {
    addTask(data._id, title,filtered.length);
  };
  
  useEffect(() => {
    setFiltered(sortedTodos);
  }, [todos]);

  return (
    <div className={'bg-[#f7f9fa] p-2 rounded-md flex flex-col'}>
      <div className='flex flex-col flex-grow'>
        <div className='flex justify-between items-center font-semibold text-lg text-slate-500'>
          
            {inputVisible ? (
            <input
              type="text"
              autoFocus
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                setInputVisible(false);
                changeTitle(data._id , title);
              }
              }}
              onChange={(evt) => setTitle(evt.target.value)}
              className='grow-1 test'
              defaultValue={data.title}
            />
            ) : (
            <p onClick={() => {
              setInputVisible(true);
            }} className='uppercase flex-grow cursor-text'>{data.title}</p>
            )}
          <p>{filtered.length}</p>
        </div>
        {filtered.map((task) => (
          <Section maxValue={sortedTodos.length} parentId={task.parentId} childId={task._id} key={task._id}>
            {task.title}
          </Section>
        ))}
        <Input onSubmit={handleAddTask} place='New task' />
      </div>
      <div className='flex justify-between items-center mt-2'>
        <div className='flex max-sm:flex-col'>
          {index !== 0 && <button className='max-sm:rotate-90' onClick={() => toPrevious(data._id)}>⬅️</button>}
          {index !== columns.length -1 && <button className='max-sm:rotate-90' onClick={() => toNext(data._id)}>➡️</button>}
        </div>
        {data.title && removeColumn && (
          <button onClick={() => removeColumn(data._id)}>🗑️</button>
        )}
      </div>
    </div>
  );
};

export default ToDo;
