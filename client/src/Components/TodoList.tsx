import { TodoItem } from "./TodoItem.tsx";

export const TodoList = () => {
  const list = ["a", "b", "c", "d"];
  return (
    <ul className="max-sm:flex-1 flex-1">
      {list.map((item) => (
        <TodoItem content={item} key={item} />
      ))}
    </ul>
  );
};
