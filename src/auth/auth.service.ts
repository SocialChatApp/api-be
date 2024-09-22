import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResult } from './dto/AuthResult';
import { LoginDto } from './dto/LoginDto';
import { SignInDto } from './dto/SignInDto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { VerificationDto } from 'src/auth/dto/verification';
import { EmailDto } from 'src/auth/dto/Email';
import { MailerService } from 'src/mailer/mailer.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { };

    async Authenticate(userInput: LoginDto): Promise<AuthResult> {
        const user = await this.ValidateUser(userInput);
        if (!user) {
            throw new UnauthorizedException();
        }

        return this.CreateToken(user);
    }
    async isAccessTokenValid(accessToken: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(accessToken);
            return true;
        } catch (error) {
            return false;
        }
    }


    async ValidateUser(userDto: LoginDto): Promise<SignInDto | null> {
        const user = await this.userService.findOneByEmail(userDto.email);

        if (user && user.password === userDto.password) {
            return {
                eMail: user.email,
                password: user.password
            };
        }
        return null;
    }


    async CreateToken(user: SignInDto): Promise<AuthResult> {
        const userId = (await this.userService.findOneByEmail(user.eMail)).id;
        const payload = {
            sub: userId,
            userMail: user.eMail,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            AccesToken: accessToken,
            // UserId: user.userId,
            // UserMail: user.eMail,
            // UserPassword: user.password
        };
    }

    async generateVerificationToken(mailDto: EmailDto) {

        const code = await this.CreateVerifyToken(mailDto.mail)

        await this.mailerService.sendMail(
            mailDto.mail,              // Mail
            'Your Verification Code',   // Subject
            `Your verification code is: ${code}` // Content
        );

        return code;
    }

    async verify(VerificationDto: VerificationDto): Promise<boolean> {

        if (! await this.IsVerifyTokenExist(VerificationDto.mail))
            throw new UnauthorizedException('You have no any token or you are used. Pls try again take verify code');

        const token = await this.GetVerifyToken(VerificationDto.mail);
        if (token == VerificationDto.token) {
            await this.DeleteToken(VerificationDto.mail);
            return true;
        }
        else
            throw new UnauthorizedException('Invalid or expired verification code');
    }

    async CreateVerifyToken(mail: string): Promise<number> {
        const code = Math.floor(1000 + Math.random() * 9000);
        await this.cacheManager.set(mail, code);
        return code;
    }

    async GetVerifyToken(mail: string): Promise<number> {
        return await this.cacheManager.get<number>(mail);
    }

    async DeleteToken(mail: string) {
        return await this.cacheManager.del(mail);
    }

    async IsVerifyTokenExist(mail: string): Promise<boolean> {
        const value = await this.cacheManager.get(mail);
        return value !== undefined;
    }
}
