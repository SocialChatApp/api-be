import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ReplyService } from './reply.service';
import { UpdateReplyDto } from 'src/reply/dto/update-comment-reply-dto';
import { CreateReplyDto } from 'src/reply/dto/create-comment-reply-dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('reply')
export class ReplyController {
  constructor(private readonly service: ReplyService) { }

  private readonly logger = new LoggerService(ReplyController.name);

  @Post()
  @UseGuards(AuthGuard)
  async createReply(@Ip() ip: string, @Body() createReplyDto: CreateReplyDto) {
    this.logger.log(`Request for create reply`, ReplyController.name);
    return await this.service.createReply(createReplyDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findAllReplies(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findAllReplies(id);
  }

  // @Get(':id')
  // @UseGuards(AuthGuard)
  // async findOneReply(@Param('id', ParseUUIDPipe) id: string) {
  //   return await this.service.findOneReply(id);
  // }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateReply(
    @Ip() ip: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReplyDto: UpdateReplyDto,
  ) {
    this.logger.log(`Request for update reply`, ReplyController.name);
    return await this.service.updateReply(id, updateReplyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeReply(@Ip() ip: string, @Param('id', ParseUUIDPipe) id: string) {
    this.logger.log(`Request for delete reply`, ReplyController.name);
    return await this.service.deleteReply(id);
  }
}
