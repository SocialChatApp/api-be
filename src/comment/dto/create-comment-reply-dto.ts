import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReplyDto {
    id: string
    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    @IsNumber()
    userId: string

    @IsNotEmpty()
    @IsNumber()
    commentId: string

}