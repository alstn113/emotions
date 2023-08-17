import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SESService } from './ses.service';

@ApiTags('ses')
@Controller()
export class SESController {
  constructor(private readonly sesService: SESService) {}

  @Post()
  emailTest() {
    const body = this.sesService.createCommentEmail({
      profileImage: 'https://avatars.githubusercontent.com/u/16899513?v=4',
      commentText: 'This is a test comment',
      commentUsername: 'neko113-test',
      postTitle: 'This is a test post',
      postAuthor: 'neko113',
      postSlug: 'test-post',
    });
    return this.sesService.sendEmail({
      from: `no-reply@wap-dev.store`,
      to: `alstn113@gmail.com`,
      subject: 'Test email',
      body,
    });
  }
}
