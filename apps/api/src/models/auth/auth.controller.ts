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
  register(@Body() payload: RegisterWithCredentialsInput) {
    return this.authService.signUp(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginWithCredentialsInput })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  login(@Body() payload: LoginWithCredentialsInput) {
    return this.authService.signIn(payload);
  }
}
