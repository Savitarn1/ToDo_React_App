import { useEffect, useState } from 'react';
import { useTaskStore, type Column, type Todo } from '../store/useTaskStore';
import Input from './Input';
import Section from './Section';

interface TaskData {
  data: Column;
  index?: number;
}

const ToDo = ({ data , index}: TaskData) => {
  const { removeColumn, addTask, todos , toNext , toPrevious , changeTitle} = useTaskStore();

  const [filtered, setFiltered] = useState<Todo[]>([]);
  const [inputVisible, setInputVisible] = useState(false);

  const filteredTodos = todos.filter((todo) => todo.parentId === data.id);
  const sortedTodos = filteredTodos.sort((a, b) => a.order - b.order);
  useEffect(() => {
    setFiltered(sortedTodos);
  }, [todos, data.id]);
  
  const handleAddTask = (title: string) => {
    addTask(data.id, title,filtered.length);
  };


  return (
    <div className={'bg-[#f7f9fa] p-2 rounded-md flex flex-col '}>
      <div className='flex flex-col flex-grow'>
        <div className='flex justify-between items-center font-semibold text-lg text-slate-500'>
          
            {inputVisible ? (
            <input
              type="text"
              autoFocus
              onBlur={() => setInputVisible(false)}
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                setInputVisible(false);
              }
              }}
              onChange={(evt) => changeTitle(data.id , evt.target.value)}
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
          <Section maxValue={sortedTodos.length} parentId={task.parentId} childId={task.id} key={task.id}>
            {task.title}
          </Section>
        ))}
        <Input onSubmit={handleAddTask} place='New task' />
      </div>
      <div className='flex justify-between items-center mt-2'>
        <div className='flex flex-col'>
          {index !== 0 && <button className='max-sm:rotate-90' onClick={() => toPrevious(data.id)}>⬅️</button>}
          <button className='max-sm:rotate-90' onClick={() => toNext(data.id)}>➡️</button>
        </div>
        {data.title && removeColumn && (
          <button onClick={() => removeColumn(data.title)}>🗑️</button>
        )}
      </div>
    </div>
  );
};

export default ToDo;
