import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findComments(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        user: true,
      },
    });
  }

  async createComment(dto: CreateCommentDto, userId: string) {
    return this.prisma.comment.create({
      data: {
        text: dto.text,
        postId: dto.postId,
        userId,
        parentCommentId: dto.parentCommentId,
      },
    });
  }

  async deleteComment(id: string) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
