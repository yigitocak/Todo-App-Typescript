import { AddTodo } from "./AddTodo";
import { Login } from "./Login";
import { useAppContext } from "../contexts/AppContextProvider";
import { Button } from "./Button.tsx";
import Cookies from "js-cookie";

export const Sidebar = () => {
  const {
    loggedIn,
    userEmail,
    setLoggedIn,
    setUserEmail,
    setTodoList,
    setTodoCount,
  } = useAppContext();

  const handleLogout = () => {
    Cookies.remove("authToken");
    setLoggedIn(false);
    setUserEmail("");
    setTodoList([]);
    setTodoCount(0);
  };

  return (
    <section className="max-sm:flex-[0.60] flex-[0.5] lg:flex-[0.3] border-l-2 flex flex-col bg-[#f0f5fa] rounded-br-[8px]">
      <AddTodo />
      {loggedIn ? (
        <div className="text-center mb-5">
          Logged in: <span className="font-bold">{userEmail}</span>
          <div className="p-1.5">
            <Button
              color="bg-[#d91820]"
              hover="hover:bg-[#a61217]"
              text="Log Out"
              onClick={() => handleLogout()}
            />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </section>
  );
};
