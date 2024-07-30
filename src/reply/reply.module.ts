import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ReplyController],
  providers: [ReplyService],
  imports: [DatabaseModule]
})
export class ReplyModule { }
