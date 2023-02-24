import { atom } from 'recoil';
import moment, { Moment } from 'moment';

export const currentTimeAtom = atom<Moment>({
  key: 'currentTimeState',
  default: moment(),
});
