import { FC } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import ArrowLeftSvg from '@assets/ArrowLeftSvg';
import ArrowRightSvg from '@assets/ArrowRightSvg';
import ButtonBase from '@components/common/ButtonBase';
import CreateModal from '@components/common/CreateModal';
import FlatIcon from '@components/common/FlatIcon';
import Spinner from '@components/common/Spinner';
import { DATE_FORMAT } from '@constants/format';
import useCalendar from '@hooks/useCalendar';
import useEventSchedule, { EventPaintEnum } from '@hooks/useEventSchedule';
import { ModalPropsType } from '@hooks/useModal';

interface CalendarProps {
  createScheduleModalProps: ModalPropsType;
}

const Calendar: FC<CalendarProps> = ({ createScheduleModalProps }) => {
  const {
    dayOfWeek,
    calendarTitleDate,
    currentMonthWeeks,
    handlePrevMonth,
    handleNextMonth,
    handleTodayMonth,
    isSameDate,
    isSameMonth,
  } = useCalendar();
  const { isLoading, currentMonthEvent, getEventPaintType, createSchedule } = useEventSchedule();
  const { fontColor, colors, calendarBackground, fontSize } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <StyledCalendar>
        <CalendarTopBar>
          <DateLabel>
            <h2>{calendarTitleDate}</h2>
          </DateLabel>
          <MonthButtonGroup>
            <ButtonBase
              onClick={handlePrevMonth}
              borderColor={colors.gray040}
              backgroundColor={calendarBackground}
              buttonStyle={{ padding: 0, borderRadius: '0.5rem 0 0 0.5rem' }}
            >
              <FlatIcon size={fontSize.s24} color={fontColor}>
                <ArrowLeftSvg />
              </FlatIcon>
            </ButtonBase>
            <ButtonBase
              onClick={handleTodayMonth}
              borderColor={colors.gray040}
              backgroundColor={calendarBackground}
              buttonStyle={{ borderRadius: '0' }}
            >
              <span>{t('common:today')}</span>
            </ButtonBase>
            <ButtonBase
              onClick={handleNextMonth}
              borderColor={colors.gray040}
              backgroundColor={calendarBackground}
              buttonStyle={{ padding: 0, borderRadius: '0 0.5rem 0.5rem 0' }}
            >
              <FlatIcon size={fontSize.s24} color={fontColor}>
                <ArrowRightSvg />
              </FlatIcon>
            </ButtonBase>
          </MonthButtonGroup>
        </CalendarTopBar>
        <CalendarTable>
          <thead>
            <tr>
              {dayOfWeek.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentMonthWeeks.map((week, i) => (
              <tr key={i}>
                {week.map((date, j) => (
                  <CalendarDate
                    key={j}
                    isToday={isSameDate(date)}
                    isEmpty={!isSameMonth(date)}
                    weekLength={currentMonthWeeks.length}
                    onClick={() => console.log('set')}
                  >
                    <DateText>{date.date()}</DateText>
                    <StyledEventList>
                      {currentMonthEvent.map((event, index) => {
                        const { startDate, eventTitle, position, bgColor } = event;
                        const calendarDate = date.format(DATE_FORMAT.BASIC_FORMAT);
                        const paintType = getEventPaintType(event, calendarDate);
                        if (paintType === EventPaintEnum.Empty) {
                          return;
                        }
                        return (
                          <EventDateBar key={index} paintType={paintType} topPosition={position} bgColor={bgColor}>
                            {calendarDate === startDate && eventTitle}
                          </EventDateBar>
                        );
                      })}
                    </StyledEventList>
                  </CalendarDate>
                ))}
              </tr>
            ))}
          </tbody>
        </CalendarTable>
        {isLoading && <Spinner />}
      </StyledCalendar>
      <CreateModal modalProps={createScheduleModalProps} mutateMethod={createSchedule} />
    </>
  );
};

export default Calendar;

