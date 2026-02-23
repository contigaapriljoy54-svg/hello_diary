import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity'; 
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const existing = await this.usersRepo.findOneBy({ username });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

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