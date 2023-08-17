import { Exclude, Expose, Type } from 'class-transformer';

import { UserDto } from '../../../modules/users/dto';

@Exclude()
export class CommentDto {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  likes: number;

  @Expose()
  subcommentsCount: number;

  @Expose()
  userId: string;

  @Expose()
  postId: string;

  @Expose()
  parentCommentId?: string;

  @Expose()
  mentionUserId?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date | null;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => UserDto)
  mentionUser?: UserDto;

  @Expose()
  isLiked: boolean;

  @Expose()
  isDeleted: boolean;

  @Expose()
  @Type(() => CommentDto)
  subcomments: CommentDto[];
}
