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

  async findCommentById(id: string) {
    return await this.prisma.comment.findUnique({
      where: { id },
      ...commentSelector,
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

  async deleteComment(id: string) {
    return await this.prisma.comment.update({
      where: { id },
      ...commentSelector,
      data: {
        deletedAt: new Date(),
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
