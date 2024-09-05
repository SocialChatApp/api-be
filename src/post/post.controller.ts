import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards, ParseUUIDPipe, HttpStatus, HttpCode, Ip, Logger, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService

  ) { }

  private readonly loggerService = new LoggerService(PostController.name);

  @Post()
  @UseGuards(AuthGuard)
  async create(@Ip() ip: string, @Body(ValidationPipe) createPostDto: CreatePostDto) {
    this.loggerService.log(`Request Post Created | IP: ${ip}`, PostController.name);
    return await this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.postService.findAll();
  }

  @Get('user/:userId')
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
  async update(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updatePostDto: UpdatePostDto) {
    this.loggerService.log(`Request Post Update | Ip: ${ip}`, PostController.name);
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string) {
    this.loggerService.log(`Request Post Delete | Ip: ${ip}`, PostController.name);
    return await this.postService.remove(id);
  }
}
