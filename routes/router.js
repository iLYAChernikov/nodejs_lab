import { Router } from "express";
import { categoryRouter } from "./categoryRouter.js";
import { productRouter } from "./productRouter.js";
import { catalogRouter } from "./catalogRouter.js";

const router = new Router();

router.use(categoryRouter);
router.use(productRouter);
router.use(catalogRouter);

export { router }