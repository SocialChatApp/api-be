import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthResult } from './dto/AuthResult';
import { LoginDto } from './dto/LoginDto';
import { SignInDto } from './dto/SignInDto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { VerificationCacheService } from 'src/verification-cache/verification-cache.service';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly verifyService: VerificationCacheService
    ) { };

    async Authenticate(userInput: LoginDto): Promise<AuthResult> {
        const user = await this.ValidateUser(userInput);
        if (!user) {
            throw new UnauthorizedException();
        }

        return this.CreateToken(user);
    }

    async ValidateUser(userDto: LoginDto): Promise<SignInDto | null> {
        const user = await this.userService.findOneByEmail(userDto.email);

        if (user && user.password === userDto.password) {
            return {
                userId: user.id,
                eMail: user.email,
                password: user.password
            };
        }
        return null;
    }


    async CreateToken(user: SignInDto): Promise<AuthResult> {
        const payload = {
            sub: user.userId,
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

    async Verify() {
        await this.verifyService.CreateKey('sukru.beyy@outlook.com');

        const response = await this.verifyService.GetVerifyCode();
        return response;
    }
}
