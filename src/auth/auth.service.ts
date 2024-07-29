import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthResult } from './dto/AuthResult';
import { LoginDto } from './dto/LoginDto';
import { SignInDto } from './dto/SignInDto';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { };

    async Authenticate(userInput: LoginDto): Promise<AuthResult> {
        const user = await this.ValidateUser(userInput);
        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            UserId: user.userId,
            UserMail: userInput.email,
            UserPassword: userInput.password,
            AccesToken: 'fake-access',
        }
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
}
