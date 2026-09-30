import { DriversRepository } from "../repositories/drivers.repository.js";
import { DriversService } from "../services/drivers.service.js";
import { DriversController } from "../controllers/drivers.controller.js";
import { Router } from "express";
import { Database } from "../database/database.js";
import { validateCreateDrivers } from "../middlewares/validate.create.drivers.middleware.js";
import { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { validateListDeliveries } from "../middlewares/validate.list.deliveries.middleware.js";

const database = new Database();
const driversRepository = new DriversRepository(database);
const deliveriesRepository = new DeliveriesRepository(database);
const service = new DriversService(driversRepository, deliveriesRepository);
const controller = new DriversController(service);

const router = Router();

router.post("/", validateCreateDrivers, controller.create);

router.get("/", controller.list);

router.get("/:id", controller.read);

router.get("/:id/entregas", validateListDeliveries, controller.listDeliveries);

export default router;
