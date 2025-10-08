import { Router } from "express";

const router = new Router();

// add category
router.post('/category/add')

// change category
router.put('/category')

// delete category by id
router.delete('/category/:id')

// add product to category
router.post('/category/add/:cat')

// add category
router.post('/category/add')

// add product to category
router.post('/category/add/:cat')

// change product
router.put('/product')

// delete product by id
router.delete('/product/:id')

// add goods
router.post('/catalog/add')

//	get goods
router.get('/catalog')

// filter goods by category
router.get('/catalog/f/:cat')

// get one of goods
router.get('/catalog/:id')

// change one of goods
router.put('/catalog')

// delete one of goods by id
router.delete('/catalog/:id')

// add category
router.post('/category/add')

// add product to category
router.post('/category/add/:cat')

// change category
router.put('/category')

// delete category by id
router.delete('/category/:id')

export { router }