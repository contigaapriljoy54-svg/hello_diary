import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.usersService.create(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.findByUsername(body.username);
    if (!user) {
      return { message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return { message: 'Invalid credentials' };
    }

    return { message: 'Login successful', userId: user.id };
  }
}