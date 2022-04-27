import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(256)
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(256)
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(15)
  @ApiProperty()
  readonly rg: string;

  @IsNotEmpty()
  @MaxLength(14)
  @ApiProperty()
  readonly cpf: string;

  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  readonly job: string;

  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  readonly employer: string;

  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  readonly userType: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;
}
