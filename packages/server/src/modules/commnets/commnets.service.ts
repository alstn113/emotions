import { Injectable } from '@nestjs/common';
import { CreateCommnetDto } from './dto/create-commnet.dto';
import { UpdateCommnetDto } from './dto/update-commnet.dto';

@Injectable()
export class CommnetsService {
  create(createCommnetDto: CreateCommnetDto) {
    return 'This action adds a new commnet';
  }

  findAll() {
    return `This action returns all commnets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commnet`;
  }

  update(id: number, updateCommnetDto: UpdateCommnetDto) {
    return `This action updates a #${id} commnet`;
  }

  remove(id: number) {
    return `This action removes a #${id} commnet`;
  }
}
