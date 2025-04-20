import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserNameAvailabilityInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name to check for availability',
    example: 'john_doe',
  })
  name: string;
}

export class GetUserNameAvailabilityOutput {
  @ApiProperty({
    description: 'Indicates whether the user name is available',
    example: true,
  })
  available: boolean;
}

export class GetEmailAvailabilityInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email to check for availability',
    example: 'john_doe@gmail.com',
  })
  email: string;
}

export class GetEmailAvailabilityOutput {
  @ApiProperty({
    description: 'Indicates whether the email is available',
    example: true,
  })
  available: boolean;
}
