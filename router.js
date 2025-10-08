import { Router } from "express";
import categoryController from "./controllers/categoryController.js";
import productController from "./controllers/productController.js";
import goodsController from "./controllers/goodsController.js";

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
router.post('/category/add/:cat', productController.create)

// change product
router.put('/product', productController.change)

// delete product by id
router.delete('/product/:id', productController.delete)

// get all products
router.get('/products', productController.getAll)

// add goods
router.post('/catalog/add', goodsController.create)

//	get all goods
router.get('/catalog', goodsController.getAll)

// filter goods by category
router.get('/catalog/f/:pr', goodsController.getByCategory)

// get one of goods
router.get('/catalog/:id', goodsController.getOne)

// change one of goods
router.put('/catalog', goodsController.change)

// delete one of goods by id
router.delete('/catalog/:id', goodsController.delete)

export { router }