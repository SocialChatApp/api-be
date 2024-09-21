import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly service: DatabaseService,
    private readonly userService: UserService,
    private readonly postService: PostService

  ) { };

  private readonly loggerService = new LoggerService(CommentService.name);

  //#region Comments

  async create(createCommentDto: CreateCommentDto) {

    await this.IsPostAndUserExist(createCommentDto.postId, createCommentDto.userId)

    const comment = await this.service.comment.create(
      {
        data: createCommentDto,
      }
    );

    this.loggerService.log(`Comment created succesfully ${comment.id}`, CommentService.name);
    return { id: comment.id };
  }


  async findAll(postId: string) {
    return await this.service.comment.findMany({
      where: {
        postId
      }
    });
  }

  async findOne(id: string) {

    if (!await this.IsCommentExist(id))
      throw new NotFoundException(`Comment Not Found ID: ${id}`);

    return await this.service.comment.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {

    await this.IsPostAndUserExist(updateCommentDto.postId, updateCommentDto.userId)

    if (!await this.IsCommentExist(id))
      throw new NotFoundException(`Comment Not Found ID: ${id}`);

    const updatedComment = await this.service.comment.update({
      where: {
        id
      },
      data: updateCommentDto
    });

    this.loggerService.log(`Comment updated succesfully ${updatedComment.id}`, CommentService.name);


    return { id: updatedComment.id };
  }

  async remove(id: string) {
    if (!await this.IsCommentExist(id))
      throw new NotFoundException(`Comment Not Found ID: ${id}`);
    const deletedComment = await this.service.comment.delete({
      where: { id }
    });

    this.loggerService.log(`Comment updated succesfully ${deletedComment.id}`, CommentService.name);
    return deletedComment;
  }

  //#endregion


  async IsPostAndUserExist(postId: string, userId: string) {
    const post = await this.postService.IsPostExist(postId);
    const user = await this.userService.IsUserExist(userId);
    if (!post && !user)
      throw new NotFoundException(`Post And User Not Found | PostId: ${postId} | UserId: ${userId}`);
    else if (!user)
      throw new NotFoundException(`User Not Found ${userId}`);
    else if (!post)
      throw new NotFoundException(`Post Not Found ${postId}`);
  }

  async IsCommentExist(id: string): Promise<boolean> {
    const post = await this.service.comment.findUnique(
      {
        where: {
          id
        }
      }
    )

    return !!post;
  }
}
