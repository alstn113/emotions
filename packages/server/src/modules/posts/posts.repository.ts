import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts(cursor: string | null, userId: string | null) {
    const [totalCount, list] = await Promise.all([
      this.prisma.post.count(),
      this.prisma.post.findMany({
        take: 12,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        ...postSelector(userId),
      }),
    ]);

    const endCursor = list[list.length - 1]?.id ?? null; // last item in the list
    // prisma.post.count cause error when using orderBy createdAt
    const hasNextPage =
      (
        await this.prisma.post.findMany({
          skip: endCursor ? 1 : 0,
          cursor: endCursor ? { id: endCursor } : undefined,
          orderBy: { createdAt: 'desc' },
        })
      ).length > 0;

    return { totalCount, endCursor, hasNextPage, list };
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
        thumbnail: dto.thumbnail,
        // connectOrCreate: if tag exists, connect to it, otherwise create it
        tags: {
          create: dto.tags?.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
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

  async updatePostCommentsCount(postId: string, commentsCount: number) {
    return await this.prisma.postStats.update({
      where: { postId },
      data: {
        commentsCount,
      },
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
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
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
