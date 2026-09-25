import { Router } from "express";
import deliveriesRouter from "./deliveries.routes.js";

const router = Router();

router.use("/entregas", deliveriesRouter);

export default router;
