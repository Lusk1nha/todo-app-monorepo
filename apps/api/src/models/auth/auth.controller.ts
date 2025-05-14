import { Body, Controller, Post } from '@nestjs/common';
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
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Email } from 'src/common/entities/email/email';
import {
  GetEmailAvailabilityInput,
  GetEmailAvailabilityOutput,
  GetUserNameAvailabilityInput,
  GetUserNameAvailabilityOutput,
} from './dto/get.dto';

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
  async login(@Body() payload: LoginWithCredentialsInput): Promise<LoginWithCredentialsOutput> {
    const email = new Email(payload.email);
    const user = await this.authService.validateCredentials(email, payload.password);

    return this.authService.signInWithCredentials(user);
  }

  @Post('username-exists')
  @ApiOperation({
    summary: 'Check if username exists',
    description: 'Check if a username is already taken',
  })
  async checkUsernameExists(
    @Body() payload: GetUserNameAvailabilityInput,
  ): Promise<GetUserNameAvailabilityOutput> {
    const userName = payload.name;

    const isAvailable = await this.authService.getUserNameAvailability(userName);

    return {
      available: isAvailable,
    };
  }

  @Post('email-exists')
  @ApiOperation({
    summary: 'Check if email exists',
    description: 'Check if an email is already registered',
  })
  async checkEmailExists(
    @Body() payload: GetEmailAvailabilityInput,
  ): Promise<GetEmailAvailabilityOutput> {
    const email = new Email(payload.email);

    const isAvailable = await this.authService.getEmailAvailability(email);

    return {
      available: isAvailable,
    };
  }
}
