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
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException('Esse usuário não existe');
    }

    return user;
  }

  @Put(':id')
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
