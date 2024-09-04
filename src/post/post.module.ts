import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { PostController } from './post.controller';
@Module({
  imports: [
    DatabaseModule,
    LoggerModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
