import { CreateCommentDto } from "src/comment/dto/create-comment.dto"
import { CreatePostDto } from "src/post/dto/create-post.dto"

export class CreateUserDto {
    id: number
    email: string
    name: string
    surname: string
    comments: Array<CreateCommentDto>
    role: Role
    searchType: SearchType
    posts: Array<CreatePostDto>
}

enum Role {
    ADMIN,
    PREMIUM,
    NORMAL
}

enum SearchType {
    PUBLIC,
    PRIVATE
}

