import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/configs/jwt-secret';
import { MailerModule } from 'src/mailer/mailer.module';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    CacheModule.register(
      {
        ttl: 120000
      }
    ),
    MailerModule
  ],
})
export class AuthModule { }
