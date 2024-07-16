import { Button } from "./Button.tsx";
import { useState } from "react";

export const AddTodo = () => {
  const [todo, setTodo] = useState("");
  return (
    <form className="flex items-center flex-col flex-1 p-2">
      <span className="font-bold max-sm:text-center mt-2">Add a todo:</span>
      <input
        type="text"
        placeholder="Enter todo..."
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        className="w-full m-2 max-sm:p-1 p-2 rounded border"
      />
      <Button color="#345a80" hover="#274461" text="Add to list" />
    </form>
  );
};
