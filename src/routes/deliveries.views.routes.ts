import { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveriesViewsController } from "../controllers/deliveries.views.controller.js";
import { Router } from "express";
import { validateCreateDeliveries } from "../middlewares/validate.create.deliveries.middleware.js";
import { validateListDeliveries } from "../middlewares/validate.list.deliveries.middleware.js";
import { validateAssignDrivers } from "../middlewares/validate.assign.drivers.middleware.js";
import { DeliveriesPrismaRepository } from "../repositories/deliveries.prisma.repository.js";
import { DriversPrismaRepository } from "../repositories/drivers.prisma.repository.js";
import { DriversService } from "../services/drivers.service.js";

const deliveriesRepository = new DeliveriesPrismaRepository();
const driversRepository = new DriversPrismaRepository();

const deliveriesService = new DeliveriesService(
  deliveriesRepository,
  driversRepository,
);
const driversService = new DriversService(
  driversRepository,
  deliveriesRepository,
);
const controller = new DeliveriesViewsController(
  deliveriesService,
  driversService,
);

const router = Router();

router.post("/", validateCreateDeliveries, controller.create);

router.get("/", validateListDeliveries, controller.list);

router.get("/nova", controller.form);

router.get("/:id", controller.read);

router.post("/:id/avancar", controller.advance);

router.post("/:id/cancelar", controller.cancel);

router.post("/:id/atribuir", validateAssignDrivers, controller.assign);

export default router;
