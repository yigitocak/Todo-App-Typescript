import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContextProvider.tsx";

export const Header = () => {
  const { todoCount, todoList, loggedIn } = useAppContext();
  const [completedTodo, setCompletedTodo] = useState<number>(0);

  useEffect(() => {
    const countComplete = () => {
      const completedCount = todoList.filter((todo) => todo.completed).length;
      setCompletedTodo(completedCount);
    };

    countComplete();
  }, [todoList]);

  return (
    <header className="max-sm:h-10 h-10 bg-[#deedfc] rounded-t-[8px] flex items-center border-b-2 px-4">
      <div className="flex gap-1.5 justify-center items-center mt-1">
        <div className="w-3 h-3 bg-[#7c868f] rounded-full"></div>
        <div className="w-3 h-3 bg-[#7c868f] rounded-full"></div>
        <div className="w-3 h-3 bg-[#7c868f] rounded-full"></div>
      </div>
      {loggedIn ? (
        <p className="ml-auto px-6">
          <span className="font-bold">{completedTodo}</span>/{todoCount}
          <span className="max-sm:hidden"> todos completed</span>
        </p>
      ) : (
        <></>
      )}
    </header>
  );
};
