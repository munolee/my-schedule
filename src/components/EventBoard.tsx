import { FC } from 'react';
import styled from '@emotion/styled';
import useEventSchedule from '@hooks/useEventSchedule';

const EventBoard: FC = () => {
  const { currentMonthEvent } = useEventSchedule();
  return (
    <StyledEventBoard>
      <EventBoardList>
        <BoardItem>
          <div>주요 일정</div>
          <BoardScheduleList>
            {currentMonthEvent.map((event, index) => (
              <BoardScheduleItem key={index} className={`event${index % 5}`}>
                <ScheduleEventCircle bgColor={event.bgColor} />
                <span>{event.eventTitle}</span>
              </BoardScheduleItem>
            ))}
          </BoardScheduleList>
        </BoardItem>
      </EventBoardList>
    </StyledEventBoard>
  );
};

export default EventBoard;

const StyledEventBoard = styled.div`
  margin: 4.8rem 0 0;
  padding: 0;
  display: inline-block;
  vertical-align: top;
`;

const EventBoardList = styled.div`
  display: inline;
`;

const BoardItem = styled.div`
  padding: 2rem 2rem 2.5rem 2.5rem;
  margin-bottom: 2rem;
  width: 20rem;
  max-height: 40rem;
  text-align: left;
  background-color: ${({ theme }) => theme.background};
  border-spacing: 0;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  span {
    font-size: ${({ theme }) => theme.fontSize.s14};
    color: ${({ theme }) => theme.fontColor};
  }
`;

const BoardScheduleList = styled.ul`
  max-height: 18rem;
  overflow-y: auto;
`;

const BoardScheduleItem = styled.li`
  margin-top: 1rem;
  vertical-align: middle;
`;

const ScheduleEventCircle = styled.div<{ bgColor: string }>`
  margin-right: 0.5rem;
  padding: 0;
  width: 1.2rem;
  height: 1.2rem;
  display: inline-block;
  border-radius: 5rem;
  background-color: ${({ bgColor }) => bgColor};
`;
