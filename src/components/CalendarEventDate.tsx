import { FC } from 'react';
import styled from '@emotion/styled';
import useEventSchedule from '@hooks/useEventSchedule';

type CalendarEventDateProps = {
  calendarDate: string;
};

const CalendarEventDate: FC<CalendarEventDateProps> = ({ calendarDate }) => {
  const { currentMonthEvent, getEventPaintType } = useEventSchedule();

  return (
    <StyledEventList>
      {currentMonthEvent.map((event, index) => (
        <EventDateBar
          key={index}
          className={`${getEventPaintType(event, calendarDate)} event${index % 5}`}
          // className={`${className} event${index % 5} ${index >= 4 ? 'hide' : ''}`}
        >
          {calendarDate === event.startDate ? event.eventTitle : ''}
        </EventDateBar>
      ))}
    </StyledEventList>
  );
};

export default CalendarEventDate;

const StyledEventList = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  min-height: 80px;
`;

const EventDateBar = styled.span`
  position: relative;
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #000000;
  border-radius: 100%;

  &:hover {
    opacity: 0.8;
  }
  &.start {
    border-radius: 100px 0 0 100px;
  }
  &.one-day {
    border-radius: 100px;
  }
  &.end {
    border-radius: 0 100px 100px 0;
  }
  &.ing {
    border-radius: 0;
  }
  //&.empty {
  //  background-color: rgba(0, 0, 0, 0);
  //  border-radius: 0;
  //}
  //&.more {
  //  padding: 0;
  //  margin: 0;
  //  height: 5px;
  //}
  &.empty {
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
