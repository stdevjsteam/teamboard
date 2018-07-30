import { common } from '../../modules';

export type State = {
  list: common.Id[];
  current: common.Id | null;
};
