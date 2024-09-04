import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards, ParseUUIDPipe, HttpStatus, HttpCode, Ip, Logger } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/logger/logger.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  private readonly loggerService = new LoggerService(PostController.name);

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    this.loggerService.log("Post Created", PostController.name);
    return await this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  async findAllByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.postService.findAllByUserId(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updatePostDto: UpdatePostDto) {
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.postService.remove(id);
  }
}
