import express from "express";
const login = express.Router();

import { loginUserView } from "../views/loginViews.js";

login.use(express.json());

login.post("/", loginUserView);

export default login;
