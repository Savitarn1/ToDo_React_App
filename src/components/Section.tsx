import { useTaskStore } from "../store/useTaskStore";

interface SectionProps {
  children?: React.ReactNode;
  parentId: number;
  childId: number;
  maxValue:number
}
const Section = ({children , parentId , childId , maxValue}:SectionProps) => {
  const{setViewTodo , setSelectedTodo} = useTaskStore();
  const handleClick = () => {
    setViewTodo(true);
    setSelectedTodo(parentId, childId,maxValue);
    }
  return (
    <p onClick={handleClick} className="bg-white p-2 py-1.5 text-lg my-2 rounded-md border-1 border-slate-200 shadow-md cursor-pointer hover:text-slate-500 text-slate-700">{children}</p>
  )
}

export default Section