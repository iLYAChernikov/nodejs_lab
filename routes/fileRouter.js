import { Router } from "express";
import { upfileController } from "../controllers/fileController.js";

const router = new Router();

// upload file
router.post('/file', upfileController.create);

export const fileRouter = router;