const StyledCalendar = styled.div`
  position: relative;
  padding: 0 0.8rem;
`;

const CalendarTopBar = styled.div`
  margin-bottom: 1.6rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const DateLabel = styled.div`
  margin-left: 0.8rem;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.s16};
    font-weight: 500;
    color: ${({ theme }) => theme.fontColor};
  }
`;

const MonthButtonGroup = styled.div`
  margin-right: 0.8rem;
  display: flex;
  align-items: center;

  > button {
    height: 2.4rem;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.s14};
    color: ${({ theme }) => theme.fontColor};
  }
`;

const CalendarTable = styled.table`
  width: 100%;
  max-height: calc(100vh - 20.2rem);
  border-spacing: 0;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  border-bottom: ${({ theme }) => `solid 0.1rem ${theme.calendarBorder}`};
  background-color: ${({ theme }) => theme.calendarBackground};
  th {
    border-right: ${({ theme }) => `solid 0.1rem ${theme.calendarBorder}`};
    border-bottom: ${({ theme }) => `solid 0.1rem ${theme.calendarBorder}`};
  }

  &:last-of-type {
    th {
      border-right: none;
    }
  }

  th {
    padding: 1rem 0;
    font-size: ${({ theme }) => theme.fontSize.s14};
    color: ${({ theme }) => theme.fontColor};
    font-weight: 500;
    text-align: center;

    &:first-of-type {
      color: ${({ theme }) => theme.colors.red020};
    }
    &:last-of-type {
      color: ${({ theme }) => theme.colors.blue020};
    }
  }
`;

const CalendarDate = styled.td<{ isToday: boolean; isEmpty: boolean; weekLength: number }>`
  position: relative;
  width: 14.285%;
  height: ${({ weekLength }) => (weekLength > 5 ? '8.3rem' : '10rem')};
  font-size: ${({ theme }) => theme.fontSize.s12};
  font-weight: 500;
  color: ${({ isEmpty, theme }) => {
    if (isEmpty) {
      return theme.colors.gray060;
    }
    return theme.fontColor;
  }};
  text-align: right;
  background-color: ${({ isToday, theme }) => {
    if (isToday) {
      return theme.colors.green010;
    }
    return theme.calendarBackground;
  }};
  border-right: ${({ theme }) => `solid 0.1rem ${theme.calendarBorder}`};
  border-bottom: ${({ theme }) => `solid 0.1rem ${theme.calendarBorder}`};

  &:first-of-type {
    color: ${({ isEmpty, theme }) => {
      if (isEmpty) {
        return theme.colors.red030;
      }
      return theme.colors.red020;
    }};
  }

  &:last-of-type {
    color: ${({ isEmpty, theme }) => {
      if (isEmpty) {
        return theme.colors.blue030;
      }
      return theme.colors.blue020;
    }};
    border-right: none;
  }

  &:hover {
    background-color: ${({ isToday, theme }) => {
      if (isToday) {
        return theme.colors.green020;
      }
      return theme.hoverBackground;
    }};
  }
`;

const DateText = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
`;

const StyledEventList = styled.div`
  position: absolute;
  top: 2.4rem;
  width: 100%;
  min-height: 8rem;
`;

const EventDateBar = styled.span<{
  paintType: EventPaintEnum;
  topPosition: number;
  bgColor: string;
}>`
  margin-left: -0.1rem;
  position: absolute;
  top: ${({ topPosition }) => topPosition * 1.6}rem;
  width: calc(100% + 0.1rem);
  height: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.s10};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: ${({ paintType }) => {
    if (paintType === EventPaintEnum.StartDate) {
      return '10rem 0 0 10rem';
    }
    if (paintType === EventPaintEnum.OneDay) {
      return '10rem';
    }
    if (paintType === EventPaintEnum.EndDate) {
      return '0 10rem 10rem 0';
    }
    return '0';
  }};

  &:hover {
    opacity: 0.8;
  }
`;
