import { Controller } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
}
