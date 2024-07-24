import express from "express";
const del = express.Router();
import authenticateToken from "../middlewares/authenticateToken.js";
import { deleteProfile } from "../views/deleteViews.js";

del.use(express.json());

del.delete("/", authenticateToken, deleteProfile);

export default del;
