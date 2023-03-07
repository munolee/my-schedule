import { atom, selector } from 'recoil';
import { CurrentMonthEventType, EventScheduleType } from '@hooks/useEventSchedule';
import { currentTimeAtom } from '@store/currentTime';

export const eventScheduleAtom = atom<EventScheduleType[]>({
  key: 'eventScheduleState',
  default: [],
});

export const currentMonthEventSelector = selector<CurrentMonthEventType[]>({
  key: 'currentMonthEventState',
  get: ({ get }) => {
    const eventSchedule = get(eventScheduleAtom);
    const currentTime = get(currentTimeAtom);
    const sortCurrentMonthEvent = eventSchedule.filter(
      (event) => currentTime.isSame(event.startDate, 'month') || currentTime.isSame(event.endDate, 'month')
    );

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
