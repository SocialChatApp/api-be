import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ReplyModule } from './reply/reply.module';
import { CloudStorageModule } from './cloud-storage/cloud-storage.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [DatabaseModule, UserModule, PostModule, CommentModule, AuthModule, ReplyModule, CloudStorageModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
