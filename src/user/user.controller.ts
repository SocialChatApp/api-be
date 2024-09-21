import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Ip,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  private readonly myLogger = new LoggerService(UserController.name);

  @Post()
  async create(
    @Ip() ip: string,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    this.myLogger.log(`Request Create User | IP: ${ip}`, UserController.name);
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('role') role?: 'NORMAL' | 'PREMIUM' | 'ADMIN') {
    return await this.userService.findAll(role);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Ip() ip: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    this.myLogger.log(
      `Request for update User ById ${id} | IP: ${ip}`,
      UserController.name,
    );
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async remove(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string) {
    this.myLogger.log(
      `Request for remove User ById ${id} | IP: ${ip}`,
      UserController.name,
    );
    await this.userService.remove(id);
  }
}
