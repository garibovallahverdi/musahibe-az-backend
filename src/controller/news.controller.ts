import { NextFunction, Request, Response } from "express";
import { NewsService } from "../services/news.service"; 
import { CreateNewsDto } from "../dto/news.dto";  

export class NewsController {
  private newsService = new NewsService();

 async addNews(req: Request, res: Response,next:NextFunction) {
    const { title,description, content, author, publishedAt,imageUrl,category,tags } = req.body;
   try {
    const dto = new CreateNewsDto({ title, description, imageUrl,category,tags, content, author, publishedAt });
    const createdNews = await this.newsService.addNews(dto);
    res.status(201).json({
      message: "News added successfully",
      news: createdNews,
    });
   } catch (error) {
    next(error)
   }
  }

 async searchNews(req: Request, res: Response,next:NextFunction) {
  const search =req.query.search as string
  const page  = Number(req.query.page) 
  const pageSize = 2
  
    try {
      const newsList =  await  this.newsService.searchNews(search,page,pageSize);
      res.status(200).json({...newsList});
    } catch (error) {
      next(error)
    }
  }

  async getNewsByCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 2;
  
    try {
      const result = await this.newsService.getNewsByCategory(category, page, pageSize);
      res.status(200).json({
        message: "News fetched successfully",
        ...result,
      });
    } catch (error) {
      next(error); 
    }
  }
 async  getNewsById(req:Request,res:Response,next:NextFunction) {
    const id = req.params.id;
    
    try {
      const news =await  this.newsService.getNewsById(id);
      res.status(200).json({
        news
      })
    } catch (error) {
      next(error)
    }
   
  }
 

  async reactToNews(req: Request<{ newsId: string }>, res: Response, next: NextFunction):Promise<any>  {
    const { action , userId} = req.body; 
    const {newsId} = req.params
  
    try {
     
      if (!["like", "dislike"].includes(action)) {
        return res.status(400).json({ message: "Invalid action. Must be 'like' or 'dislike'" });
      }
  
      await this.newsService.reactToNews(newsId, userId, action);
  
      res.status(200).json({ message: `News ${action}d successfully` });
    } catch (error) {
      next(error);
    }
  }  
  
  async  mainPageRecomendedNews(req:Request,res:Response,next:NextFunction) {
    const {category} = req.params;
    try {
      const news =await  this.newsService.mainPageRecomendedNews(category);
      res.status(200).json({
        news
      })
    } catch (error) {
      next(error)
    }

  }


  
}
