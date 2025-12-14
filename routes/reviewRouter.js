import { Router } from "express";
import reviewController from "../controllers/reviewController.js";
import { checkMiddleware } from "../checkMiddleware.js";
import { checkRoleMiddleware } from "../checkRoleMiddleware.js";

const router = new Router();

// add post
router.post('/review/add', checkMiddleware, reviewController.create)

// change post
router.put('/review', checkRoleMiddleware('MODERATOR'), reviewController.change)

// delete post
router.delete('/review', checkRoleMiddleware('ADMIN'), reviewController.delete)

// get all posts
router.get('/reviews', reviewController.getAll)

// get user posts
router.get('/reviews/user', reviewController.getAllByUser)

// get product posts
router.get('/reviews/product', reviewController.getAllByProduct)

export const reviewRouter = router;