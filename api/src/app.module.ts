import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

const defaultOptions: TypeOrmModuleOptions = {
  // The 'type' must be a literal string (?)
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.api.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'db_a',
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'db_b',
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'db_c',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
