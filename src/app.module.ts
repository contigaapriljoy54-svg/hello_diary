import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',

      ...(process.env.MYSQL_URL
        ? { url: process.env.MYSQL_URL }
        : {
            host: process.env.MYSQLHOST,
            port: Number(process.env.MYSQLPORT),
            username: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,
          }),

      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),

    UsersModule,
    NotesModule, // ✅ required so User#notes metadata exists
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}