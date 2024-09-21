import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(private readonly service: DatabaseService) { }

  private readonly loggerService = new LoggerService(UserService.name);

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: createUserDto.password,
      role: createUserDto.role,
      searchType: createUserDto.searchType,
      avatarUrl: createUserDto.avatarUrl,
    };

    if (await this.IsEmailExist(createUserDto.email))
      throw new ConflictException(
        'Unique constraint violation: email already exists.',
      );

    const createdUser = await this.service.user.create({
      data: data,
    });

    this.loggerService.log(
      `User created successfully with ID: ${createdUser.id}`,
      UserService.name,
    );

    return { id: createdUser.id };
  }

  async findAll(role?: 'NORMAL' | 'PREMIUM' | 'ADMIN') {

    const selectFields = {
      id: true,
      name: true,
      surname: true,
      avatarUrl: true,
    };

    if (role) {
      return this.service.user.findMany({
        where: {
          role,
        },
        select: selectFields
      });
    }

    return this.service.user.findMany({
      select: selectFields
    });
  }

  async findOne(id: string) {
    if (!(await this.IsUserExist(id)))
      throw new NotFoundException('This user does not exist');

    return await this.service.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    if (!(await this.IsEmailExist(email)))
      throw new NotFoundException('This email not found');

    return await this.service.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!(await this.IsUserExist(id)))
      throw new NotFoundException('This user does not exist');

    const data: Prisma.UserUpdateInput = {
      email: updateUserDto.email,
      name: updateUserDto.name,
      surname: updateUserDto.surname,
      role: updateUserDto.role,
      searchType: updateUserDto.searchType,
      avatarUrl: updateUserDto.avatarUrl,
    };

    const updatedUser = await this.service.user.update({
      where: { id },
      data: data,
    });

    this.loggerService.log(
      `User updated successfully with ID: ${updatedUser.id}`,
      UserService.name,
    );

    return updatedUser;
  }

  async remove(id: string) {
    if (!(await this.IsUserExist(id)))
      throw new NotFoundException('This user does not exist');

    const deletedUser = await this.service.user.delete({
      where: { id },
    });

    this.loggerService.log(
      `User deleted successfully with ID: ${deletedUser.id}`,
      UserService.name,
    );

    return deletedUser;
  }

  async IsEmailExist(email: string) {
    const user = await this.service.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async IsUserExist(id: string): Promise<boolean> {
    const user = await this.service.user.findUnique({
      where: {
        id,
      },
    });
    return !!user;
  }
}
