import { Router } from "express";
import { NewsController } from "../controller/news.controller"; 
import {  ensureEditor } from "../middleware/authMiddleware";

const router = Router();
const newsController = new NewsController();

router.post("/news",ensureEditor , (req, res,next) => newsController.addNews(req, res,next));
router.get("/news", (req, res,next) => newsController.searchNews(req, res,next));
router.get("/news/:category", (req, res,next) => newsController.getNewsByCategory(req, res,next));
router.get("/newsbyid/:id", (req, res,next) => newsController.getNewsById(req, res,next));
router.post("/reactiontonews/:newsId",  (req, res, next) =>  newsController.reactToNews(req, res, next));
router.get("/mainpagecategory/:category",  (req, res, next) =>  newsController.mainPageRecomendedNews(req, res, next));


export {router} ;