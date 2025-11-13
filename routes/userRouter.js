import { Router } from "express";
import userController from "../controllers/userController.js";
import { checkMiddleware } from "../checkMiddleware.js";

const router = new Router();

// create user
router.post('/registration', checkMiddleware, userController.create)

// login user
router.post('/login', userController.login)

// change profile
router.put('/user/:id', checkMiddleware, userController.changeProfile)

// delete profile by id
router.delete('/user/:id', checkMiddleware, userController.deleteById)

// get one profile
router.get('/user/:id', userController.getOneProfileById)

// get all profiles
router.get('/users', checkMiddleware, userController.getAllProfiles)

export const userRouter = router;