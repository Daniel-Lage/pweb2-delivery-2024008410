import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", router);

app.use(errorMiddleware);

app.use((req, res) => res.status(404).json({ erro: "recurso não encontrado" }));

export default app;
