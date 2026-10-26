import { Router } from "express";
import deliveriesRouter from "./deliveries.views.routes.js";
import driversRouter from "./drivers.views.routes.js";

const router = Router();

router.get("/", (req, res) => res.redirect("/entregas"));
router.use("/motoristas", driversRouter);
router.use("/entregas", deliveriesRouter);

export default router;
