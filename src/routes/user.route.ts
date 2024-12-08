import { ensureAdmin } from "../middleware/authMiddleware";
import { UserController } from "../controller/user.controller";
import { Router } from "express";

const router = Router()

const userController = new UserController()
router.post("/register", (req, res,next) => userController.register(req,res,next));
router.post("/login", (req, res, next) => userController.login(req, res, next));
router.post("/give-permission", ensureAdmin, (req, res, next) => userController.givePermission(req, res, next));



export {router} ;
 