import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from 'src/comment/dto/create-comment-reply-dto';
import { UpdateReplyDto } from 'src/comment/dto/update-comment-reply-dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReplyService {

    constructor(private readonly service: DatabaseService) { };

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

    async findAllReplies() {
        return this.service.commentReplies.findMany(
            {
                include: {
                    Comment: true,
                    User: true
                }
            }
        )
    }

    async findOneReply(id: string) {
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


    async deleteReply(id: string) {
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

    async updateReply(id: string, updateReplyDto: UpdateReplyDto) {
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


}
