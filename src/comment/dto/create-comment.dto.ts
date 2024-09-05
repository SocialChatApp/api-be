import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    id: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    postId: string
}

