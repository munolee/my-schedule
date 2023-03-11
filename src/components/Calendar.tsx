import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE_FORMAT } from '@constants/format';
import useCalendar from '@hooks/useCalendar';
import useEventSchedule, { EventPaintEnum } from '@hooks/useEventSchedule';
import useToolTip from '@hooks/useToolTip';
import { ModalPropsType } from '@hooks/useModal';
import CreateModal from '@components/common/CreateModal';
import Spinner from '@components/common/Spinner';

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
  const { showToolTip, hideToolTip } = useToolTip();

  return (
    <>
      <StyledCalendar>
        <CalendarTopBar>
          <DateLabel>
            <h2>{calendarTitleDate}</h2>
          </DateLabel>
          <MonthButtonGroup>
            <div className={'btn-pre'} onClick={handlePrevMonth}>
              &lt;
            </div>
            <div className={'btn-current'} onClick={handleTodayMonth}>
              {/*<div*/}
              {/*  className={'btn-current'}*/}
              {/*  onClick={() =>*/}
              {/*    mutateAsync({*/}
              {/*      startDate: '2023-03-08',*/}
              {/*      endDate: '2023-03-10',*/}
              {/*      eventTitle: '테스트 일정',*/}
              {/*      typeId: 1,*/}
              {/*      bgColor: '#cfdd8e',*/}
              {/*    })*/}
              {/*  }*/}
              {/*>*/}
              오늘
            </div>
            <div className={'btn-next'} onClick={handleNextMonth}>
              &gt;
            </div>
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
                    onClick={() => console.log('set')}
                    // onMouseMove={(e) => {
                    //   showToolTip({ positionX: e.clientX, positionY: e.clientY });
                    // }}
                    // onMouseLeave={hideToolTip}
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
        {/*<ToolTipBase />*/}
        {isLoading && <Spinner />}
      </StyledCalendar>
      <CreateModal modalProps={createScheduleModalProps} mutateMethod={createSchedule} />
    </>
  );
};

export default Calendar;

const StyledCalendar = styled.div`
  position: relative;
`;

const CalendarTopBar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.6rem;
`;

const DateLabel = styled.div`
  margin-left: 0.8rem;

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

const MonthButtonGroup = styled.div`
  margin-right: 0.8rem;
  display: flex;
  align-items: center;

  div {
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 0.1rem solid #dddddd;
    background-color: #ffffff;

    :hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  .btn-pre {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .btn-next {
    border-radius: 0 0.5rem 0.5rem 0;
  }
`;

const CalendarTable = styled.table`
  width: 100%;
  max-height: calc(100vh - 9.2rem);
  border-spacing: 0;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  background-color: #f2f0f4;
  overflow: hidden;

  &:first-of-type {
    border-bottom: solid 0.1rem #f1f1f1;
    background-color: #ffffff;
    th {
      border-right: solid 0.1rem #e9e9e9;
      border-bottom: solid 0.1rem #e9e9e9;
    }
  }

  &:last-of-type {
    th {
      border-right: none;
    }
  }

  th {
    padding: 1rem 0;
    font-size: 1.4rem;
    color: #555555;
    font-weight: 500;
    text-align: center;
  }

  th:first-of-type,
  td:first-of-type {
    color: #ff7272;
  }

  th:last-of-type,
  td:last-of-type {
    color: #698bb8;
  }
`;

const CalendarDate = styled.td<{ isToday: boolean; isEmpty: boolean }>`
  position: relative;
  width: 14.285%;
  height: 10rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ isEmpty }) => (isEmpty ? 'rgba(0, 0, 0, 0.3)' : '#4f4f4f')};
  text-align: right;
  background-color: ${({ isToday, isEmpty }) => {
    if (isToday) {
      return '#cfe8e8';
    } else if (isEmpty) {
      return '#f2f0f4';
    }
    return '#ffffff';
  }};
  border-right: solid 0.1rem #e9e9e9;
  border-bottom: solid 0.1rem #e9e9e9;

  &:last-of-type {
    border-right: none;
  }

  &:hover {
    background-color: ${({ isToday }) => {
      if (isToday) {
        return '#cfe8df';
      }
      return '#e9e9e9';
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

const EventDateBar = styled.span<{ paintType: EventPaintEnum; topPosition: number; bgColor: string }>`
  margin-left: -0.1rem;
  position: absolute;
  width: calc(100% + 0.1rem);
  top: ${({ topPosition }) => topPosition * 1.6}rem;
  height: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #000000;
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
