import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreatePostDto } from './dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPostById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) throw new HttpException('Post not found', 404);

    return post;
  }

  async findPosts() {
    return this.prisma.post.findMany({});
  }

  async createPost(dto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        ...dto,
      },
    });
  }

  async deletePostById(id: string) {
    return await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
