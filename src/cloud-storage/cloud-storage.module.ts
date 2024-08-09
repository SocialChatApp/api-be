import { Module } from '@nestjs/common';
import { CloudStorageController } from './cloud-storage.controller';
import { CloudStorageService } from './cloud-storage.service';

@Module({
  controllers: [CloudStorageController],
  providers: [CloudStorageService]
})
export class CloudStorageModule {}
