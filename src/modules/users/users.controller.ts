import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um usuário especifico' })
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException('Esse usuário não existe');
    }

    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Altera os dados de um usuário especifico' })
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserDto,
  ): Promise<User> {
    const { numberOfAffectedRows, updatedUser }: any =
      await this.usersService.updateUser(id, user);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('Esse usuário não existe');
    }

    return updatedUser;
  }
}
