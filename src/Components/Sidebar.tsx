import { AddTodo } from "./AddTodo.tsx";
import { Login } from "./Login.tsx";

export const Sidebar = () => {
  return (
    <section className="max-sm:flex-[0.60] flex-[0.5] lg:flex-[0.3] border-l-2 flex flex-col bg-[#f0f5fa] rounded-br-[8px]">
      <AddTodo />
      <Login />
    </section>
  );
};
