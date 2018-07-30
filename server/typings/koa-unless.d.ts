declare module 'koa-unless' {
  interface Params {
    next: string;
  }

  function unless(params: Params): void;

  export default unless;
}
