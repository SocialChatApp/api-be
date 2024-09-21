import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class PostService {
  constructor(private readonly service: DatabaseService) { }

  private readonly loggerService = new LoggerService(PostService.name);

  async create(createPostDto: CreatePostDto) {
    if (!(await this.IsUserExist(createPostDto.userId)))
      throw new NotFoundException(
        `User does not exist ID: ${createPostDto.userId}`,
      );

    const post = await this.service.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        imageUrl: createPostDto.imageUrl,
        comments: {
          create: [],
        },
        userId: createPostDto.userId,
      },
    });

    this.loggerService.log(`Post Created Succesfully ID: ${post.id}`);
    return { id: post.id };
  }

  async findAll() {
    return await this.service.post.findMany(
      {
        select: {
          id: true,
          title: true,
          content: true,
          userId: true,
          imageUrl: true
        }
      }
    );
  }

  async findAllByUserId(id: string) {
    if (!(await this.IsUserExist(id)))
      throw new NotFoundException(`User does not exist ID: ${id}`);

    return await this.service.post.findMany({
      where: {
        userId: id,
      },
    });
  }

  async findOne(id: string) {
    if (!(await this.IsPostExist(id)))
      throw new NotFoundException(`Post does not exist ID: ${id}`);

    return await this.service.post.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    if (!(await this.IsPostExist(id)))
      throw new NotFoundException(`Post does not exist ID: ${id}`);

    const updatedPost = await this.service.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        imageUrl: updatePostDto.imageUrl,
      },
    });

    this.loggerService.log(`Post updated Succesfully ID: ${id}`);
    return updatedPost;
  }

  async remove(id: string) {
    if (!(await this.IsPostExist(id)))
      throw new NotFoundException(`Post does not exist ID: ${id}`);

    const deletedPost = await this.service.post.delete({
      where: {
        id,
      },
    });

    this.loggerService.log(`Post deleted Succesfully ID: ${id}`);
    return deletedPost;
  }

  async IsUserExist(id: string): Promise<boolean> {
    const user = await this.service.user.findUnique({
      where: {
        id,
      },
    });
    return !!user;
  }

  async IsPostExist(id: string): Promise<boolean> {
    const post = await this.service.post.findUnique({
      where: {
        id,
      },
    });

    return !!post;
  }
}
