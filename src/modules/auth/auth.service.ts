import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(cpf: string, pass: string) {
    const user = await this.userService.getUserByCpf(cpf);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  public async login(user) {
    const userLogin = await this.userService.getUserByCpf(user.cpf);

    const userForToken = {
      ...user,
      id: userLogin['dataValues'].id,
      name: userLogin['dataValues'].name,
    };

    const token = await this.generateToken(userForToken);
    return { token };
  }

  public async createUser(user: UserDto) {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.userService.createUser({
      ...user,
      password: pass,
    });

    const { password, ...result } = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  private async generateToken(user: UserDto) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
