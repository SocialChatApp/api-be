import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { DatabaseModule } from 'src/database/database.module';
import { CommentModule } from 'src/comment/comment.module';
import { UserModule } from 'src/user/user.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    DatabaseModule,
    CommentModule,
    UserModule,
    LoggerModule
  ],
  controllers: [ReplyController],
  providers: [ReplyService]
})
export class ReplyModule { }
