import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { CreateReplyDto } from 'src/comment/dto/create-comment-reply-dto';
import { UpdateReplyDto } from 'src/comment/dto/update-comment-reply-dto';
import { DatabaseService } from 'src/database/database.service';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReplyService {

    constructor(
        private readonly service: DatabaseService,
        private readonly userService: UserService,
        private readonly commentService: CommentService
    ) { };

    private readonly logger = new LoggerService(ReplyService.name);


    async createReply(createReplyDto: CreateReplyDto) {

        await this.CheckCommentAndUserExist(createReplyDto.userId, createReplyDto.commentId);

        const reply = await this.service.commentReplies.create(
            {
                data: createReplyDto
            }
        );

        this.logger.log(`Reply created succesfully ID: ${reply.id}`);

        return { id: reply.id };
    }

    async findAllReplies() {
        return await this.service.commentReplies.findMany()
    }

    async findOneReply(id: string) {

        await this.CheckIsReplyExist(id);

        return await this.service.commentReplies.findUnique(
            {
                where: {
                    id
                }
            }
        )
    }


    async deleteReply(id: string) {

        await this.CheckIsReplyExist(id);

        const deletedReply = await this.service.commentReplies.delete(
            {
                where: {
                    id
                }
            }
        )
        this.logger.log(`Reply deleted succesfully ID: ${deletedReply.id}`);
        return deletedReply;
    }

    async updateReply(id: string, updateReplyDto: UpdateReplyDto) {

        await this.CheckCommentAndUserExist(updateReplyDto.userId, updateReplyDto.commentId);

        await this.CheckIsReplyExist(id);

        const updatedReply = await this.service.commentReplies.update({
            where: {
                id
            },
            data: updateReplyDto
        });

        this.logger.log(`Reply deleted succesfully ID: ${updatedReply.id}`);
        return updatedReply;
    }

    async CheckCommentAndUserExist(userId: string, commentId: string) {

        if (!await this.commentService.IsCommentExist(commentId) && !await this.userService.IsUserExist(userId))
            throw new NotFoundException(`Comment Not Found ${commentId} | User Not Found ${userId}`);
        else if (!await this.commentService.IsCommentExist(commentId))
            throw new NotFoundException(`Comment Not Found ${commentId} `);
        else if (!await this.userService.IsUserExist(userId))
            throw new NotFoundException(`User Not Found ${userId}`);
    }

    async CheckIsReplyExist(id: string) {
        const reply = await this.service.commentReplies.findUnique({
            where: {
                id
            }
        })

        if (!reply)
            throw new NotFoundException(`Reply Not Found ${id}`);
    }

}
