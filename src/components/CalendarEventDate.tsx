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
        const { startDate, eventTitle, position, bgColor } = event;
        const paintType = getEventPaintType(event, calendarDate);
        if (paintType === EventPaintEnum.Empty) {
          return;
        }
        return (
          <EventDateBar key={index} paintType={paintType} topPosition={position} bgColor={bgColor}>
            {calendarDate === startDate ? eventTitle : ''}
          </EventDateBar>
        );
      })}
    </StyledEventList>
  );
};

export default CalendarEventDate;

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
    if (paintType === EventPaintEnum.Ing) {
      return '0';
    }
    return '0';
  }};

  &:hover {
    opacity: 0.8;
  }
`;
