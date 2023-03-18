import { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useMutation, UseMutationResult } from 'react-query';
import { useRecoilValue } from 'recoil';
import { ScheduleApi } from '@api/schedule';
import { DATE_FORMAT } from '@constants/format';
import useToast, { ToastEnumType } from '@hooks/useToast';
import { currentMonthEventSelector } from '@store/eventSchedule';

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
  currentMonthEvent: CurrentMonthEventType[];
  currentDateMainlyEvent: EventScheduleType[];
  currentDateHolidayEvent: EventScheduleType[];
  getEventPaintType: (event: EventScheduleType, date: string) => EventPaintEnum;
  createSchedule: () => UseMutationResult<EventScheduleType, unknown, EventScheduleType>;
  handleClickDate: (date: string, callback: () => void) => void;
  boardDateTitle: string;
  initScheduleValues: EventScheduleType;
}

const useEventSchedule = (): UseEventScheduleType => {
  const currentMonthEvent = useRecoilValue(currentMonthEventSelector);

  const { query, replace } = useRouter();
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const { colors } = useTheme();

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
          // TODO 스케쥴 Get API Refetch 수정 사항
          // refetch();
        },
      }
    );
  };

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

  const boardDateTitle = useMemo(() => {
    return moment(query?.date).format(
      i18n.language === 'ko' ? DATE_FORMAT.MODAL_TITLE_FORMAT : DATE_FORMAT.MODAL_TITLE_FORMAT_EN
    );
  }, [query]);

  const handleClickDate = (date: string, callback: () => void) => {
    replace({
      pathname: '/',
      query: {
        date: date,
      },
    }).then(() => {
      callback();
    });
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

  const initScheduleValues = useMemo(() => {
    const { date, startDate, endDate, eventTitle, typeId, bgColor } = query as Record<string, string>;
    const initValues = {
      eventTitle: '',
      startDate: moment().format(DATE_FORMAT.BASIC_FORMAT),
      endDate: moment().format(DATE_FORMAT.BASIC_FORMAT),
      bgColor: colors.event1,
      typeId: 0,
    };
    if (date) {
      return { ...initValues, startDate: date, endDate: date };
    } else if (eventTitle) {
      return { eventTitle, startDate, endDate, bgColor, typeId: Number(typeId) };
    }
    return initValues;
  }, [query]);

  return {
    createSchedule,
    currentMonthEvent,
    currentDateMainlyEvent,
    currentDateHolidayEvent,
    boardDateTitle,
    getEventPaintType,
    handleClickDate,
    initScheduleValues,
  };
};

export default useEventSchedule;
