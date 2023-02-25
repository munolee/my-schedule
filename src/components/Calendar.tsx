import { FC } from 'react';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { weeks } from '@utils/index';
import ButtonBase from '@components/common/ButtonBase';
import useCalendar from '@hooks/useCalendar';
import CalendarEventDate from '@components/CalendarEventDate';

const Calendar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { dayOfWeek, currentMonthWeeks } = useCalendar();

  const queryParams: any = queryString.parse(location.search); // TODO 삭제 사항
  let currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // TODO 삭제 사항

  // 이전, 다음, 오늘 버튼 이벤트
  const handleCalendar = (type: string) => {
    if (isEmpty(queryParams.week) && queryParams.week === undefined) {
      // 메인 캘린더
      if (type === 'pre') {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      } else if (type === 'next') {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      } else if (type === 'today') {
        localStorage.removeItem('currentWeek');
        currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      } else return;

      let currentYear = currentDate.getFullYear();
      let currentMonth: number | string = currentDate.getMonth() + 1;
      currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
      navigate({
        pathname: '/calendar',
        search: `date=${String(currentYear)}${String(currentMonth)}`,
      });
    } else if (!isEmpty(queryParams.week)) {
      // 캘린더 상세 페이지
      if (type === 'pre') {
        if (localStorage.getItem('currentWeek') === '0') {
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
          navigate({
            pathname: '/calendar',
            search: `date=${String(currentYear)}${String(currentMonth)}&week=${String(
              weeks(currentDate.getFullYear(), currentDate.getMonth()) - 1
            )}`,
          });
          localStorage.setItem(
            'currentWeek',
            String(Number(weeks(currentDate.getFullYear(), currentDate.getMonth()) - 1))
          );
        } else {
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
          navigate({
            pathname: '/calendar',
            search: `date=${String(currentYear)}${String(currentMonth)}&week=${String(Number(queryParams.week) - 1)}`,
          });
          localStorage.setItem('currentWeek', String(Number(queryParams.week) - 1));
        }
      } else if (type === 'next') {
        if (
          Number(localStorage.getItem('currentWeek')) ===
          Number(weeks(currentDate.getFullYear(), currentDate.getMonth()) - 1)
        ) {
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
          navigate({
            pathname: '/calendar',
            search: `date=${String(currentYear)}${String(currentMonth)}&week=${'0'}`,
          });
          localStorage.setItem('currentWeek', '0');
        } else {
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
          navigate({
            pathname: '/calendar',
            search: `date=${String(currentYear)}${String(currentMonth)}&week=${String(Number(queryParams.week) + 1)}`,
          });
          localStorage.setItem('currentWeek', String(Number(queryParams.week) + 1));
        }
      } else if (type === 'today') {
        currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        let currentYear = currentDate.getFullYear();
        let currentMonth: number | string = currentDate.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
        navigate({
          pathname: '/calendar',
          search: `date=${String(currentYear)}${String(currentMonth)}`,
        });
      } else return;
    }
    // setState({})
  };

  // 일정 Hover 툴팁 띄우기
  const handleCalendarHover = (e: any, event: any, flag: boolean) => {
    let userName = '';
    let userIcon = '';
    const tooltip = document.querySelector<HTMLElement>('.event-tooltip');
    if (flag && e.target && tooltip !== null) {
      tooltip.className = 'event-tooltip active';
      tooltip.style.left = `${e.pageX + 30}px`;
      tooltip.style.top = `${e.pageY}px`;

      // for (let i = 0; i < userList.length; i++) {
      //   if (Number(userList[i].userId) === event.userId) {
      //     userName = userList[i].userName;
      //     userIcon = userList[i].userIcon;
      //   }
      // }
      // tooltip.childNodes[0] = (<div> </div>); //user icon
      tooltip.childNodes[1].textContent = `${userName}`;
      tooltip.childNodes[2].textContent = `${event.eventTitle}`;
      tooltip.childNodes[3].textContent = `${event.startDate} ~ ${event.endDate}`;
    } else if (!flag && tooltip !== null) {
      tooltip.className = 'event-tooltip passive';
    }
  };

  // TODO 메서드 수정 사항
  const handleSetDetailTable = (week: any) => {
    let year = new Date(currentDate).getFullYear();
    let month = new Date(currentDate).getMonth();
    // const location: any = history.location;
    // const queryString = require('query-string');
    // const queryParams = queryString.parse(location.search);
    if (!isEmpty(location.search) && !isEmpty(queryParams.date)) {
      year = queryParams.date.slice(0, 4);
      month = queryParams.date.slice(4, 6);
    }
    if (queryParams.week) {
      navigate({
        pathname: '/calendar',
        search: `date=${String(year)}${String(month)}`,
        // state: {
        //   //   state: this.state,
        //   date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        // },
      });
    } else {
      navigate({
        pathname: '/calendar',
        search: `date=${String(year)}${String(month)}&week=${week}`,
        // state: {
        //   //   state: this.state,
        //   date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        // },
      });
    }

    localStorage.setItem('currentWeek', week);
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  };

  // 내 일정 Route
  const handleGoToTimeTable = () => {
    let currentYear = currentDate.getFullYear();
    let currentMonth: number | string = currentDate.getMonth() + 1;
    currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
    let tempDate: number | string = new Date().getDate();
    tempDate = tempDate >= 10 ? tempDate : '0' + tempDate;
    localStorage.setItem('currentPage', 'table');
    navigate({
      pathname: '/table',
      search: `date=${String(currentYear)}${String(currentMonth)}${String(tempDate)}`,
    });
  };

  return (
    <>
      <StyledCalendar>
        <CalendarTopBar>
          {/*<div className="date-label">*/}
          {/*  {isEmpty(queryParams.week) && (*/}
          {/*    <>*/}
          {/*      <span className="date-main">*/}
          {/*        <h2>{queryParams.date === null ? '' : `${Number(queryParams.date.slice(4, 6))}월`}</h2>*/}
          {/*      </span>*/}
          {/*      <span className={'date-sub year'}>*/}
          {/*        <h4>{queryParams.date === null ? '' : `${queryParams.date.slice(0, 4)}년`}</h4>*/}
          {/*      </span>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*  {!isEmpty(queryParams.week) && (*/}
          {/*    <>*/}
          {/*      <span className="date-main">*/}
          {/*        <h2>{queryParams.date === null ? '' : `${Number(queryParams.date.slice(4, 6))}월`}</h2>*/}
          {/*      </span>*/}
          {/*      <span className={'date-sub'}>*/}
          {/*        <h4>{queryParams.date === null ? '' : `${queryParams.date.slice(0, 4)}년`}</h4>*/}
          {/*        <h4>{queryParams.week === null ? '' : Number(queryParams.week) + 1}주차</h4>*/}
          {/*      </span>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</div>*/}
          {/*<span*/}
          {/*  className={*/}
          {/*    'pre ' +*/}
          {/*    (convertDateMonthToString(new Date()) !== convertDateMonthToString(currentDate) ? '' : 'op')*/}
          {/*  }*/}
          {/*  onClick={() =>*/}
          {/*    handleCalendar(*/}
          {/*      convertDateMonthToString(new Date()) !== convertDateMonthToString(currentDate)*/}
          {/*        ? 'pre'*/}
          {/*        : 'pre'*/}
          {/*    )*/}
          {/*  }*/}
          {/*>*/}
          {/*  &lt;*/}
          {/*</span>*/}
          <span className={'current-month'} onClick={() => handleCalendar('today')}>
            오늘
          </span>
          <span className={'next '} onClick={() => handleCalendar('next')}>
            &gt;
          </span>
          <ButtonBase text="내 일정" onClick={handleGoToTimeTable} />
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
                    <td key={j} className={className} onClick={() => handleSetDetailTable(week)}>
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
    </>
  );
};

export default Calendar;

const StyledCalendar = styled.div`
  position: relative;
`;

const CalendarTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
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
