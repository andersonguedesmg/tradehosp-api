import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'cpf',
      passwordField: 'password',
    });
  }

  async validate(cpf: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(cpf, password);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválida');
    }
    return user;
  }
}
