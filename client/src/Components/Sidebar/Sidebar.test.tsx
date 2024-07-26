import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sidebar } from "./Sidebar";
import { AppContextProvider } from "../../contexts/AppContextProvider";

describe("Sidebar Component", () => {
  test("renders AddTodo component", () => {
    render(
      <AppContextProvider>
        <Sidebar />
      </AppContextProvider>,
    );
    const addTodoComponent = screen.getByText(/Add a todo:/i);
    expect(addTodoComponent).toBeInTheDocument();
  });

  test("does not render Log Out and Delete Account buttons when user is not logged in", () => {
    const { queryByText } = render(
      <AppContextProvider>
        <Sidebar />
      </AppContextProvider>,
    );
    const logOutButton = queryByText("Log Out");
    const deleteAccountButton = screen.queryByText(/Delete Account/i);
    expect(deleteAccountButton).not.toBeInTheDocument();
    expect(logOutButton).not.toBeInTheDocument();
  });
});
