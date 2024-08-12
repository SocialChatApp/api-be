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
      password: createUserDto.password,
      role: createUserDto.role,
      searchType: createUserDto.searchType
    };

    return this.service.user.create({
      data: data,
      include: {
        posts: true,
        comments: true
      }
    });
  }

  async findAll(role?: 'NORMAL' | 'PREMIUM' | 'ADMIN') {
    if (role) {
      return this.service.user.findMany({
        where: {
          role
        },
        include: {
          comments: true,
          posts: true
        }
      })
    }
    return this.service.user.findMany({
      include: {
        comments: true,
        posts: true
      }
    });
  }

  async findOne(id: string) {
    return this.service.user.findUnique({
      where: {
        id
      }
    });
  }

  async findOneByEmail(email: string) {
    return this.service.user.findUnique({
      where: {
        email,
      },
      include: {
        posts: true,
        comments: true,
      },
    });
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      email: updateUserDto.email,
      name: updateUserDto.name,
      surname: updateUserDto.surname,
      role: updateUserDto.role,
      searchType: updateUserDto.searchType
    };

    return this.service.user.update({
      where: { id },
      data: data,
      include: {
        posts: true,
        comments: true
      }
    });
  }

  async remove(id: string) {
    return this.service.user.delete({
      where: { id }, include: {
        posts: true,
        comments: true
      }
    });
  }
}
