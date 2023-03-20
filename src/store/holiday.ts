import { atom } from 'recoil';
import { EventScheduleType } from '@hooks/useEventSchedule';

export const holidayAtom = atom<EventScheduleType[]>({
  key: 'holidayState',
  default: [],
});
