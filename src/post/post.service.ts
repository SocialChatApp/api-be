import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto } from './dto/create-post.dto';

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
        }
      }
    )
  }

  async findAll() {
    return this.service.post.findMany();
  }

  async findOne(id: number) {
    return this.service.post.findUnique({ where: { id } });
  }

  async update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.service.post.update(
      {
        where: { id },
        data: {
          title: updatePostDto.title,
          content: updatePostDto.content
        }
      })
  }

  async remove(id: number) {
    return this.service.post.delete({
      where: {
        id
      }
    })
  }
}
