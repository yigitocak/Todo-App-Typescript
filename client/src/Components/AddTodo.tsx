import { Button } from "./Button";
import React, { useState } from "react";
import { BASE_URL } from "../utils/utils";
import axios from "axios";
import { useAppContext } from "../contexts/AppContextProvider";
import Cookies from "js-cookie";
import { Snackbar } from "./Snackbar.tsx";

export const AddTodo = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const {
    userEmail,
    todoList,
    setTodoList,
    setSnackbarMessage,
    setSnackbarOpen,
    snackbarMessage,
    snackbarOpen,
    loggedIn,
  } = useAppContext();
  const token = Cookies.get("authToken");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loggedIn) {
      setSnackbarMessage("You must login to add a todo!");
      return setSnackbarOpen(true);
    }

    if (todoInput === "" || todoInput.trim() === "") return;
    const todoId = crypto.randomUUID();
    const todoTimestamp = Date.now();

    try {
      await axios.post(
        `${BASE_URL}todo/${userEmail}/add`,
        {
          id: todoId,
          todo: todoInput,
          completed: false,
          timestamp: todoTimestamp,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const newTodo = {
        id: todoId,
        todo: todoInput,
        completed: false,
        timestamp: todoTimestamp,
      };

      setTodoList([newTodo, ...todoList]);
      setTodoInput("");
    } catch (e) {
      setSnackbarMessage("Error when adding todo!");
      return setSnackbarOpen(true);
    }
  };

  return (
    <>
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
      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};
