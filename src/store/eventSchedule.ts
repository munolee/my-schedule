import { atom, selector } from 'recoil';
import { schedule } from '../api/mock';
import { currentMonthEventType, EventScheduleType } from '@hooks/useEventSchedule';
import { currentTimeAtom } from '@store/currentTime';

export const eventScheduleAtom = atom<EventScheduleType[]>({
  key: 'eventScheduleState',
  default: schedule, //TODO 스케쥴 수정 사항
});

export const currentMonthEventSelector = selector<currentMonthEventType[]>({
  key: 'currentMonthEventState',
  get: ({ get }) => {
    const eventSchedule = get(eventScheduleAtom);
    const currentTime = get(currentTimeAtom);
    const sortCurrentMonthEvent = eventSchedule
      .filter((event) => currentTime.isSame(event.startDate, 'month') || currentTime.isSame(event.endDate, 'month'))
      .sort((a, b) => {
        if (a.startDate >= b.startDate) return 1;
        if (a.endDate >= b.endDate) return -1;
        return -1;
      });

    let position = 0;
    return sortCurrentMonthEvent.map((event, index) => {
      const prevEvent = index > 0 ? sortCurrentMonthEvent[index - 1] : null;
      if (prevEvent && event.startDate >= prevEvent.startDate && event.startDate <= prevEvent.endDate) {
        position++;
      } else {
        position = 0;
      }
      return { ...event, position };
    });
  },
});
