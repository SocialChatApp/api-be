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

  async findOne(id: number) {
    return this.service.comment.findUnique({
      where: { id }, include: {
        User: true,
        Post: true,
      }
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
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

  async remove(id: number) {
    return this.service.comment.delete({
      where: { id }, include: {
        User: true,
        Post: true
      }
    });
  }

  //#endregion

  //#region Reply
  async createReply(createReplyDto: CreateReplyDto) {
    return this.service.commentReplies.create(
      {
        data: createReplyDto,
        include: {
          User: true,
          Comment: true,
        }
      }
    );
  }

  async findAllReplies(id: number) {
    return this.service.commentReplies.findMany(
      {
        where: {
          id
        },
        include: {
          Comment: true,
          User: true
        }
      }
    )
  }

  async findOneReply(id: number) {
    return this.service.commentReplies.findUnique(
      {
        where: {
          id
        },
        include: {
          Comment: true,
          User: true
        }
      }
    )
  }


  async deleteReply(id: number) {
    return this.service.commentReplies.delete(
      {
        where: {
          id
        },
        include: {
          Comment: true,
          User: true
        }
      }
    )
  }

  async updateReply(id: number, updateReplyDto: UpdateReplyDto) {
    return this.service.commentReplies.update({
      where: {
        id
      },
      data: updateReplyDto,
      include: {
        Comment: true,
        User: true
      }
    });
  }

  //#endregion

}
