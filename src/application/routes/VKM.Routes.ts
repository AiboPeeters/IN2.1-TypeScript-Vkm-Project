import { Router } from "express";
import * as VKMController from '../../presentation/VKM.Controller';

const router = Router();

router.get("/", VKMController.getAllVKMs);
router.get("/:id", VKMController.getVKMById);
router.post("/", VKMController.createVKM);
router.put("/:id", VKMController.updateVKM);
router.delete("/:id", VKMController.deleteVKM);

export default router;
