import { useMutation, UseMutationResult, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ScheduleApi } from '@api/schedule';
import useToast, { ToastEnumType } from '@hooks/useToast';
import { currentTimeAtom } from '@store/currentTime';
import { currentMonthEventSelector, eventScheduleAtom } from '@store/eventSchedule';

export enum EventPaintEnum {
  StartDate = 'startDate',
  EndDate = 'endDate',
  Ing = 'ing',
  OneDay = 'oneDay',
  Empty = 'empty',
}

interface TopPosition {
  position: number;
}

export interface EventScheduleType {
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
  bgColor: string;
}

export type CurrentMonthEventType = EventScheduleType & TopPosition;

interface UseEventScheduleType {
  isLoading: boolean;
  currentMonthEvent: CurrentMonthEventType[];
  getEventPaintType: (event: EventScheduleType, date: string) => EventPaintEnum;
  createSchedule: () => UseMutationResult<EventScheduleType, unknown, EventScheduleType, unknown>;
}

const useEventSchedule = (): UseEventScheduleType => {
  const currentTime = useRecoilValue(currentTimeAtom);
  const currentMonthEvent = useRecoilValue(currentMonthEventSelector);
  const setEventSchedule = useSetRecoilState(eventScheduleAtom);
  const { showToast } = useToast();

  const { isLoading, refetch } = useQuery(
    ['getSchedule', currentTime.year()],
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

  const createSchedule = () => {
    return useMutation(
      async (params: EventScheduleType) => {
        const result = await ScheduleApi.createSchedule(params);
        return result;
      },
      {
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          showToast({ type: ToastEnumType.Success, message: '성공적으로 등록되었습니다.' });
          refetch();
        },
      }
    );
  };

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
    createSchedule,
  };
};

export default useEventSchedule;
