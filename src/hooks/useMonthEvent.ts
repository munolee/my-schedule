import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import useHolidayListQuery from '@hooks/queries/useHolidayListQuery';
import useScheduleListQuery from '@hooks/queries/useScheduleListQuery';
import { EventScheduleType } from '@hooks/useEventSchedule';
import { currentTimeAtom } from '@store/currentTime';

interface TopPosition {
  position: number;
}

export type CurrentMonthEventType = EventScheduleType & TopPosition;
interface UseMonthEventType {
  isLoading: boolean;
  currentMonthEvent: CurrentMonthEventType[];
  currentDateMainlyEvent: EventScheduleType[];
  currentDateHolidayEvent: EventScheduleType[];
}

const useMonthEvent = (): UseMonthEventType => {
  const currentTime = useRecoilValue(currentTimeAtom);
  const { useGetHolidayList } = useHolidayListQuery();
  const { isLoading: isHolidayLoading, holidayList } = useGetHolidayList();
  const { useGetScheduleList } = useScheduleListQuery();
  const { isLoading: isScheduleLoading, scheduleList } = useGetScheduleList();

  const { query } = useRouter();

  const currentMonthEvent = useMemo(() => {
    const sortCurrentMonthEvent = [...holidayList, ...scheduleList]
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
  }, [currentTime, holidayList, scheduleList]);

  const currentDateMainlyEvent = useMemo(() => {
    const { date } = query;
    if (!date) return [];
    return currentMonthEvent.filter((event) => event.startDate <= date && event.endDate >= date && event.typeId !== 2);
  }, [query, currentMonthEvent]);

  const currentDateHolidayEvent = useMemo(() => {
    const { date } = query;
    if (!date) return [];
    return currentMonthEvent.filter((event) => event.startDate <= date && event.endDate >= date && event.typeId === 2);
  }, [query, currentMonthEvent]);

  return {
    isLoading: isHolidayLoading || isScheduleLoading,
    currentMonthEvent,
    currentDateMainlyEvent,
    currentDateHolidayEvent,
  };
};

export default useMonthEvent;
