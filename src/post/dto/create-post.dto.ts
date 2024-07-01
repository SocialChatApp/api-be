import { CreateCommentDto } from "src/comment/dto/create-comment.dto"

export class CreatePostDto {
    id: number;
    title: string;
    content: string;
    comments: Array<CreateCommentDto>;
    userId: number;
}

