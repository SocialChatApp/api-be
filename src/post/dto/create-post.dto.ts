import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";
import { CreateCommentDto } from "src/comment/dto/create-comment.dto"
import { Type } from "class-transformer";


export class CreatePostDto {
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @Type(() => CreateCommentDto)
    comments: CreateCommentDto[];

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    imageUrl: string;
}

