import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    id: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    @IsNumber()
    userId: string

    @IsNotEmpty()
    @IsNumber()
    postId: string
}

