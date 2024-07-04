import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly service: DatabaseService) { };


  async create(createUserDto: CreateUserDto) {

    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      surname: createUserDto.surname,
      comments: {
        create: []
      },
      role: createUserDto.role,
      searchType: createUserDto.searchType,
      posts: {
        create: []
      }
    };

    return this.service.user.create({ data: data });
  }

  async findAll(role?: 'NORMAL' | 'PREMIUM' | 'ADMIN') {
    if (role) {
      return this.service.user.findMany({
        where: {
          role
        }
      })
    }
    return this.service.user.findMany();
  }

  async findOne(id: number) {
    return this.service.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.service.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        surname: updateUserDto.surname,
        comments: {
          update: updateUserDto.comments?.update || []
        },
        role: updateUserDto.role,
        searchType: updateUserDto.searchType,
        posts: {
          update: updateUserDto.posts?.update || []
        }
      }
    });
  }

  async remove(id: number) {
    return this.service.user.delete({ where: { id } });
  }
}
