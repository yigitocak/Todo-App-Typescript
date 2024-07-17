import knex from "knex";
import knexfile from "../knexfile.js";
const db = knex(knexfile.development);

export const getTodos = async (req, res) => {
  try {
    const { email } = req.body;
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

export const postTodo = async (req, res) => {
  try {
    const { email, todo } = req.body;

    if (!email || !todo) {
      return res.status(400).json({
        message: "Bad request body",
        success: false,
      });
    }

    const user = await db("users").where({ email }).first();

    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
    }

    const currentTodos = user.todos || [];
    const updatedTodos = [...currentTodos, todo];

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
