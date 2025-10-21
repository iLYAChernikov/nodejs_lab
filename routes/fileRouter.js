import { Router } from "express";
import fileController from "../controllers/fileController.js";

const router = new Router();

// upload file
router.post('/file', fileController.create)

export const fileRouter = router;