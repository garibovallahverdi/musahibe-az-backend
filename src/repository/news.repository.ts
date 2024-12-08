import prisma from "../config/db";
import { CreateNewsDto } from "../dto/news.dto"; 

export class NewsRepository {

  async createNews(data: CreateNewsDto) {
    const connectOrCreateTags = data.tags.map((tag) => ({
      where: { name: tag },
      create: { name: tag },
    }));
    return await prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        author:data.author,
        category:data.category,
        description:data.description,
        imageUrl: data.imageUrl,
        publishedAt: data.publishedAt,
        tags:{
            connectOrCreate:connectOrCreateTags
        }
      },
    });
  }
 
 
  async findNewsById(id: string) {
    return await prisma.news.findUnique({ where: { id } });
  }

  async updateViews(id: string) {
    return await prisma.news.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
  

  async findNewsByCategory(category: string, skip: number, take: number) {
    return await prisma.news.findMany({
      where: { category },
      skip,
      take,
    });
  }
  
  async countNewsByCategory(category: string) {
    return await prisma.news.count({
      where: { category },
    });
  }

  async findAllNews() {
    return await prisma.news.findMany({
      include:{
        tags:{
          select:{
            name:true
          }
        }
        
      }
    });
  }




  async  addToLike(newsId: string, userId: string): Promise<void> {
    // Mevcut veriyi al ve userId'yi ekle
    const news = await prisma.news.findUnique({
      where: { id: newsId },
    });
  
    if (news) {
      const updatedLikes = [...news.like, userId];
  
      await prisma.news.update({
        where: { id: newsId },
        data: {
          like: updatedLikes,
        },
      });
    }
  }
  
  async  removeFromLike(newsId: string, userId: string): Promise<void> {
    const news = await prisma.news.findUnique({
      where: { id: newsId },
    });
  
    if (news) {
      const updatedLikes = news?.like.filter((id) => id !== userId);
  
      await prisma.news.update({
        where: { id: newsId },
        data: {
          like: updatedLikes,
        },
      });
    }
  }
  
  async  addToDislike(newsId: string, userId: string): Promise<void> {
    const news = await prisma.news.findUnique({
      where: { id: newsId },
    });
  
    if (news) {
      const updatedDislikes = [...news.dislike, userId];
  
      await prisma.news.update({
        where: { id: newsId },
        data: {
          dislike: updatedDislikes,
        },
      });
    }
  }
  
  async  removeFromDislike(newsId: string, userId: string): Promise<void> {
    const news = await prisma.news.findUnique({
      where: { id: newsId },
    });
  
    if (news) {
      const updatedDislikes = news.dislike.filter((id) => id !== userId);
  
      await prisma.news.update({
        where: { id: newsId },
        data: {
          dislike: updatedDislikes,
        },
      });
    }
  }
  
  async mainPageRecomendedNews(category: string) {
    return await prisma.news.findMany({
      where: { 
        category,
       },
       take:6
    });
  }
  
}

