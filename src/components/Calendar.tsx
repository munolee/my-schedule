import { FC } from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import useCalendar from '@hooks/useCalendar';
import CalendarEventDate from '@components/CalendarEventDate';
import ButtonBase from '@components/common/ButtonBase';

const Calendar: FC = () => {
  const { dayOfWeek, dateLabel, currentMonthWeeks, handleNextMonth } = useCalendar();

  return (
    <StyledCalendar>
      <CalendarTopBar>
        <DateLabel>
          <h2>{dateLabel}</h2>
        </DateLabel>
        <MonthButtonGroup>
          <div className={'btn-pre'} onClick={handleNextMonth}>
            &lt;
          </div>
          <div className={'btn-current'} onClick={handleNextMonth}>
            오늘
          </div>
          <div className={'btn-next '} onClick={handleNextMonth}>
            &gt;
          </div>
        </MonthButtonGroup>
        <ButtonBase text="내 일정" textColor={'#ffffff'} backgroundColor={'#ff7272'} onClick={handleNextMonth} />
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
              {week.map((day, j) => {
                const isSameDate = day.format('D') === moment().format('D');
                const isSameMonth = day.format('MM') === moment().format('MM');
                let className = '';
                if (isSameDate) {
                  className = 'today';
                } else if (!isSameMonth) {
                  className = 'empty';
                }
                return (
                  <td key={j} className={className} onClick={() => console.log('set')}>
                    <span className={'calendar-date'}>{day.format('D')}</span>
                    <CalendarEventDate CalendarDate={day.format('YYYY-MM-DD')} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
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

  :first-child,
  :last-child {
    flex: 1;
  }
`;

const DateLabel = styled.div`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
`;

const MonthButtonGroup = styled.div`
  margin: auto;
  display: flex;
  align-items: center;

  div {
    font-size: 15px;
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ddd;
    background: #fff;

    :hover {
      background: rgba(0, 0, 0, 0.02);
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

  tr {
    height: 0;
    /*transition: .6s all;*/

    &.active {
      height: 450px;
      span {
        height: 30px !important;
        font-size: 15px;

        &.hide {
          display: flex !important;
        }
        &.more {
          display: none !important;
        }
      }
    }

    &.passive {
      opacity: 0;
      td {
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        border-bottom: none !important;

        div {
          min-height: inherit;
          height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
      }

      span {
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    }

    :first-of-type {
      border-bottom: solid 1px #f1f1f1;
      background-color: #ffffff;
      th {
        border-right: solid 1px #e9e9e9;
        border-bottom: solid 1px #e9e9e9;
      }
      :last-of-type {
        th {
          border-right: none;
        }
      }
    }
  }

  tr th:first-of-type,
  tr td:first-of-type {
    color: #ff7272;
  }

  tr th:last-of-type,
  tr td:last-of-type {
    color: #698bb8;
  }

  tr th {
    padding: 10px 0;
    font-size: 14px;
    color: #555;
    font-weight: 500;
    text-align: center;
  }

  td {
    width: 14.285%;
    height: 120px;
    position: relative;
    font-size: 12px;
    color: #4f4f4f;
    font-weight: 500;
    text-align: right;
    vertical-align: middle;
    border-right: solid 1px #e9e9e9;
    border-bottom: solid 1px #e9e9e9;
    background-color: #ffffff;
    /*transition: 1s all;*/

    :hover {
      background-color: #e9e9e9;
    }

    &.today {
      background-color: #cfe8e8;

      :hover {
        background-color: #cfe8df;
      }
    }
    &.empty {
      color: rgba(0, 0, 0, 0.3);
      background-color: #f2f0f4;

      :hover {
        background-color: #e9e9e9;
      }
    }
  }

  .calendar-date {
    padding: 5px;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;
