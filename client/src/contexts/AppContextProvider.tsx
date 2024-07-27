import React, { createContext, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/utils";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type TodoItemType = {
  timestamp: number;
  id: string;
  todo: string;
  completed: boolean;
};

type Contexts = {
  todoCount: number;
  setTodoCount: React.Dispatch<React.SetStateAction<number>>;
  todoList: TodoItemType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarMessage: string;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  snackbarOpen: boolean;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getTodos: () => void;
};

const AppContext = createContext<Contexts | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [todoCount, setTodoCount] = useState<number>(0);
  const [todoList, setTodoList] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const getTodos = async (): Promise<void> => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${BASE_URL}todo/${userEmail}`,
      );
      setTodoCount(response.data.todos.length);
      setTodoList(response.data.todos);
    } catch (e: any) {
      setSnackbarMessage(e.response?.message || "An error occurred");
      setSnackbarOpen(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        todoCount,
        setTodoCount,
        todoList,
        setTodoList,
        userEmail,
        setUserEmail,
        loggedIn,
        setLoggedIn,
        snackbarMessage,
        setSnackbarMessage,
        snackbarOpen,
        setSnackbarOpen,
        getTodos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
