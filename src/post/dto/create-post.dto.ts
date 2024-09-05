import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => CreateCommentDto)
  comments: CreateCommentDto[];

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  imageUrl: string;
}
