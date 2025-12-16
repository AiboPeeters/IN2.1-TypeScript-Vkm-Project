import { Router } from "express";
import * as VKMController from '../../presentation/VKM.Controller';

const router = Router();

// READ
router.get("/", VKMController.getAllVKMs);
router.get("/:id", VKMController.getVKMById);

// CREATE
router.post("/", VKMController.createVKM);

// UPDATE
router.put("/:id", VKMController.updateVKM);

// DELETE
router.delete("/:id", VKMController.deleteVKM);

export default router;
