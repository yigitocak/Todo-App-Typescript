import express from "express";
const todo = express.Router();
import {
  getTodosView,
  createTodoView,
  deleteTodoView,
  completeTodoView,
} from "../views/todoViews.js";
import authenticateToken from "../middlewares/authenticateToken.js";

todo.use(express.json());

todo.get("/:email", getTodosView);

todo.post("/:email/add", authenticateToken, createTodoView);

todo.delete("/:email/delete/:todoId", authenticateToken, deleteTodoView);

todo.put("/:email/complete/:todoId", authenticateToken, completeTodoView);

export default todo;
