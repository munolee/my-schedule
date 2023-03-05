import { useRecoilValue } from 'recoil';
import { currentMonthEventSelector } from '@store/eventSchedule';

export enum EventPaintEnum {
  StartDate = 'startDate',
  EndDate = 'endDate',
  Ing = 'ing',
  OneDay = 'oneDay',
  Empty = 'empty',
}

type TopPosition = {
  position: number;
};

export type EventScheduleType = {
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
  bgColor: string;
};

export type currentMonthEventType = EventScheduleType & TopPosition;

type UseEventScheduleType = {
  currentMonthEvent: currentMonthEventType[];
  getEventPaintType: (event: EventScheduleType, date: string) => EventPaintEnum;
};

const useEventSchedule = (): UseEventScheduleType => {
  const currentMonthEvent = useRecoilValue(currentMonthEventSelector);

  const getEventPaintType = (event: EventScheduleType, date: string) => {
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
    currentMonthEvent,
    getEventPaintType,
  };
};

export default useEventSchedule;
