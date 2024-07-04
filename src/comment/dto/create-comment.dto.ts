import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    id: number

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    postId: number
}

