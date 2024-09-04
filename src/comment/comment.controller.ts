import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus, Ip } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/logger/logger.service';


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  private readonly loggerService = new LoggerService(CommentController.name);

  @Post()
  @UseGuards(AuthGuard)
  create(@Ip() ip: string, @Body() createCommentDto: CreateCommentDto) {
    this.loggerService.log(`Request Create Comment | IP: ${ip}`, CommentController.name);
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.commentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string, @Body() updateCommentDto: UpdateCommentDto) {
    this.loggerService.log(`Request Update Comment | IP: ${ip}`, CommentController.name);
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string) {
    this.loggerService.log(`Request Remove Comment | IP: ${ip}`, CommentController.name);
    return this.commentService.remove(id);
  }
}
