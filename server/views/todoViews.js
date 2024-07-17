import knex from "knex";
import knexfile from "../knexfile.js";
const db = knex(knexfile.development);

export const getTodosView = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Bad request body", success: false });
    }
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const { id, password, created_at, ...resUser } = user;
    return res.status(200).json(resUser);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Failed to get data", success: false });
  }
};

export const createTodoView = async (req, res) => {
  try {
    const { email } = req.params;
    const { todo } = req.body;

    if (!email || !todo) {
      return res.status(400).json({
        message: "Bad request body",
        success: false,
      });
    }

    const user = await db("users").where({ email }).first();

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const currentTodos = user.todos || [];
    const updatedTodos = [
      ...currentTodos,
      { todo, id: crypto.randomUUID(), completed: false },
    ];

    await db("users")
      .where({ email })
      .update({ todos: JSON.stringify(updatedTodos) });

    return res.status(201).json({ message: "OK!", success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Failed to upload todo", success: false });
  }
};

export const deleteTodoView = async (req, res) => {
  try {
    const { email, todoId } = req.params;
    const user = await db("users").where({ email }).first();

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    const currentTodos = user.todos || [];
    const updatedTodos = currentTodos.filter((todo) => todo.id !== todoId);

    if (updatedTodos.length === currentTodos.length) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }

    await db("users")
      .where({ email })
      .update({ todos: JSON.stringify(updatedTodos) });

    return res
      .status(200)
      .json({ message: "Todo deleted successfully", success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const completeTodoView = async (req, res) => {
  try {
    const { email, todoId } = req.params;

    const user = await db("users").where({ email }).first();

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const currentTodos = user.todos || [];
    const selectedTodo = currentTodos.find((todo) => todo.id === todoId);
    selectedTodo.completed = !selectedTodo.completed;

    if (!selectedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }

    await db("users")
      .where({ email })
      .update({ todos: JSON.stringify(currentTodos) });

    return res.status(200).json({ message: "Todo completed", success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
