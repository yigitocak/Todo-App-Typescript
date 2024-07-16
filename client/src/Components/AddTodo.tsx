import { Button } from "./Button.tsx";
import { useState } from "react";

export const AddTodo = () => {
  const [todoInput, setTodoInput] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    localStorage.setItem("todos", todoInput);
  };

  return (
    <form
      className="flex items-center flex-col flex-1 p-2"
      onSubmit={handleSubmit}
    >
      <span className="font-bold max-sm:text-center mt-2">Add a todo:</span>
      <input
        type="text"
        placeholder="Enter todo..."
        value={todoInput}
        onChange={(e) => {
          setTodoInput(e.target.value);
        }}
        className="w-full m-2 max-sm:p-1 p-2 rounded border"
      />
      <Button primary="primary" text="Add to list" />
    </form>
  );
};
