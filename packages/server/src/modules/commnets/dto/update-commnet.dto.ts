import { PartialType } from '@nestjs/swagger';
import { CreateCommnetDto } from './create-commnet.dto';

export class UpdateCommnetDto extends PartialType(CreateCommnetDto) {}
