import { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveriesController } from "../controllers/deliveries.controller.js";
import { Router } from "express";

const repository = new DeliveriesRepository();
const service = new DeliveriesService(repository);
const controller = new DeliveriesController(service);

const router = Router();

router.post("/", controller.create);

router.get("/", controller.list);

router.get("/:id", controller.read);

router.patch("/:id/avancar", controller.advance);

router.patch("/:id/cancelar", controller.cancel);

router.get("/:id/historico", controller.listHistory);

export default router;
