import { useRecoilValue } from 'recoil';
import { currentTimeAtom } from '@store/currentTime';
import { Moment } from 'moment';

type UseCalendarType = {
  currentMonthWeeks: Moment[][];
  dayOfWeek: string[];
};

const useCalendar = (): UseCalendarType => {
  const currentTime = useRecoilValue(currentTimeAtom);

  const startWeek = currentTime.clone().startOf('month').week(); // 현재 월의 시작 주
  const endWeek = currentTime.clone().endOf('month').week(); // 현재 월의 마지막 주
  const currentMonthWeeks: Moment[][] = []; // 주마다 일자를 담는 배열
  for (let week = startWeek; week <= endWeek; week++) {
    currentMonthWeeks.push(
      Array(7)
        .fill(0)
        .map((n, i) => {
          const day = currentTime
            .clone()
            .week(week)
            .startOf('week')
            .add(n + i, 'day');
          return day;
        })
    );
  }

  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return {
    currentMonthWeeks,
    dayOfWeek,
  };
};

export default useCalendar;
