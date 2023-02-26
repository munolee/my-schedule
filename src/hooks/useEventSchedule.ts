import { useRecoilValue } from 'recoil';
import { currentTimeAtom } from '@store/currentTime';
import { eventScheduleAtom } from '@store/eventSchedule';
import { useCallback } from 'react';

export type eventScheduleType = {
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
};

type UseEventScheduleType = {
  eventSchedule: eventScheduleType[];
  isCurrentMonthEvent: (startDate: string, endDate: string) => boolean;
};

const useEventSchedule = (): UseEventScheduleType => {
  const eventSchedule = useRecoilValue(eventScheduleAtom);
  const currentTime = useRecoilValue(currentTimeAtom);

  // TODO 이번 달 이벤트만 내려주도록 Mocking 수정
  // 해당 이벤트가 이번 달에 속하는 지 반환
  const isCurrentMonthEvent = useCallback(
    (startDate: string, endDate: string) => {
      return currentTime.isSame(startDate, 'month') || currentTime.isSame(endDate, 'month');
    },
    [currentTime]
  );

  return {
    eventSchedule,
    isCurrentMonthEvent,
  };
};

export default useEventSchedule;
