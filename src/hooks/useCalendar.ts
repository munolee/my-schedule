import { useCallback, useMemo } from 'react';
import moment, { Moment } from 'moment';
import { useTranslation } from 'next-i18next';
import { useRecoilState } from 'recoil';
import { DATE_FORMAT } from '@constants/format';
import { currentTimeAtom } from '@store/currentTime';

interface UseCalendarType {
  currentMonthWeeks: Moment[][];
  calendarTitleDate: string;
  handleClickMonth: (type: 'prev' | 'next' | 'today') => void;
  isSameDate: (date: Moment) => boolean;
  isSameMonth: (date: Moment) => boolean;
}

const useCalendar = (): UseCalendarType => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);
  const { i18n } = useTranslation('common');

  const currentMonthWeeks = useMemo(() => {
    const startWeek = currentTime.clone().startOf('month').week();
    let endWeek = currentTime.clone().endOf('month').week();
    if (endWeek < startWeek) {
      endWeek = currentTime.clone().endOf('month').subtract(1, 'week').week() + 1;
    }
    return Array.from({ length: endWeek - startWeek + 1 }, (_, week) =>
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
    return currentTime.format(i18n.language === 'ko' ? DATE_FORMAT.TITLE_FORMAT : DATE_FORMAT.TITLE_FORMAT_EN);
  }, [currentTime, i18n]);

  const handleClickMonth = useCallback(
    (type: 'prev' | 'next' | 'today') => {
      let currentMoment = moment();
      if (type === 'prev') {
        currentMoment = currentTime.clone().subtract(1, 'month');
      } else if (type === 'next') {
        const lastDayOfMonth = currentTime.endOf('month');
        currentMoment = lastDayOfMonth.add(1, 'day').startOf('month');
      }
      setCurrentTime(moment(currentMoment));
    },
    [currentTime, setCurrentTime]
  );

  const isSameDate = (date: Moment) => {
    return date.format(DATE_FORMAT.BASIC_FORMAT) === moment().format(DATE_FORMAT.BASIC_FORMAT);
  };

  const isSameMonth = (date: Moment) => {
    return date.format(DATE_FORMAT.YEAR_MONTH_FORMAT) === currentTime.format(DATE_FORMAT.YEAR_MONTH_FORMAT);
  };

  return {
    currentMonthWeeks,
    calendarTitleDate,
    handleClickMonth,
    isSameDate,
    isSameMonth,
  };
};

export default useCalendar;
