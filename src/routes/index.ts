import { Router } from "express";
import deliveriesRouter from "./deliveries.routes.js";
import driversRouter from "./drivers.routes.js";

const router = Router();

router.use("/motoristas", driversRouter);
router.use("/entregas", deliveriesRouter);

export default router;
