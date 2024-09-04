import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    UserModule,
    PostModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
