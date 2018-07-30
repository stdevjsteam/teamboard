interface XMLHttpRequest {}
interface Blob {}

declare namespace NodeJS {
  interface Global {
    accessToken: string;
    refreshToken: string;
    me: any;
    api: any;
    repos: any;
  }
}
