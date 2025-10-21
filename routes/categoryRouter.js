import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import productController from "../controllers/productController.js";

const router = new Router();

// add category
router.post('/category/add', categoryController.create)

// change category
router.put('/category', categoryController.change)

// delete category by id
router.delete('/category/:id', categoryController.delete)

// get all categories
router.get('/categories', categoryController.getAll)

// add product to category
router.post('/category/add/:cat', productController.createIntoCategory)

export const categoryRouter = router;