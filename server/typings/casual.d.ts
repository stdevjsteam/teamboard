declare namespace Casual {
  interface Generators {
    user: (data?: object) => import('../src/types/models').User;
    news: (data?: object) => import('../src/types/models').News;
    invitation: (data?: object) => import('../src/types/models').Token;
    group: (data?: object) => import('../src/types/models').Group;
  }
}
