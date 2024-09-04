import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { PostController } from './post.controller';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    UserModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
