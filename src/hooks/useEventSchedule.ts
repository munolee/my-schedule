import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { currentMonthEventSelector, eventScheduleAtom } from '@store/eventSchedule';
import { ScheduleApi } from '@api/schedule';
import { currentTimeAtom } from '@store/currentTime';

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

export type CurrentMonthEventType = EventScheduleType & TopPosition;

type UseEventScheduleType = {
  isLoading: boolean;
  currentMonthEvent: CurrentMonthEventType[];
  getEventPaintType: (event: EventScheduleType, date: string) => EventPaintEnum;
};

const useEventSchedule = (): UseEventScheduleType => {
  const currentTime = useRecoilValue(currentTimeAtom);
  const currentMonthEvent = useRecoilValue(currentMonthEventSelector);
  const setEventSchedule = useSetRecoilState(eventScheduleAtom);

  const { isLoading } = useQuery(
    'getSchedule',
    async () => {
      const response = ScheduleApi.getScheduleList(`year=${currentTime.year()}`);
      return response;
    },
    {
      onSuccess: (data) => {
        if (!data) {
          return;
        }
        setEventSchedule(data);
      },
    }
  );

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
    isLoading,
    currentMonthEvent,
    getEventPaintType,
  };
};

export default useEventSchedule;
