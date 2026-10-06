import { Router } from "express";
import deliveriesRouter from "./deliveries.routes.js";
import driversRouter from "./drivers.routes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/motoristas", driversRouter);
router.use("/entregas", deliveriesRouter);

export default router;
