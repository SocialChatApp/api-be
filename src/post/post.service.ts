import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {

  constructor(private readonly service: DatabaseService) { };

  //Şu anlık userId kısmında hata verdiği | sorun olduğu için default dto kullanılıyor. Sonradan prisma.postcreateinput'a geçilecek
  async create(createPostDto: CreatePostDto) {
    return this.service.post.create(
      {
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          comments: {
            create: []
          },
          userId: createPostDto.userId
        },
        include: {
          user: true,
          comments: true,
        }
      }
    )
  }

  async findAll() {
    return this.service.post.findMany({
      include: {
        user: true,
        comments: true
      }
    });
  }

  async findOne(id: number) {
    return this.service.post.findUnique({
      where: { id }, include: {
        user: true,
        comments: true
      }
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.service.post.update(
      {
        where: { id },
        data: {
          title: updatePostDto.title,
          content: updatePostDto.content
        },
        include: {
          user: true,
          comments: true
        }
      })
  }

  async remove(id: number) {
    return this.service.post.delete({
      where: {
        id
      },
      include: {
        user: true,
        comments: true
      }
    })
  }
}
