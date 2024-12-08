import prisma from "config/db";
import { CreateNewsDto, GetNewsDto } from "../dto/news.dto"
import { NewsRepository } from "../repository/news.repository"; 
import Fuse from "fuse.js";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  like:number;
  dislike:number;
  views:number;
  publishedAt:Date;  
}
export class NewsService {
  private newsRepository: NewsRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
  }

  async addNews(dto: CreateNewsDto) {
    try {
      const newNews = await this.newsRepository.createNews(dto);
      return new GetNewsDto({ ...newNews });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error while adding news: " + error.message);
      }
      throw new Error("An unknown error occurred while adding news");
    }
  }

  private normalizeText(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); // Diakritikleri kaldır ve küçük harfe çevir
  }
  
  async searchNews(search: string, page: number, pageSize: number) {
    try {
      const allNews = await this.newsRepository.findAllNews();
  
      // Normalize edilmiş veriyi orijinal veriyle birlikte sakla
      const normalizedNews = allNews.map((news: any) => ({
        original: news, // Orijinal veriyi sakla
        normalized: {
          ...news,
          title: this.normalizeText(news.title),
          description: this.normalizeText(news.description),
          tags: Array.isArray(news.tags)
            ? news.tags.map((tag: { name: string }) => this.normalizeText(tag.name))
            : [],
        },
      }));
  
      const options = {
        keys: ["normalized.title", "normalized.description", "normalized.tags"],
        threshold: 0.4,
        useExtendedSearch: true,
      };
  
      const fuse = new Fuse(normalizedNews, options);
  
      // Arama sorgusunu normalize et
      const normalizedSearch = this.normalizeText(search);
      const result = fuse.search(normalizedSearch);
  
      // Sayfalama işlemi
      const totalResults = result.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
  
      // Sayfa aralığındaki sonuçları al ve orijinal veriyi döndür
      const paginatedResults = result.slice(startIndex, endIndex).map((res) =>
        new GetNewsDto({ ...(res.item.original as GetNewsDto) })
      );
  
      return {
        totalResults,
        currentPage: page,
        totalPages: Math.ceil(totalResults / pageSize),
        pageSize,
        news: paginatedResults,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error while searching news: " + error.message);
      }
      throw new Error("An unknown error occurred while searching news");
    }
  }
  
  
  async getNewsByCategory(category: string, page: number, pageSize: number) {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize;
  
      const [news, totalCount] = await Promise.all([
        this.newsRepository.findNewsByCategory(category, skip, take),
        this.newsRepository.countNewsByCategory(category),
      ]);
  
      if (!news.length) {
        throw new Error(`No news found in category ${category}`);
      }
  
      return {
        news: news.map((item) => new GetNewsDto({ ...item })),
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error while fetching news by category: " + error.message);
      }
      throw new Error("An unknown error occurred while fetching news by category");
    }
  }
  
  async getNewsById(id: string) {
    try {
      const news = await this.newsRepository.findNewsById(id);

      if (!news) {
        throw new Error(`News with id ${id} not found!`);
      }
         await this.newsRepository.updateViews(id);

      return new GetNewsDto({ ...news });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error while fetching news by ID: " + error.message);
      }
      throw new Error("An unknown error occurred while fetching news by ID");
    }
  }


  async reactToNews(newsId: string, userId: string, action: string): Promise<void> {
    const news = await this.newsRepository.findNewsById(newsId);
  
    if (!news) {
      throw new Error("News not found");
    }
  
    if (action === "like") {
      // Kullanıcıyı dislike dizisinden çıkar
      if (news.dislike.includes(userId)) {
        await this.newsRepository.removeFromDislike(newsId, userId);
      }
      // Kullanıcıyı like dizisine ekle
      if (!news.like.includes(userId)) {
        await this.newsRepository.addToLike(newsId, userId);
      }
    } else if (action === "dislike") {
      // Kullanıcıyı like dizisinden çıkar
      if (news.like.includes(userId)) {
        await this.newsRepository.removeFromLike(newsId, userId);
      }
      // Kullanıcıyı dislike dizisine ekle
      if (!news.dislike.includes(userId)) {
        await this.newsRepository.addToDislike(newsId, userId);
      }
    }
  }

  async mainPageRecomendedNews(category:string){
    const news = await this.newsRepository.mainPageRecomendedNews(category)

    return news.map((item) => new GetNewsDto({ ...item }))

  }

  
    }