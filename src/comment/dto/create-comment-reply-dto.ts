import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReplyDto {
    id: number
    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    commentId: number

}