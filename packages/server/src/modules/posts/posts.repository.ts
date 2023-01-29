import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts() {
    return await this.prisma.post.findMany({
      ...postSelector(),
    });
  }

  async findPostById(id: string, userId: string | null = null) {
    return await this.prisma.post.findUnique({
      where: { id },
      ...postSelector(userId),
    });
  }

  async findPostLike(postId: string, userId: string) {
    return await this.prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  }

  async createPost(dto: CreatePostDto, userId: string) {
    return await this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body,
        userId,
      },
      ...postSelector(),
    });
  }

  async createPostStats(postId: string) {
    return await this.prisma.postStats.create({
      data: {
        postId,
      },
      ...postStatsSelector,
    });
  }

  async createPostLike(postId: string, userId: string) {
    return await this.prisma.postLike.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async updatePostLikes(postId: string, likes: number) {
    return await this.prisma.postStats.update({
      where: { postId },
      data: {
        likes,
      },
    });
  }

  async deletePost(id: string) {
    return await this.prisma.post.delete({
      where: { id },
      ...postSelector(),
    });
  }

  async deletePostLike(postId: string, userId: string) {
    return await this.prisma.postLike.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  }

  async countPostLikes(postId: string) {
    return await this.prisma.postLike.count({
      where: { postId },
    });
  }
}

const postSelector = (userId: string | null = null) => {
  return {
    include: {
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
      postStats: postStatsSelector,
      postLikes: userId ? { where: { userId } } : false,
    },
  };
};

const postStatsSelector = {
  select: {
    id: true,
    likes: true,
    commentsCount: true,
  },
};
