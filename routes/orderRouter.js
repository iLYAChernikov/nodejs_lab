import { Router } from "express";
import orderController from "../controllers/orderController.js";
import productController from "../controllers/productController.js";
import { checkMiddleware } from "../checkMiddleware.js";

const router = new Router();

// add order
router.post('/catalog/add', checkMiddleware, orderController.create)

// add order
router.post('/catalog/add/:userId', checkMiddleware, orderController.createByUser)

// add order item
router.post('/order/add/:id', checkMiddleware, orderController.addItem)

// add order item
router.delete('/order/delete/:id', checkMiddleware, orderController.deleteItem)

//	get all products
router.get('/catalog', orderController.getAll)

// filter products by category
router.get('/catalog/f/:categ', orderController.getByCategory)

// get user orders
router.get('/catalog/:id', orderController.getOrdersByUser)

// get order items
router.get('/order/:id', orderController.getOrderItems)

// buy the order
router.put('/catalog/buy/:id', checkMiddleware, orderController.buyOrder)

// delete order by id
router.delete('/catalog/:id', checkMiddleware, orderController.delete)

export const orderRouter = router;