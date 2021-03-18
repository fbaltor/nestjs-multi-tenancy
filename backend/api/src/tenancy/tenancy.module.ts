import { Module, Global, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { getConnection, Connection, DatabaseType } from 'typeorm';
import { Products } from '../products/products.entity';

function getTenantName(headers) {
  const auth_token = headers['authorization'];
  const auth_claims = parseJwt(auth_token);
  const tenantName = auth_claims['db_access'][0].substring(1);
  return tenantName;
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64')
      .toString()
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (req) => {
    const tenantName = getTenantName(req.headers);
    const connection = await getConnection(tenantName);

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
