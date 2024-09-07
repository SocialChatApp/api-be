import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { EmailDto } from 'src/auth/dto/Email';
import { VerificationDto } from 'src/auth/dto/verification';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) { };

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.service.Authenticate(loginDto);
    }

    @Get('token')
    @HttpCode(HttpStatus.NO_CONTENT)
    async generateVerificationToken(@Body() mailDto: EmailDto) {
        return this.service.generateVerificationToken(mailDto);
    }

    @Get('verify')
    async verify(@Body() verifyDto: VerificationDto) {
        return this.service.verify(verifyDto);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getUserInfo(@Request() request) {
        return this.userService.findOne(request.user.userId);
    }
}
