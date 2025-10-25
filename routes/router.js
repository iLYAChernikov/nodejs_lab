import { Router } from "express";
import { categoryRouter } from "./categoryRouter.js";
import { productRouter } from "./productRouter.js";
import { catalogRouter } from "./catalogRouter.js";
import { fileRouter } from "./fileRouter.js";
import { userRouter } from "./userRouter.js";

const router = new Router();

router.use(categoryRouter);
router.use(productRouter);
router.use(catalogRouter);
router.use(fileRouter);
router.use(userRouter);

export { router }