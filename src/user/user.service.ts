import { HttpException, HttpStatus, Injectable, Ip } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly service: DatabaseService,
    private readonly loggerService: LoggerService
  ) { };

  async create(createUserDto: CreateUserDto) {

    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: createUserDto.password,
      role: createUserDto.role,
      searchType: createUserDto.searchType,
      avatarUrl: createUserDto.avatarUrl
    };

    const createdUser = await this.service.user.create({
      data: data
    });

    return { id: createdUser.id };
  }

  async findAll(@Ip() ip: String, role?: 'NORMAL' | 'PREMIUM' | 'ADMIN') {

    if (role) {
      return this.service.user.findMany({
        where: {
          role
        }
      })
    }

    return this.service.user.findMany();
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
      }
    });
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      email: updateUserDto.email,
      name: updateUserDto.name,
      surname: updateUserDto.surname,
      role: updateUserDto.role,
      searchType: updateUserDto.searchType,
      avatarUrl: updateUserDto.avatarUrl
    };

    return this.service.user.update({
      where: { id },
      data: data
    });
  }

  async remove(id: string) {
    return this.service.user.delete({
      where: { id }
    });
  }
}
