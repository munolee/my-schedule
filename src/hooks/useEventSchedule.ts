import { useRecoilValue } from 'recoil';
import { currentTimeAtom } from '@store/currentTime';
import { eventScheduleAtom } from '@store/eventSchedule';

export type eventScheduleType = {
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
};

type UseEventScheduleType = {
  eventSchedule: eventScheduleType[];
  isCurrentMonthDate: (startDate: string, endDate: string) => boolean;
};

const useEventSchedule = (): UseEventScheduleType => {
  const eventSchedule = useRecoilValue(eventScheduleAtom);
  const currentTime = useRecoilValue(currentTimeAtom);

  // 해당 이벤트가 이번 달에 속하는 지 반환
  const isCurrentMonthDate = (startDate: string, endDate: string) => {
    return currentTime.isSame(startDate, 'month') || currentTime.isSame(endDate, 'month');
  };

  return {
    eventSchedule,
    isCurrentMonthDate,
  };
};

export default useEventSchedule;
