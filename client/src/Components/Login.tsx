import React, { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Snackbar } from "./Snackbar";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useAppContext } from "../contexts/AppContextProvider";
import Cookies from "js-cookie";

export const Login = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<any>(false);

  const {
    setUserEmail,
    setLoggedIn,
    setSnackbarMessage,
    setSnackbarOpen,
    snackbarMessage,
    snackbarOpen,
  } = useAppContext();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "" || password === "") {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}login`, {
        email,
        password,
        rememberMe,
      });

      setUserEmail(response.data.email);
      setLoggedIn(true);
      setEmail("");
      setPassword("");
      setRememberMe(false);
      setOpen(false);
      Cookies.set("authToken", response.data.token);
      setSnackbarMessage("Login successful");
      setSnackbarOpen(true);
    } catch (e: any) {
      if (e.response.status === 401) {
        setSnackbarMessage("Incorrect password");
        setSnackbarOpen(true);
      }

      if (e.response.status === 404) {
        setSnackbarMessage("Email not found");
        setSnackbarOpen(true);
        return;
      }
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      email.trim() === ""
    ) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarOpen(true);
      return;
    }

    if (
      email.includes(" ") ||
      password.includes(" ") ||
      confirmPassword.includes(" ")
    ) {
      setSnackbarMessage("Fields should not contain spaces.");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setSnackbarOpen(true);
      return;
    }

    if (password.length < 8) {
      setSnackbarMessage("Password should be at least 8 characters long.");
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(`${BASE_URL}register`, {
        email,
        password,
      });
      setConfirmPassword("");
      setPassword("");
      setEmail("");
      setName("");
      setOpen(false);

      setSnackbarMessage("Registration successful!");
      setSnackbarOpen(true);
    } catch (error: any) {
      if (error.response.status === 409) {
        setSnackbarMessage("Email already exists!");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Registration failed. Please try again.");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <div className="p-2 flex flex-col items-center gap-2">
      <Button
        color="bg-[#4f7ca8]"
        hover="hover:bg-[#375775]"
        text="Log in"
        onClick={() => setOpen(true)}
      />
      <Button
        color="bg-[#4f7ca8]"
        hover="hover:bg-[#375775]"
        text="Register"
        onClick={() => {
          setOpen(true);
          setRegister(true);
        }}
      />

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setRegister(false);
        }}
      >
        {register ? (
          <form className="flex flex-col px-4 pt-4" onSubmit={handleRegister}>
            <label className="font-bold">E-mail:</label>
            <input
              type="text"
              className="w-full p-1 rounded border-2 border-gray-400 my-1 mb-4 max-sm:mb-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-bold">Name:</label>
            <input
              type="text"
              className="w-full p-1 rounded border-2 border-gray-400 my-1 mb-4 max-sm:mb-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="font-bold">Password:</label>
            <input
              type="password"
              className="w-full p-1 rounded border-2 border-gray-400 my-1 mb-4 max-sm:mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="font-bold">Confirm Password:</label>
            <input
              type="password"
              className="w-full p-1 rounded border-2 border-gray-400 my-1 mb-6 max-sm:mb-12"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="ml-auto ">
              <Button
                color="bg-[#4f7ca8]"
                hover="hover:bg-[#375775]"
                text="Create my account!"
                onClick={() => {}}
              />
            </div>
          </form>
        ) : (
          <form className="flex flex-col px-4 pt-4" onSubmit={handleLogin}>
            <label className="font-bold">E-mail:</label>
            <input
              type="text"
              className="w-full p-1 rounded border-2 border-gray-400 my-1 mb-4 max-sm:mb-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-bold">Password:</label>
            <input
              type="password"
              className="w-full p-1 rounded border-2 border-gray-400 my-1 mb-4 max-sm:mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <label className="font-bold">Remember me</label>
              <input
                type="checkbox"
                className="mt-0.35"
                value={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>
            <div className="ml-auto ">
              <Button
                color="bg-[#4f7ca8]"
                hover="hover:bg-[#375775]"
                text="Log in"
                onClick={() => {}}
              />
            </div>
          </form>
        )}
      </Modal>

      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};
