import { Test, TestingModule } from '@nestjs/testing';
import { VerificationCacheService } from './verification-cache.service';

describe('VerificationCacheService', () => {
  let service: VerificationCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationCacheService],
    }).compile();

    service = module.get<VerificationCacheService>(VerificationCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
