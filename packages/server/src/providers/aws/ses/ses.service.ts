import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SESService {
  constructor(private readonly configService: ConfigService) {}
}
