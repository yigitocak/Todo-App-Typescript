import express from "express";
import cors from "cors";
import morgan from "morgan";
import todos from "./routes/todos.js";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));

app.use("/todo", todos);

app.listen(PORT || 5050, () => {
  console.log(`${PORT} is the port`);
});
