import { Router } from "express";
import productController from "../controllers/productController.js";
import { checkMiddleware } from "../checkMiddleware.js";

const router = new Router();

// add product
router.post('/product', productController.create)

// change product
router.put('/product/:id',  productController.change)

// delete product by id
router.delete('/product/:id', checkMiddleware, productController.delete)

// get all products
router.get('/products', productController.getAll)

export const productRouter = router;