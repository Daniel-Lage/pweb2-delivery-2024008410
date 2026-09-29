import type { Delivery } from "../models/delivery.model.js";

import { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveriesController } from "../controllers/deliveries.controller.js";
import { Router } from "express";
import { Database } from "../database/database.js";

const database = new Database();
const deliveriesRepository = new DeliveriesRepository(database);
const deliveriesService = new DeliveriesService(deliveriesRepository);
const deliveriesController = new DeliveriesController(deliveriesService);

const router = Router();

router.post("/", deliveriesController.create);

router.get("/", deliveriesController.list);

router.get("/:id", deliveriesController.read);

router.patch("/:id/avancar", deliveriesController.advance);

router.patch("/:id/cancelar", deliveriesController.cancel);

router.get("/:id/historico", deliveriesController.listHistory);

export default router;
