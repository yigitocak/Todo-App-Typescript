import del from "../assets/delete.svg";
import { useState } from "react";

type ListProps = {
  content: string;
};

export const TodoItem = ({ content }: ListProps) => {
  const [done, setDone] = useState<boolean>(false);

  return (
    <li
      className="border-b-2 p-2 flex items-center justify-between"
      onClick={() => setDone(!done)}
    >
      <p
        className={`${!done ? "" : "line-through text-[#ccc]"} cursor-pointer`}
      >
        {content}
      </p>
      <img src={del} alt="delete" className="h-5 cursor-pointer" />
    </li>
  );
};
