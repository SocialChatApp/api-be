import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateReplyDto } from './dto/create-comment-reply-dto';
import { UpdateReplyDto } from './dto/update-comment-reply-dto';


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  //#region Comment
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }
  //#endregion

  //#region Reply

  @Post('reply')
  @UseGuards(AuthGuard)
  createReply(@Body() createReplyDto: CreateReplyDto) {
    return this.commentService.createReply(createReplyDto);
  }

  @Get('reply')
  @UseGuards(AuthGuard)
  findAllReplies(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findAllReplies(id);
  }

  @Get('reply/:id')
  @UseGuards(AuthGuard)
  findOneReply(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOneReply(id);
  }

  @Patch('reply/:id')
  @UseGuards(AuthGuard)
  updateReply(@Param('id', ParseIntPipe) id: number, @Body() updateReplyDto: UpdateReplyDto) {
    return this.commentService.updateReply(id, updateReplyDto);
  }

  @Delete('reply/:id')
  @UseGuards(AuthGuard)
  removeReply(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteReply(id);
  }

  //#endregion

}
