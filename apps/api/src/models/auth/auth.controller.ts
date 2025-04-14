import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginWithCredentialsInput,
  LoginWithCredentialsOutput,
  RegisterWithCredentialsInput,
  RegisterWithCredentialsOutput,
} from './dto/create.dto';

import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Email } from 'src/common/entities/email/email';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates a new user account with email and password credentials',
  })
  @ApiBody({
    type: RegisterWithCredentialsInput,
    description: 'User registration details',
  })
  @ApiCreatedResponse({
    type: RegisterWithCredentialsOutput,
    description: 'User registered successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or missing required fields',
  })
  @ApiConflictResponse({
    description: 'Email already registered',
  })
  async register(
    @Body() payload: RegisterWithCredentialsInput,
  ): Promise<RegisterWithCredentialsOutput> {
    return this.authService.signUp(payload);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Logs in a user with email and password credentials',
  })
  @ApiBody({
    type: LoginWithCredentialsInput,
    description: 'User login credentials',
  })
  @ApiOkResponse({
    type: LoginWithCredentialsOutput,
    description: 'User authenticated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or missing required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many login attempts - rate limited',
  })
  async login(@Body() payload: LoginWithCredentialsInput): Promise<LoginWithCredentialsOutput> {
    const email = new Email(payload.email);
    const user = await this.authService.validateCredentials(email, payload.password);

    return this.authService.signInWithCredentials(user);
  }
}
