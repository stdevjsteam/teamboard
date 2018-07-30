declare module 'superagent-defaults' {
  import { SuperAgent, SuperAgentRequest } from 'superagent';
  import { SuperTest, Test } from 'supertest';

  interface Defaults extends SuperAgent<SuperAgentRequest> {
    use(req: any): void;
  }

  function defaults(app: SuperTest<Test>): Defaults;

  export default defaults;
}
