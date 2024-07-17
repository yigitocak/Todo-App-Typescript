import express from "express";
const todo = express.Router();
import { getTodos, postTodo } from "../views/todoViews.js";

todo.use(express.json());

todo.get("/", getTodos);

todo.post("/", postTodo);

export default todo;
