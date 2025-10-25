import { Router } from "express";
import userController from "../controllers/userController.js";

const router = new Router();

// create user
router.post('/registration', userController.create)

// login user
router.post('/login', userController.login)

// change profile
router.put('/user/:id', userController.changeProfile)

// delete profile by id
router.delete('/user/:id', userController.deleteById)

// get one profile
router.get('/user/:id', userController.getOneProfileById)

// get all profile
router.get('/users', userController.getAllProfiles)

export const userRouter = router;