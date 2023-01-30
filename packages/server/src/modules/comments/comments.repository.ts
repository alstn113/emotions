import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findComments(postId: string) {
    return await this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      ...commentSelector,
    });
  }

  async findCommentLike(commentId: string, userId: string) {
    return await this.prisma.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    });
  }

  async findCommentById(id: string) {
    return await this.prisma.comment.findUnique({
      where: { id },
      ...commentSelector,
    });
  }

  async countCommentLikes(commentId: string) {
    return await this.prisma.commentLike.count({
      where: { commentId },
    });
  }

  async createComment(dto: CreateCommentDto, userId: string) {
    return await this.prisma.comment.create({
      data: {
        text: dto.text,
        postId: dto.postId,
        userId,
        parentCommentId: dto.parentCommentId,
      },
      ...commentSelector,
    });
  }

  async createCommentLike(commentId: string, userId: string) {
    return await this.prisma.commentLike.create({
      data: {
        commentId,
        userId,
      },
    });
  }

  async deleteCommentLike(commentId: string, userId: string) {
    return await this.prisma.commentLike.delete({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    });
  }

  async deleteComment(id: string) {
    return await this.prisma.comment.update({
      where: { id },
      ...commentSelector,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateCommentLikes(id: string, likes: number) {
    return await this.prisma.comment.update({
      where: { id },
      data: {
        likes,
      },
    });
  }
}

const commentSelector = {
  include: {
    user: {
      select: {
        id: true,
        username: true,
        displayName: true,
      },
    },
  },
};
