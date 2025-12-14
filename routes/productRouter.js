import { Router } from "express";
import productController from "../controllers/productController.js";
import { checkMiddleware } from "../checkMiddleware.js";
import { checkRoleMiddleware } from "../checkRoleMiddleware.js";

const router = new Router();

// add product
router.post('/product', checkRoleMiddleware('ADMIN'), productController.create)

// change product
router.put('/product/:id', checkRoleMiddleware('ADMIN'), productController.change)

// delete product by id
router.delete('/product/:id', checkRoleMiddleware('ADMIN'), productController.delete)

// get all products
router.get('/products', productController.getAll)

export const productRouter = router;