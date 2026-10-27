import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import router from "./routes/index.js";
import path from "node:path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/", router);

app.use(errorMiddleware);

app.use((req, res) => res.status(404).json({ erro: "recurso não encontrado" }));

export default app;
