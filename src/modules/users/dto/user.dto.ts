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
  readonly name: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(256)
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(256)
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(15)
  readonly rg: string;

  @IsNotEmpty()
  @MaxLength(14)
  readonly cpf: string;

  @IsNotEmpty()
  @MaxLength(256)
  readonly job: string;

  @IsNotEmpty()
  @MaxLength(256)
  readonly employer: string;

  @IsNotEmpty()
  @MaxLength(256)
  readonly userType: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
