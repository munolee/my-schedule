import { FC } from 'react';
import styled from '@emotion/styled';
import useEventSchedule from '@hooks/useEventSchedule';

type CalendarEventDateProps = {
  CalendarDate: string;
};

const CalendarEventDate: FC<CalendarEventDateProps> = ({ CalendarDate }) => {
  const { eventSchedule, isCurrentMonthDate } = useEventSchedule();

  return (
    <StyledEventList>
      {eventSchedule.map((event, index) => {
        const { eventTitle, startDate, endDate } = event;
        if (!isCurrentMonthDate(startDate, endDate)) {
          return null;
        }
        let className = 'hide';
        if (CalendarDate === startDate) {
          if (startDate === endDate) {
            // if (index !== 0 && startDate === endDate) {
            className = 'start one-day';
          } else {
            className = 'start';
          }
        }
        if (CalendarDate === endDate) {
          className = 'end';
        }
        if (startDate < CalendarDate && endDate > CalendarDate) {
          className = 'ing';
        }
        return (
          <EventDateBar
            key={index}
            className={`${className} event${index % 5}`}
            // className={`${className} event${index % 5} ${index >= 4 ? 'hide' : ''}`}
            // onMouseEnter={(e) => handleCalendarHover(e, event, true)}
            // onMouseLeave={(e) => handleCalendarHover(e, event, false)}
          >
            {eventTitle}
            {/*{day.date() === 0 && currentTime.date() === 0 ? eventTitle : ''}*/}
          </EventDateBar>
        );
      })}
    </StyledEventList>
  );
};

export default CalendarEventDate;

const StyledEventList = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  min-height: 80px;

  span {
   
`;

const EventDateBar = styled.span`
  //position: absolute;
  //padding: 6px;
  //float: right;
  //top: 0;
  //bottom: 0;
  //left: 0;
  //right: 0;
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #111111;
  border-radius: 100%;
  cursor: default;
  //background-color:

  &:hover {
    opacity: 0.8;
  }

  &.start {
    position: relative;
    float: left;
    font-weight: 700;
    /*color: #fff;*/
    border-radius: 100px 0 0 100px;
    background: rgba(0, 183, 74, 1);
  }
  &.one-day {
    border-radius: 100px;
    padding: 5px 0;
  }
  &.end {
    position: relative;
    width: 100%;
    height: 16px;
    color: transparent;
    background-color: rgba(0, 183, 74, 1);
    border-radius: 0 100px 100px 0;
  }
  &.ing {
    position: relative;
    width: 100%;
    height: 16px;
    background-color: rgba(0, 183, 74, 1);
    border-radius: 0;
  }
  &.empty {
    position: relative;
    width: 100%;
    height: 16px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0;
  }
  &.more {
    position: relative;
    padding: 0;
    margin: 0;
    height: 5px;
  }
  &.hide {
    display: none;
  }
  &.event0 {
    background: #cfdd8e;
  }
  &.event1 {
    background: #eeb8b8;
  }
  &.event2 {
    background: #6eceda;
  }
  &.event3 {
    background: #b57fb3;
  }
  &.event4 {
    background: #f5ddad;
  }
`;
