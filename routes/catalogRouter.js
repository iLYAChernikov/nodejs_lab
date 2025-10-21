import { Router } from "express";
import goodsController from "../controllers/goodsController.js";

const router = new Router();

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

export const catalogRouter = router;