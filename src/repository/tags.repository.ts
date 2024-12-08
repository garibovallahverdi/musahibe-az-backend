import prisma from "../config/db";



export class TagsRepository {

    async getTags(): Promise<any | null> {

        return await prisma.tag.findMany()
    }
}