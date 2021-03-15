import { Injectable } from '@nestjs/common';

// Function for helping debugging ConfigModule
function logEnv() {
  const env = process.env;
  console.log(env);
  return env;
}

@Injectable()
export class AppService {
  getHello(): string {
    //logEnv();
    return 'Hello World!';
  }
}
