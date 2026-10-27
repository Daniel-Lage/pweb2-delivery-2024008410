// import { DriversRepository } from "../repositories/drivers.repository.js";
import { DriversService } from "../services/drivers.service.js";
import { DriversViewsController } from "../controllers/drivers.views.controller.js";
import { Router } from "express";
// import { Database } from "../database/database.js";
import { validateCreateDrivers } from "../middlewares/validate.create.drivers.middleware.js";
// import { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { DeliveriesPrismaRepository } from "../repositories/deliveries.prisma.repository.js";
import { DriversPrismaRepository } from "../repositories/drivers.prisma.repository.js";

// const database = new Database();
// const driversRepository = new DriversRepository(database);
// const deliveriesRepository = new DeliveriesRepository(database);

const deliveriesRepository = new DeliveriesPrismaRepository();
const driversRepository = new DriversPrismaRepository();

const service = new DriversService(driversRepository, deliveriesRepository);
const controller = new DriversViewsController(service);

const router = Router();

router.post("/", validateCreateDrivers, controller.create);

router.get("/", controller.list);

router.get("/novo", controller.form);

router.get("/:id", controller.read);

export default router;
