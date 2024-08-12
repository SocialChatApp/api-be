import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  //Şu anlık default dto kullanılıyor hata aldığımız için - sonradan prisma.postcreateinput'a geçilecek
  @UseGuards(AuthGuard)
  create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.postService.findAll();
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  findAllByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.postService.findAllByUserId(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.remove(id);
  }
}
