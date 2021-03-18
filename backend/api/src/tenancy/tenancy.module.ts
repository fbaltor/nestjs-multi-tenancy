import { Module, Global, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createConnection, Connection, DatabaseType } from 'typeorm';

const defaultOptions = {
  // The 'type' property must be a literal string (?)
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  retryAttempts: 5,
  retryDelay: 1000,
  keepConnectionAlive: true,
};

function getTenantName(headers) {
  const tenant = headers['authorization']['db_access'];
  try {
    const tenantName = tenant.substring(1);
    return tenantName;
  } catch (err) {
    console.log(err);
  }
}

const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (req) => {
    const tenantName = getTenantName(req.headers);
    const connection = await createConnection({
      ...defaultOptions,
      database: tenantName,
    });

    return connection;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class TenancyModule {}
