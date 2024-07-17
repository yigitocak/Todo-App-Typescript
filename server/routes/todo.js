import express from "express";
const todo = express.Router();
import {
  getTodosView,
  createTodoView,
  deleteTodoView,
  completeTodoView,
} from "../views/todoViews.js";

todo.use(express.json());

todo.get("/:email", getTodosView);

todo.post("/:email/add", createTodoView);

todo.delete("/:email/delete/:todoId", deleteTodoView);

todo.put("/:email/complete/:todoId", completeTodoView);

export default todo;
