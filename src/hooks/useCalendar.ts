import { useMemo } from 'react';
import moment, { Moment } from 'moment';
import { useRecoilState } from 'recoil';
import { DATE_FORMAT } from '@constants/format';
import { currentTimeAtom } from '@store/currentTime';

interface UseCalendarType {
  currentMonthWeeks: Moment[][];
  calendarTitleDate: string;
  dayOfWeek: string[];
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleTodayMonth: () => void;
  isSameDate: (date: Moment) => boolean;
  isSameMonth: (date: Moment) => boolean;
}

const useCalendar = (): UseCalendarType => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);

  const currentMonthWeeks = useMemo(() => {
    const startWeek = currentTime.clone().startOf('month').week();
    const endWeek = currentTime.clone().endOf('month').week();
    return Array.from({ length: Math.abs(endWeek - startWeek + 1) }, (_, week) =>
      Array.from({ length: 7 }, (_, i) =>
        currentTime
          .clone()
          .week(startWeek + week)
          .startOf('week')
          .add(i, 'day')
      )
    );
  }, [currentTime]);

  const calendarTitleDate = useMemo(() => {
    return currentTime.format(DATE_FORMAT.TITLE_FORMAT);
  }, [currentTime]);

  const isSameDate = (date: Moment) => {
    return date.format(DATE_FORMAT.BASIC_FORMAT) === moment().format(DATE_FORMAT.BASIC_FORMAT);
  };

  const isSameMonth = (date: Moment) => {
    return date.format(DATE_FORMAT.YEAR_MONTH_FORMAT) === currentTime.format(DATE_FORMAT.YEAR_MONTH_FORMAT);
  };

  const handleNextMonth = () => {
    const lastDayOfMonth = currentTime.endOf('month');
    const firstDayOfNextMonth = lastDayOfMonth.add(1, 'day').startOf('month');
    setCurrentTime(moment(firstDayOfNextMonth));
  };

  const handlePrevMonth = () => {
    const firstDayOfPrevMonth = currentTime.clone().subtract(1, 'month');
    setCurrentTime(moment(firstDayOfPrevMonth));
  };

  const handleTodayMonth = () => {
    setCurrentTime(moment());
  };

  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  return {
    currentMonthWeeks,
    calendarTitleDate,
    dayOfWeek,
    handlePrevMonth,
    handleNextMonth,
    handleTodayMonth,
    isSameDate,
    isSameMonth,
  };
};

export default useCalendar;
