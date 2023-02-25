import { useRecoilState } from 'recoil';
import { currentTimeAtom } from '@store/currentTime';
import { Moment } from 'moment';
import { useEffect, useState } from 'react';

type UseCalendarType = {
  currentMonthWeeks: Moment[][];
  dateLabel: string;
  dayOfWeek: string[];
  handleNextMonth: () => void;
};

const useCalendar = (): UseCalendarType => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);
  const [currentMonthWeeks, setCurrentMonthWeeks] = useState<Moment[][]>([]); // 주마다 일자를 담는 배열

  useEffect(() => {
    console.log(currentTime);
    const startWeek = currentTime.clone().startOf('month').week();
    const endWeek = currentTime.clone().endOf('month').week();
    const currentWeeks = Array.from({ length: endWeek - startWeek + 1 }, (_, week) =>
      Array.from({ length: 7 }, (_, i) =>
        currentTime
          .clone()
          .week(startWeek + week)
          .startOf('week')
          .add(i, 'day')
      )
    );
    console.log(currentWeeks);
    setCurrentMonthWeeks(currentWeeks);
  }, [currentTime]);

  const handleNextMonth = () => {
    // 현재 달의 마지막 날짜를 가져옵니다.
    const lastDayOfMonth = currentTime.endOf('month');
    // 다음 달의 1일로 설정합니다.
    const firstDayOfNextMonth = lastDayOfMonth.add(1, 'day').startOf('month');
    // Date 객체로 변환하여 반환합니다.
    setCurrentTime(firstDayOfNextMonth);
  };

  const dateLabel = currentTime.format('YYYY년 MM월');
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  return {
    currentMonthWeeks,
    dateLabel,
    dayOfWeek,
    handleNextMonth,
  };
};

export default useCalendar;
