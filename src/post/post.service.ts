import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {

  constructor(private readonly service: DatabaseService) { };

  async create(createPostDto: CreatePostDto) {
    const post = await this.service.post.create(
      {
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          imageUrl: createPostDto.imageUrl,
          comments: {
            create: []
          },
          userId: createPostDto.userId
        }
      }
    );

    return { id: post.id };

  }

  async findAll() {
    return await this.service.post.findMany();
  }

  async findAllByUserId(id: string) {
    return await this.service.post.findMany({
      where: {
        userId: id,
      }
    })
  }

  async findOne(id: string) {
    return await this.service.post.findUnique({
      where: { id }
    });
  }


  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.service.post.update(
      {
        where: { id },
        data: {
          title: updatePostDto.title,
          content: updatePostDto.content,
          imageUrl: updatePostDto.imageUrl
        }
      })
  }

  async remove(id: string) {
    return await this.service.post.delete({
      where: {
        id
      }
    })
  }
}
