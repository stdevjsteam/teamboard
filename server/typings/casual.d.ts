declare namespace Casual {
  interface Generators {
    user: (data?: object) => import('../src/types/models').User;
    news: (data?: object) => import('../src/types/models').News;
    interestingToKnow: (
      data?: object
    ) => import('../src/types/models').InterestingToKnow;
    event: (data?: object) => import('../src/types/models').Event;
    invitation: (data?: object) => import('../src/types/models').Token;
    group: (data?: object) => import('../src/types/models').Group;
  }
}
