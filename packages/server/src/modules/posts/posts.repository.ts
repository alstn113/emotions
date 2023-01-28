import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts() {
    return this.prisma.post.findMany({
      include: {
        author: true,
        comments: true,
      },
    });
  }

  async findPostById(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async createPost(dto: CreatePostDto, authorId: string) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body,
        authorId,
      },
    });
  }

  async deletePost(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
