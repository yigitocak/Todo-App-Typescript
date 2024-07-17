import express from "express";
const register = express.Router();
import { registerUser } from "../views/registerViews.js";

register.use(express.json());

register.post("/", registerUser);

export default register;
