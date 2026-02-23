import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async register(body: { username: string; password: string }) {
    const { username, password } = body;

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = this.usersRepo.create({
      username,
      password: hash,
    });

    await this.usersRepo.save(user);

    return {
      message: 'User registered successfully',
      userId: user.id,
    };
  }

  async create(username: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hash });
    return this.usersRepo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ username });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }
}