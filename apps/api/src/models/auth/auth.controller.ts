import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithCredentialsInput, RegisterWithCredentialsInput } from './dto/create.dto';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterWithCredentialsInput })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  register(@Body() registerUserDto: RegisterWithCredentialsInput) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginWithCredentialsInput) {
    return this.authService.login(loginUserDto);
  }
}
