import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateReplyDto } from './dto/create-comment-reply-dto';
import { UpdateReplyDto } from './dto/update-comment-reply-dto';

@Injectable()
export class CommentService {
  constructor(private readonly service: DatabaseService) { };

  //#region Comments

  async create(createCommentDto: CreateCommentDto) {
    return this.service.comment.create(
      {
        data: createCommentDto,
        include: {
          Post: true,
          User: true
        }
      }
    );
  }


  async findAll() {
    return this.service.comment.findMany({
      include: {
        Post: true,
        User: true
      }
    });
  }

  async findOne(id: string) {
    return this.service.comment.findUnique({
      where: { id }, include: {
        User: true,
        Post: true,
      }
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.service.comment.update({
      where: {
        id
      },
      data: updateCommentDto,
      include: {
        User: true,
        Post: true
      }
    });
  }

  async remove(id: string) {
    return this.service.comment.delete({
      where: { id }, include: {
        User: true,
        Post: true
      }
    });
  }

  //#endregion

}
