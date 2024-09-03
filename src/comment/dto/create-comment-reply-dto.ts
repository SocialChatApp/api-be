import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReplyDto {
    id: string
    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    commentId: string

}