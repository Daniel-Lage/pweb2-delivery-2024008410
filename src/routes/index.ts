import { Router } from "express";

import apiRouter from "./api.routes.js";
import viewsRouter from "./views.routes.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);

export default router;
