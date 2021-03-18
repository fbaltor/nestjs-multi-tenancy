import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// Importing auth/keycloak related modules
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { ProductsModule } from './products/products.module';
import { join } from 'path';

const defaultOptions: TypeOrmModuleOptions = {
  // The 'type' property must be a literal string (?)
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: false,
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  retryAttempts: 5,
  retryDelay: 1000,
  keepConnectionAlive: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'db_a',
      name: 'db_a',
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'db_b',
      name: 'db_b',
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'db_c',
      name: 'db_c',
    }),
    KeycloakConnectModule.registerAsync({
      useFactory: () => {
        const keycloakConfig = JSON.parse(process.env.KEYCLOAK_JSON);
        return {
          authServerUrl: keycloakConfig['auth-server-url'],
          realm: keycloakConfig['realm'],
          clientId: keycloakConfig['resource'],
          secret: keycloakConfig['credentials']['secret'],
        };
      },
    }),

    ConfigModule.forRoot({
      envFilePath: '.api.env',
      isGlobal: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
