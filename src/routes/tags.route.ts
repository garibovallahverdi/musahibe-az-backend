import { Router } from "express";
import {  ensureEditor } from "../middleware/authMiddleware";
import { TagsController } from "../controller/tags.controller";

const router = Router();
const tagsController = new TagsController();

router.get("/gettags", (req, res,next) => tagsController.getTags(req, res,next));

export {router} ;
   