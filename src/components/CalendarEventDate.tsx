import { FC } from 'react';
import styled from '@emotion/styled';
import useEventSchedule, { EventPaintEnum } from '@hooks/useEventSchedule';

type CalendarEventDateProps = {
  calendarDate: string;
};

const CalendarEventDate: FC<CalendarEventDateProps> = ({ calendarDate }) => {
  const { currentMonthEvent, getEventPaintType } = useEventSchedule();

  return (
    <StyledEventList>
      {currentMonthEvent.map((event, index) => (
        <EventDateBar key={index} paintType={getEventPaintType(event, calendarDate)} className={`event${index % 5}`}>
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

const EventDateBar = styled.span<{ paintType: EventPaintEnum }>`
  margin-left: -1px;
  position: relative;
  width: calc(100% + 1px);
  height: ${({ paintType }) => (paintType === EventPaintEnum.Empty ? '0' : '16')}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #000000;

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
    if (paintType === EventPaintEnum.Ing) {
      return '0';
    }
    return '0';
  }};

  &:hover {
    opacity: 0.8;
  }
  &.event0 {
    background-color: #cfdd8e;
  }
  &.event1 {
    background-color: #eeb8b8;
  }
  &.event2 {
    background-color: #6eceda;
  }
  &.event3 {
    background-color: #b57fb3;
  }
  &.event4 {
    background-color: #f5ddad;
  }
`;
