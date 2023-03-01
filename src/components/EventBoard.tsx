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
                <ScheduleEventCircle />
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
  display: inline-block;
  margin: 48px 0 0;
  padding: 0;
  vertical-align: top;
`;

const EventBoardList = styled.div`
  display: inline;
`;

const BoardItem = styled.div`
  padding: 20px 20px 25px 25px;
  width: 200px;
  max-height: 400px;
  margin-bottom: 20px;
  text-align: left;
  background-color: #ffffff;
  border-spacing: 0;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  span {
    font-size: 15px;
    color: #111111;
    //color: #999999;
  }
`;

const BoardScheduleList = styled.ul`
  max-height: 180px;
  overflow-y: auto;
`;

const BoardScheduleItem = styled.li`
  margin-top: 10px;
  vertical-align: middle;
`;

const ScheduleEventCircle = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  padding: 0;
  display: inline-block;
  border-radius: 50px;
  background-color: #ff7272;
  //background-color: #cfdd8e;
  //background-color: #eeb8b8;
  //background-color: #6eceda;
  //background-color: #b57fb3;
  //background-color: #f5ddad;
`;
