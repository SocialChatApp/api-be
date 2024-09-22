import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/configs/jwt-secret';
import { MailerModule } from 'src/mailer/mailer.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: "localhost",
            port: 6380,
          },
        });

        return {
          store: {
            create: () => store,
          },
        };
      },
    }),
    MailerModule
  ],
})
export class AuthModule { }
