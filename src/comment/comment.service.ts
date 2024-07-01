import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly service: DatabaseService) { };

  async create(createCommentDto: Prisma.CommentCreateInput) {
    return this.service.comment.create(
      {
        data: createCommentDto
      });
  }

  async findAll() {
    return this.service.comment.findMany();
  }

  async findOne(id: number) {
    return this.service.comment.findUnique({ where: { id } });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.service.comment.update({
      where: {
        id
      },
      data: updateCommentDto
    });
  }

  async remove(id: number) {
    return this.service.comment.delete({ where: { id } });
  }
}
