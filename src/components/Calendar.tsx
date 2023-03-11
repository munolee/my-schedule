import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE_FORMAT } from '@constants/format';
import useCalendar from '@hooks/useCalendar';
import useEventSchedule, { EventPaintEnum } from '@hooks/useEventSchedule';
import useModal from '@hooks/useModal';
import useToolTip from '@hooks/useToolTip';
import CreateModal from '@components/common/CreateModal';
import Spinner from '@components/common/Spinner';
import ButtonBase from '@components/common/ButtonBase';
import PlusSvg from '@assets/PlusSvg';
import NightSvg from '@assets/NightSvg';
import ToolTipBase from '@components/common/ToolTipBase';

const Calendar: FC = () => {
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
  const createScheduleModal = useModal();
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
        <ButtonGroup>
          <ButtonBase
            width={48}
            height={48}
            backgroundColor="#FF7272"
            buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}
            onClick={() => createScheduleModal.showModal()}
          >
            <PlusSvg width={48} height={48} />
          </ButtonBase>
          <ButtonBase
            width={48}
            height={48}
            backgroundColor="#FFFFFF"
            buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}
            onClick={() => console.log('new')}
          >
            <NightSvg width={34} height={34} bgColor="#111111" />
          </ButtonBase>
        </ButtonGroup>
        {isLoading && <Spinner />}
      </StyledCalendar>
      <CreateModal modalProps={createScheduleModal} mutateMethod={createSchedule} />
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
  margin-bottom: 16px;
`;

const DateLabel = styled.div`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
`;

const MonthButtonGroup = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;

  div {
    font-size: 15px;
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #dddddd;
    background-color: #ffffff;

    :hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  .btn-pre {
    border-radius: 5px 0 0 5px;
  }
  .btn-next {
    border-radius: 0 5px 5px 0;
  }
`;

const CalendarTable = styled.table`
  width: 600px;
  height: 80vh;
  border-spacing: 0;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  background-color: #f2f0f4;
  overflow: hidden;

  &:first-of-type {
    border-bottom: solid 1px #f1f1f1;
    background-color: #ffffff;
    th {
      border-right: solid 1px #e9e9e9;
      border-bottom: solid 1px #e9e9e9;
    }
  }

  &:last-of-type {
    th {
      border-right: none;
    }
  }

  th {
    padding: 10px 0;
    font-size: 14px;
    color: #555;
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
  height: 120px;
  font-size: 12px;
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
  border-right: solid 1px #e9e9e9;
  border-bottom: solid 1px #e9e9e9;

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
  top: 4px;
  right: 4px;
`;

const StyledEventList = styled.div`
  position: absolute;
  top: 24px;
  width: 100%;
  min-height: 80px;
`;

const EventDateBar = styled.span<{ paintType: EventPaintEnum; topPosition: number; bgColor: string }>`
  margin-left: -1px;
  position: absolute;
  width: calc(100% + 1px);
  top: ${({ topPosition }) => topPosition * 16}px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #000000;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: ${({ paintType }) => {
    if (paintType === EventPaintEnum.StartDate) {
      return '100px 0 0 100px';
    }
    if (paintType === EventPaintEnum.OneDay) {
      return '100px';
    }
    if (paintType === EventPaintEnum.EndDate) {
      return '0 100px 100px 0';
    }
    return '0';
  }};

  &:hover {
    opacity: 0.8;
  }
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: flex-end;
`;
