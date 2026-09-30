import { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveriesController } from "../controllers/deliveries.controller.js";
import { Router } from "express";
import { Database } from "../database/database.js";
import { validateCreateDeliveries } from "../middlewares/validate.create.deliveries.middleware.js";
import { DriversRepository } from "../repositories/drivers.repository.js";
import { validateListDeliveries } from "../middlewares/validate.list.deliveries.middleware.js";
import { validateAssignDrivers } from "../middlewares/validate.assign.drivers.middleware.js";

const database = new Database();
const deliveriesRepository = new DeliveriesRepository(database);
const driversRepository = new DriversRepository(database);
const service = new DeliveriesService(deliveriesRepository, driversRepository);
const controller = new DeliveriesController(service);

const router = Router();

router.post("/", validateCreateDeliveries, controller.create);

router.get("/", validateListDeliveries, controller.list);

router.get("/:id", controller.read);

router.patch("/:id/avancar", controller.advance);

router.patch("/:id/cancelar", controller.cancel);

router.get("/:id/historico", controller.listHistory);

router.patch("/:id/atribuir", validateAssignDrivers, controller.assign);

export default router;
