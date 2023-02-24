import { atom } from 'recoil';
import { schedule } from '../api/mock';
import { eventScheduleType } from '@hooks/useEventSchedule';

export const eventScheduleAtom = atom<eventScheduleType[]>({
  key: 'currentTime',
  default: schedule, //TODO 스케쥴 수정 사항
});
