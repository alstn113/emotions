import { Expose, Type } from 'class-transformer';
import { CommentDto } from './comment.dto';

export class CommentListResponseDto {
  @Expose()
  @Type(() => CommentDto)
  list: CommentDto[];

  @Expose()
  totalCount: number;
}
