import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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
  currentDateEvent: EventScheduleType[];
  currentMonthEvent: CurrentMonthEventType[];
  getEventPaintType: (event: EventScheduleType, date: string) => EventPaintEnum;
  createSchedule: () => UseMutationResult<EventScheduleType, unknown, EventScheduleType, unknown>;
  handleClickDate: (date: string, callback: () => void) => void;
}

const useEventSchedule = (): UseEventScheduleType => {
  const currentTime = useRecoilValue(currentTimeAtom);
  const currentMonthEvent = useRecoilValue(currentMonthEventSelector);
  const setEventSchedule = useSetRecoilState(eventScheduleAtom);

  const { query, replace } = useRouter();
  const { t } = useTranslation();
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
          showToast({ type: ToastEnumType.Success, message: t('common:toastMessage.registeredSuccessfully') });
          refetch();
        },
      }
    );
  };

  const currentDateEvent = useMemo(() => {
    const { date } = query;
    if (!date) return [];

    return currentMonthEvent.filter((event) => event.startDate <= date && event.endDate >= date);
  }, [query, currentMonthEvent]);

  const handleClickDate = (date: string, callback: () => void) => {
    replace({
      pathname: '/',
      query: {
        date: date,
      },
    });
    callback();
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
    currentDateEvent,
    currentMonthEvent,
    getEventPaintType,
    createSchedule,
    handleClickDate,
  };
};

export default useEventSchedule;
