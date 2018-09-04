declare module 'superagent-defaults' {
  import { SuperTest, Test } from 'supertest';

  export interface Defaults extends SuperTest<Test> {
    use(req: any): void;
  }

  function defaults(app: SuperTest<Test>): Defaults;

  export default defaults;
}
