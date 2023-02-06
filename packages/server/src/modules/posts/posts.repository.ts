import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '~/prisma/prisma.service';
import { S3Service } from '~/providers/aws/s3/s3.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

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

  async createPost(
    dto: CreatePostDto,
    userId: string,
    file?: Express.Multer.File,
  ) {
    const thumbnail = file ? await this.createImage(file) : null;
    return await this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body,
        // thumbnail url: if file exists, create image, otherwise null
        thumbnail,
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

  async createImage(file: Express.Multer.File) {
    const filename = `${Date.now()}-${file.originalname}`;
    const bucket = this.configService.get<string>('AWS_S3_BUCKET');
    await this.s3Service.pubObject(file, filename);
    return `https://${bucket}.s3.amazonaws.com/${filename}`;
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

  async deleteImage(thumbnail: string) {
    const bucket = this.configService.get<string>('AWS_S3_BUCKET');
    const filename = thumbnail.replace(
      `https://${bucket}.s3.amazonaws.com/`,
      '',
    );
    await this.s3Service.deleteObject(filename);
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
