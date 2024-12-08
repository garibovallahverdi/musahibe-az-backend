import { TagsRepository } from "../repository/tags.repository";


export class TagsService {

    private tagsRepository : TagsRepository

    constructor(){
        this.tagsRepository = new TagsRepository()
    }

    async getTags(): Promise<any> {
        return this.tagsRepository.getTags()
         
    }
}