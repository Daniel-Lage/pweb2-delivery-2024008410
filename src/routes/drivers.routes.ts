import { DriversRepository } from "../repositories/drivers.repository.js";
import { DriversService } from "../services/drivers.service.js";
import { DriversController } from "../controllers/drivers.controller.js";
import { Router } from "express";
import { Database } from "../database/database.js";
import { validateCreateDrivers } from "../middlewares/validate.create.drivers.middleware.js";
import { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { DeliveriesService } from "../services/deliveries.service.js";

const database = new Database();
const driversRepository = new DriversRepository(database);
const deliveriesRepository = new DeliveriesRepository(database);
const driversService = new DriversService(driversRepository);
const deliveriesService = new DeliveriesService(deliveriesRepository);
const driversController = new DriversController(
  driversService,
  deliveriesService,
);

const router = Router();

router.post("/", validateCreateDrivers, driversController.create);

router.get("/", driversController.list);

router.get("/:id", driversController.read);

router.get("/:id/entregas", driversController.listDeliveries);

export default router;
