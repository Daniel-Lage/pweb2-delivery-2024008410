import { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveriesController } from "../controllers/deliveries.controller.js";
import { Router } from "express";
import { Database } from "../database/database.js";
import { validateCreateDeliveries } from "../middlewares/validate.create.deliveries.middleware.js";
import { DriversRepository } from "../repositories/drivers.repository.js";
import { DriversService } from "../services/drivers.service.js";

const database = new Database();
const deliveriesRepository = new DeliveriesRepository(database);
const driversRepository = new DriversRepository(database);
const deliveriesService = new DeliveriesService(deliveriesRepository);
const driversService = new DriversService(driversRepository);
const deliveriesController = new DeliveriesController(
  deliveriesService,
  driversService,
);

const router = Router();

router.post("/", validateCreateDeliveries, deliveriesController.create);

router.get("/", deliveriesController.list);

router.get("/:id", deliveriesController.read);

router.patch("/:id/avancar", deliveriesController.advance);

router.patch("/:id/cancelar", deliveriesController.cancel);

router.get("/:id/historico", deliveriesController.listHistory);

router.patch("/:id/atribuir", deliveriesController.assign);

export default router;
