import { FC } from 'react';
import styled from '@emotion/styled';
import { convertDateToString } from '@utils/index';
import { eventType, schedule, userList } from '../api/mock';

type EventBoardProps = {};

const EventBoard: FC<EventBoardProps> = ({}) => {
  const currentDate = new Date(); // TODO 임시 데이트 객체

  return (
    <StyledEventBoard>
      <EventBoardList>
        <BoardItem>
          <span>주요 일정</span>
          <BoardScheduleList>
            {schedule.map((event, index) => {
              const { userId, typeId } = event;
              const curUser = userList.find((user) => user.userId === userId);
              const curEvent = eventType.find((event) => event.id === typeId);
              const userName = curUser?.userName || '';
              const eventName = curEvent?.type || '';

              // TODO 현재 달인지 구분 하는 소스, 수정 사항
              let currentStartDate = convertDateToString(currentDate);
              let currentEndDate = convertDateToString(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
              );
              if (
                (event.startDate >= currentStartDate && event.startDate <= currentEndDate) ||
                (event.endDate >= currentStartDate && event.endDate <= currentEndDate) ||
                (event.startDate < currentStartDate && event.endDate > currentEndDate)
              ) {
              }
              return (
                <BoardScheduleItem key={index} className={`event${index % 5}`}>
                  <ScheduleEventCircle />
                  <span>{userName}</span>
                </BoardScheduleItem>
              );
            })}
          </BoardScheduleList>
        </BoardItem>
        {/*<BoardItem>*/}
        {/*  <span className="event-list-title">연차</span>*/}
        {/*  <BoardScheduleList>{renderEventList('annualLeave')}</BoardScheduleList>*/}
        {/*</BoardItem>*/}
        {/*<BoardItem>*/}
        {/*  <span className="event-list-title">반차</span>*/}
        {/*  <BoardScheduleList>{renderEventList('halfDayLeave')}</BoardScheduleList>*/}
        {/*</BoardItem>*/}
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
  max-height: 205px;
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
  //background: #cfdd8e;
  //background: #eeb8b8;
  //background: #6eceda;
  //background: #b57fb3;
  //background: #f5ddad;
`;
