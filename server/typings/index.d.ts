interface XMLHttpRequest {}
interface Blob {}

declare const user: any;
declare const admin: any;

declare namespace NodeJS {
  interface Global {
    user: any;
    admin: any;
  }
}
