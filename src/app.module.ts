import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // fixed
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,  // ✅ automatically loads Note and User entities
  synchronize: true,       // ✅ creates tables automatically
  logging: true, // ✅ this prints SQL queries
}),
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}