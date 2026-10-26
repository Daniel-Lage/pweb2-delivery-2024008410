import { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveriesViewsController } from "../controllers/deliveries.views.controller.js";
import { Router } from "express";
import { validateCreateDeliveries } from "../middlewares/validate.create.deliveries.middleware.js";
import { validateListDeliveries } from "../middlewares/validate.list.deliveries.middleware.js";
import { validateAssignDrivers } from "../middlewares/validate.assign.drivers.middleware.js";
import { DeliveriesPrismaRepository } from "../repositories/deliveries.prisma.repository.js";
import { DriversPrismaRepository } from "../repositories/drivers.prisma.repository.js";

const deliveriesRepository = new DeliveriesPrismaRepository();
const driversRepository = new DriversPrismaRepository();

const service = new DeliveriesService(deliveriesRepository, driversRepository);
const controller = new DeliveriesViewsController(service);

const router = Router();

router.post("/", validateCreateDeliveries, controller.create);

router.get("/", validateListDeliveries, controller.list);

// router.get("/nova", controller.form);

router.get("/:id", controller.read);

router.patch("/:id/avancar", controller.advance);

router.patch("/:id/cancelar", controller.cancel);

router.get("/:id/historico", controller.listHistory);

router.patch("/:id/atribuir", validateAssignDrivers, controller.assign);

export default router;
