import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
}
