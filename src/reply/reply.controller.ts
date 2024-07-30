import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ReplyService } from './reply.service';
import { UpdateReplyDto } from 'src/comment/dto/update-comment-reply-dto';
import { CreateReplyDto } from 'src/comment/dto/create-comment-reply-dto';

@Controller('reply')
export class ReplyController {
    constructor(private readonly service: ReplyService) { }

    @Post()
    @UseGuards(AuthGuard)
    createReply(@Body() createReplyDto: CreateReplyDto) {
        return this.service.createReply(createReplyDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    findAllReplies() {
        return this.service.findAllReplies();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOneReply(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOneReply(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    updateReply(@Param('id', ParseIntPipe) id: number, @Body() updateReplyDto: UpdateReplyDto) {
        return this.service.updateReply(id, updateReplyDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    removeReply(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteReply(id);
    }
}
