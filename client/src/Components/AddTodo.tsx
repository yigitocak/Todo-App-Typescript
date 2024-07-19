import { Button } from "./Button";
import React, { useState } from "react";
import { BASE_URL } from "../utils/utils";
import axios from "axios";
import { useAppContext } from "../contexts/AppContextProvider";
import Cookies from "js-cookie";

export const AddTodo = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const { userEmail, getTodos } = useAppContext();
  const token = Cookies.get("authToken");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoInput === "" || todoInput.trim() === "") return;

    try {
      await axios.post(
        `${BASE_URL}todo/${userEmail}/add`,
        {
          todo: todoInput,
          completed: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      getTodos();
      setTodoInput("");
    } catch (e) {}
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
      <Button
        color="bg-[#345a80]"
        hover="hover:bg-[#274461]"
        text="Add to list"
        onClick={() => {}}
      />
    </form>
  );
};
