import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import del from "../assets/delete.svg";
import { BASE_URL } from "../utils/utils";
import { useAppContext } from "../contexts/AppContextProvider";

type ListProps = {
  id: string;
  todo: string;
  completed: boolean;
};

export const TodoItem = ({ id, todo, completed }: ListProps) => {
  const { userEmail, getTodos } = useAppContext();
  const [done, setDone] = useState(completed);
  const token = Cookies.get("authToken");

  const handleClick = async () => {
    try {
      await axios.put(
        `${BASE_URL}todo/${userEmail}/complete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setDone(!done);
      getTodos();
    } catch (e) {}
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axios.delete(`${BASE_URL}todo/${userEmail}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getTodos();
    } catch (e) {}
  };

  return (
    <li
      className="border-b-2 p-2 flex items-center justify-between"
      onClick={handleClick}
    >
      <p
        className={`${!done ? "" : "line-through text-[#ccc]"} cursor-pointer`}
      >
        {todo}
      </p>
      <img
        src={del}
        alt="delete"
        className="h-5 cursor-pointer"
        onClick={handleDelete}
      />
    </li>
  );
};
