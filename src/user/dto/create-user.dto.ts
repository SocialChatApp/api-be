/* eslint-disable prettier/prettier */
// import { Prisma } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateCommentDto } from "src/comment/dto/create-comment.dto"
import { CreatePostDto } from "src/post/dto/create-post.dto"
import { Role, SearchType } from "@prisma/client";
import { Type } from "class-transformer";

export class CreateUserDto {
    // id: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    surname: string;
    @Type(() => CreateCommentDto)
    comments: Array<CreateCommentDto>;
    @IsEnum(Role, { message: "Role must be invalid such as ADMIN or PREMIUM or NORMAL " })
    role: Role;
    @IsEnum(SearchType, { message: "SearchType must be invalid such as PUBLIC or PRIVATE " })
    searchType: SearchType;
    @Type(() => CreatePostDto)
    posts: Array<CreatePostDto>;
    @IsOptional()
    @IsString()
    avatarUrl: string;
}



