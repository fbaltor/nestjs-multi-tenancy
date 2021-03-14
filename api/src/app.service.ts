import { Injectable } from '@nestjs/common';

function logEnv() {
  const env = process.env;
  console.log(env);
  return env;
}

@Injectable()
export class AppService {
  getHello(): string {
    logEnv();
    return 'Hello World!';
  }
}
