import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import todo from "./routes/todo.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import del from "./routes/delete.js";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("/todo", todo);
app.use("/delete", del);
app.use("/register", register);
app.use("/login", login);

app.listen(PORT || 5050, () => {
  console.log(`${PORT} is the port`);
});
