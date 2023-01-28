import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts() {
    return this.prisma.post.findMany({
      include: postSelector,
    });
  }

  async findPostById(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: postSelector,
    });
  }

  async createPost(dto: CreatePostDto, authorId: string) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body,
        authorId,
      },
      include: postSelector,
    });
  }

  async deletePost(id: string) {
    return this.prisma.post.delete({
      where: { id },
      include: postSelector,
    });
  }
}

const postSelector = {
  author: {
    select: {
      id: true,
      username: true,
      displayName: true,
    },
  },
};
