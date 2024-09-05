import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { VerificationDto } from './dto/verification';

@Injectable()
export class VerificationCacheService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async CreateKey(mail: string) {
        const code = Math.floor(1000 + Math.random() * 9000);
        const verifyDto: VerificationDto = {
            mail,
            token: code
        };
        await this.cacheManager.set('verifyMail', verifyDto);
    }

    async GetVerifyCode() {
        return await this.cacheManager.get('verifyMail');
    }

}
