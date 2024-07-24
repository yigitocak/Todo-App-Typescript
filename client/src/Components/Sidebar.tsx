import { AddTodo } from "./AddTodo";
import { Login } from "./Login";
import { useAppContext } from "../contexts/AppContextProvider";
import { Button } from "./Button.tsx";
import Cookies from "js-cookie";
import { Modal } from "./Modal.tsx";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils.ts";
import { Snackbar } from "./Snackbar.tsx";

export const Sidebar = () => {
  const {
    loggedIn,
    userEmail,
    setLoggedIn,
    setUserEmail,
    setTodoList,
    setTodoCount,
    snackbarOpen,
    setSnackbarOpen,
    setSnackbarMessage,
    snackbarMessage,
  } = useAppContext();

  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const token = Cookies.get("authToken");

  const handleLogout = () => {
    Cookies.remove("authToken");
    setLoggedIn(false);
    setUserEmail("");
    setTodoList([]);
    setTodoCount(0);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          email: userEmail,
          password,
        },
      });

      Cookies.remove("authToken");
      setLoggedIn(false);
      setUserEmail("");
      setTodoList([]);
      setTodoCount(0);

      setSnackbarMessage("Account deleted!");
      setSnackbarOpen(true);
      setOpen(false);
    } catch (e: any) {
      if (e.response.status === 401) {
        setSnackbarMessage("Incorrect password!");
        return setSnackbarOpen(true);
      }

      setSnackbarMessage(e.response.data.message);
      return setSnackbarOpen(true);
    }
  };

  return (
    <section className="max-sm:flex-[0.60] flex-[0.5] lg:flex-[0.3] border-l-2 flex flex-col bg-[#f0f5fa] rounded-br-[8px]">
      <AddTodo />
      {loggedIn ? (
        <>
          <div className="text-center">
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
          <button
            className="ml-auto mr-2 text-red-900 hover:underline cursor-pointer text-[14px] mb-0.5"
            onClick={() => setOpen(true)}
          >
            Delete Account
          </button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <p className="text-center max-sm:mt-2">
              Are you sure you want to delete your account? <br />
              This action can't be undone!
            </p>
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-full p-1 rounded border-2 border-gray-400 my-1 mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex mt-5 gap-5">
              <Button
                color="bg-[#858585]"
                hover="bg-[#858585]"
                text="Cancel"
                onClick={() => setOpen(false)}
              />
              <Button
                color="bg-[#d91820]"
                hover="hover:bg-[#a61217]"
                text="Delete"
                onClick={() => handleDelete()}
              />
            </div>
          </Modal>
          <Snackbar
            message={snackbarMessage}
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
          />
        </>
      ) : (
        <Login />
      )}
    </section>
  );
};
