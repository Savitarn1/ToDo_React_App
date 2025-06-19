import { useRef } from 'react';

interface InputProps {
  place?: string;
  onSubmit: (title: string) => void;
}
const Input = ({ place, onSubmit }: InputProps) => {
  const input = useRef<HTMLInputElement>(null);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (input.current) {
      onSubmit(input.current.value);
      input.current.value = '';
    }
  };
  return (
    <form onSubmit={(evt) => handleSubmit(evt)} className='w-full'>
      <input
        ref={input}
        type='text'
        className='bg-white p-2 py-1 text-lg my-2 rounded-md border-1 border-slate-200 w-full outline-0'
        placeholder={place}
      />
    </form>
  );
};

export default Input;
