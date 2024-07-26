import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddTodo } from "./AddTodo";
import { AppContextProvider } from "../../contexts/AppContextProvider";

// Simplified Mocked Context Provider
const MockedProvider = ({
  children,
  loggedIn = false,
}: {
  children: React.ReactNode;
  loggedIn?: boolean;
}) => {
  const contextValue = {
    userEmail: "test@example.com",
    todoList: [],
    setTodoList: () => {},
    setSnackbarMessage: () => {},
    setSnackbarOpen: () => {},
    snackbarMessage: "",
    snackbarOpen: false,
    loggedIn: loggedIn,
    setLoggedIn: () => {},
  };

  return (
    <AppContextProvider value={contextValue}>{children}</AppContextProvider>
  );
};

describe("AddTodo Component", () => {
  test("renders Add to list button", () => {
    render(
      <MockedProvider>
        <AddTodo />
      </MockedProvider>,
    );
    const addTodoButton = screen.queryByText(/Add to list/i);
    expect(addTodoButton).toBeInTheDocument();
  });

  test("shows snackbar when trying to add todo without logging in", async () => {
    render(
      <MockedProvider>
        <AddTodo />
      </MockedProvider>,
    );
    const addTodoButton = screen.getByRole("button", { name: "Add to list" });
    fireEvent.click(addTodoButton);

    const snackbarMessage = await screen.findByText(
      /You must login to add a todo!/i,
    );
    expect(snackbarMessage).toBeInTheDocument();
  });

  test("input value changes when typing", () => {
    render(
      <MockedProvider loggedIn={true}>
        <AddTodo />
      </MockedProvider>,
    );

    const inputElement = screen.getByPlaceholderText(/Enter todo/i);
    fireEvent.change(inputElement, { target: { value: "New Todo" } });
    expect(inputElement).toHaveValue("New Todo");
  });
});
