import { TodoItem } from "./TodoItem";
import { useAppContext } from "../contexts/AppContextProvider";

type TodoItemType = {
  id: any;
  todo: string;
  completed: boolean;
};

export const TodoList = () => {
  const { todoList } = useAppContext();

  const sortedTodoList = todoList.sort((a, b) => b.timestamp - a.timestamp);

  return (
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
  );
};
