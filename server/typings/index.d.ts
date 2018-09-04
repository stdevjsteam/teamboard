interface XMLHttpRequest {}
interface Blob {}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  details: import('../src/types/models').User;
  tokens: Tokens;
  api: import('superagent-defaults').Defaults;
}

declare const user: User;
declare const admin: User;

declare namespace NodeJS {
  interface Global {
    user: User;
    admin: User;
  }
}
