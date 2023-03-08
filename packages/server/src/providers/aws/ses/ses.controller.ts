import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SESService } from './ses.service';

@ApiTags('ses')
@Controller('ses')
export class SesController {
  constructor(private readonly sesService: SESService) {}

  @Post()
  async test() {
    try {
      await this.sesService.sendEmail({
        to: `alstn113@gmail.com`,
        subject: 'Test Subject',
        body: `Test Body`,
        from: `no-reply@wap-dev.store`,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
