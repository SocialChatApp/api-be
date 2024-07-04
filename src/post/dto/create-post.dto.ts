import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateCommentDto } from "src/comment/dto/create-comment.dto"
import { Type } from "class-transformer";


export class CreatePostDto {
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @Type(() => CreateCommentDto)
    comments: CreateCommentDto[];

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}

