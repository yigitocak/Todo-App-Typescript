import { TodoItem } from "./TodoItem";
import { useAppContext } from "../contexts/AppContextProvider";

type TodoItemType = {
  id: any;
  todo: string;
  completed: boolean;
};

export const TodoList = () => {
  const { todoList, loggedIn } = useAppContext();

  const sortedTodoList = todoList.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      {loggedIn ? (
        <ul className="max-sm:flex-1 flex-1">
          {sortedTodoList.map((item: TodoItemType) => (
            <TodoItem
              todo={item.todo}
              id={item.id}
              completed={item.completed}
              key={item.id}
            />
          ))}
        </ul>
      ) : (
        <div className="max-sm:flex-1 flex-1">
          <p className="font-bold text-center mt-10">Login to add todos!</p>
        </div>
      )}
    </>
  );
};
