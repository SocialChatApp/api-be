import { Module } from '@nestjs/common';
import { VerificationCacheService } from './verification-cache.service';
import { UserModule } from 'src/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    CacheModule.register()
  ],
  exports: [
    VerificationCacheService
  ],
  providers: [VerificationCacheService]
})
export class VerificationCacheModule { }
