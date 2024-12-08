export class CreateNewsDto {
    title: string;
    author: string;
    description:string;
    content: string;
    category: string;
    tags: string[];
    imageUrl:string;
    publishedAt: Date; 
  
    constructor(data: Partial<CreateNewsDto>) {
      
      this.title = data.title!;
      this.author = data.author || "Anonium";
      this.description = data.description!;
      this.content = data.content!;
      this.imageUrl = data.imageUrl || "";
      this.category = data.category!;
      this.tags = data.tags || [];
      this.publishedAt = data.publishedAt!;
    }
  }

  
  export class GetNewsDto {
    id!: string;
    title!: string;
    description:string;
    content!: string;
    imageUrl!:string | null;
    author!:string;
    like!: string[];
    dislike!: string[];
    category!: string;
    tags!: string[];
    views!: number;
    publishedAt!: Date | null;

    constructor(data: Partial<GetNewsDto>) {
      this.id = data.id!;
      this.title = data.title!;
      this.description = data.description!;
      this.content = data.content!;
      this.imageUrl = data.imageUrl || null ;
      this.author = data.author!;
      this.like = data.like || [];
      this.dislike = data.dislike || [];
      this.category = data.category!;
      this.tags = data.tags || [];
      this.views = data.views || 0;
      this.publishedAt = data.publishedAt || null;
    }

  }
  
