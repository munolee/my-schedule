import moment, { Moment } from 'moment';
import { atom } from 'recoil';

export const currentTimeAtom = atom<Moment>({
  key: 'currentTimeState',
  default: moment(),
});
