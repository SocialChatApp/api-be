import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe, UsePipes, ParseUUIDPipe, HttpCode, HttpStatus, Ip } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly myLogger: LoggerService
  ) { }

  @Post()
  async create(@Ip() ip: string, @Body(ValidationPipe) createUserDto: CreateUserDto) {
    this.myLogger.log(`Request Create User | IP: ${ip}`, UserController.name);
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('role') role?: 'NORMAL' | 'PREMIUM' | 'ADMIN') {
    return await this.userService.findAll(role);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    this.myLogger.log(`Request for update User ById ${id} | IP: ${ip}`, UserController.name);
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string) {
    this.myLogger.log(`Request for remove User ById ${id} | IP: ${ip}`, UserController.name);
    await this.userService.remove(id);
  }
}
