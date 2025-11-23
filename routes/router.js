import { Router } from "express";
import { categoryRouter } from "./categoryRouter.js";
import { productRouter } from "./productRouter.js";
import { orderRouter } from "./orderRouter.js";
import { fileRouter } from "./fileRouter.js";
import { userRouter } from "./userRouter.js";

const router = new Router();

router.use(categoryRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(fileRouter);
router.use(userRouter);

export { router }