import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import productController from "../controllers/productController.js";
import { checkMiddleware } from "../checkMiddleware.js";

const router = new Router();

// add category
router.post('/category/add', checkMiddleware, categoryController.create)

// change category
router.put('/category', checkMiddleware, categoryController.change)

// delete category by id
router.delete('/category/:id', checkMiddleware, categoryController.delete)

// get all categories
router.get('/categories', categoryController.getAll)

// add product to category
router.post('/category/add/:cat', productController.createIntoCategory)

export const categoryRouter = router;