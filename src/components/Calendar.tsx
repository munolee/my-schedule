import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE_FORMAT } from '@constants/format';
import useCalendar from '@hooks/useCalendar';
import useToolTip from '@hooks/useToolTip';
import CalendarEventDate from '@components/CalendarEventDate';
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
  const { showToolTip, hideToolTip } = useToolTip();

  return (
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
                  <CalendarEventDate calendarDate={date.format(DATE_FORMAT.BASIC_FORMAT)} />
                </CalendarDate>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
      {/*<ToolTipBase />*/}
    </StyledCalendar>
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
