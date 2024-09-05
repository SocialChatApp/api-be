import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) { };

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.service.Authenticate(loginDto);
    }

    @Post('verify')
    verifyMail() {
        return this.service.Verify();
    }


    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return this.userService.findOne(request.user.userId);
    }
}
