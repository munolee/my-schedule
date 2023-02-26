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
      {currentMonthEvent.map((event, index) => {
        const paintType = getEventPaintType(event, calendarDate);
        if (paintType === EventPaintEnum.Empty) {
          return;
        }
        return (
          <EventDateBar
            key={index}
            paintType={paintType}
            className={`${getEventPaintType(event, calendarDate)} event${index % 5}`}
            // className={`${className} event${index % 5} ${index >= 4 ? 'hide' : ''}`}
          >
            {calendarDate === event.startDate ? event.eventTitle : ''}
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
`;

const EventDateBar = styled.span<{ paintType: EventPaintEnum }>`
  position: relative;
  width: 100%;
  height: 16px;
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
