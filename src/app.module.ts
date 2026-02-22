import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { Users } from './users/user.entity';
import { Note } from './notes/note.entity';
import * as dotenv from 'dotenv';

// Load env variables immediately
dotenv.config();

const DB_HOST = process.env.DB_HOST || 'containers-us-west-123.railway.app';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 12345;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'yourpassword';
const DB_NAME = process.env.DB_NAME || 'hello_diary';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [Users, Note],
      synchronize: true, // Only for development
    }),
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}