import { NextFunction,Request,Response } from "express";
import { TagsService } from "../services/tags.service";
 

export class TagsController {

    private tagsService = new TagsService()
    
    async getTags(req: Request, res: Response , next:NextFunction) {
        try {
            const tags = await this.tagsService.getTags()
            res.status(200).json({
                tags,
              });
              } catch (error) {
                next(error)
                }

    }

}