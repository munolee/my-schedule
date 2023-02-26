import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import { currentTimeAtom } from '@store/currentTime';
import { eventScheduleAtom } from '@store/eventSchedule';

export enum EventPaintEnum {
  StartDate = 'start',
  EndDate = 'end',
  Ing = 'ing',
  OneDay = 'one-day',
  Empty = 'empty',
}

export type eventScheduleType = {
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
};

type UseEventScheduleType = {
  eventSchedule: eventScheduleType[];
  currentMonthEvent: eventScheduleType[];
  getEventPaintType: (event: eventScheduleType, date: string) => EventPaintEnum;
};

const useEventSchedule = (): UseEventScheduleType => {
  const eventSchedule = useRecoilValue(eventScheduleAtom);
  const currentTime = useRecoilValue(currentTimeAtom);

  const isCurrentMonth = (date: string) => {
    return currentTime.isSame(date, 'month');
  };

  const currentMonthEvent = useMemo(() => {
    return eventSchedule.filter((event) => isCurrentMonth(event.startDate) || isCurrentMonth(event.endDate));
  }, [eventSchedule, currentTime]);

  const getEventPaintType = (event: eventScheduleType, date: string) => {
    const { startDate, endDate } = event;
    if (date === startDate) {
      if (startDate === endDate) {
        return EventPaintEnum.OneDay;
      }
      return EventPaintEnum.StartDate;
    } else if (date === endDate) {
      return EventPaintEnum.EndDate;
    } else if (startDate < date && endDate > date) {
      return EventPaintEnum.Ing;
    }
    return EventPaintEnum.Empty;
  };

  return {
    eventSchedule,
    currentMonthEvent,
    getEventPaintType,
  };
};

export default useEventSchedule;
