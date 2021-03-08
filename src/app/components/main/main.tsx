import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";
import Header from "../common/header";
import moment from "moment";

const Main = () => {
  const location: any = history.location;
  const queryString = require("query-string");
  const parsed = queryString.parse(location.search);
  let currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  let array: any = {};
  let weekData: any = {};

  const [events, setEvents] = useState<any>([]);
  const [userList, setUserList] = useState<any>([
    {
      userId: 0,
      userName: "사용자1",
      userIcon: "./image/user_icon.png",
    },
    {
      userId: 1,
      userName: "사용자2",
      userIcon: "./image/user_icon.png",
    },
    {
      userId: 2,
      userName: "사용자3",
      userIcon: "./image/user_icon.png",
    },
  ]);
  const [eventType, setEventType] = useState<any>([
    {
      id: 0,
      name: "important",
    },
    {
      id: 1,
      name: "annualLeave",
    },
    {
      id: 2,
      name: "halfDayLeave",
    },
  ]);

  useEffect(() => {
    let currentYear = currentDate.getFullYear();
    let currentMonth: number | string = currentDate.getMonth() + 1;
    currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;

    if (!Utils.isEmpty(location.search)) {
      if (!Utils.isEmpty(parsed.date) && Utils.isEmpty(parsed.week)) {
        // 캘린더 메인
        let year = parsed.date.slice(0, 4);
        let month = parsed.date.slice(4, 7);
        currentDate = new Date(Number(year), Number(month) - 1, 1);
      } else if (!Utils.isEmpty(parsed.date) && !Utils.isEmpty(parsed.week)) {
        // 캘린더 상세 (week)
        let year = parsed.date.slice(0, 4);
        let month = parsed.date.slice(4, 7);
        currentDate = new Date(Number(year), Number(month) - 1, 1);
        if (Number(Utils.lastWeek(currentDate)) < Number(parsed.week)) {
          history.push({
            pathname: "/calendar",
            search: `date=${String(parsed.date)}`,
          });
        } else {
          // handleDetailTable(Number(parsed.week));
          history.push({
            pathname: "/calendar",
            search: `date=${String(parsed.date)}&week=${Number(parsed.week)}`,
          });
          localStorage.setItem("currentWeek", parsed.week);
        }
      } else if (Utils.isEmpty(parsed.date) && Utils.isEmpty(parsed.week)) {
        history.push({
          pathname: "/calendar",
          search: `date=${String(currentYear) + String(currentMonth)}`,
        });
      }
    }
    handleGetEvents();
  }, []);

  useEffect(() => {
    let week = localStorage.getItem("currentWeek");
    if (!Utils.isEmpty(week) || !Utils.isEmpty(parsed.week)) {
      handleDetailTable(Number(week));
    }

    window.onpopstate = () => {
      localStorage.setItem("currentPage", "calendar");
      let data = localStorage.getItem("currentState");
      if (data != null) {
        let jsonDate = JSON.parse(data);
        let year = parsed.date.slice(0, 4);
        let month = parsed.date.slice(4, 7);
        currentDate = new Date(Number(year), Number(month) - 1, 1);
        // this.setState({
        //     ...jsonDate
        // })
      }
      if (!Utils.isEmpty(parsed.week)) {
        handleDetailTable(Number(parsed.week));
      }
    };
  });

  // 일정 Get API 호출 부분
  const handleGetEvents = () => {
    let eventList: any[] = [
      {
        startDate: "2021-01-04",
        endDate: "2021-01-05",
        eventTitle: "일정1",
        userId: 0,
        typeId: 0,
      },
      {
        startDate: "2021-02-05",
        endDate: "2021-02-07",
        eventTitle: "일정2",
        userId: 1,
        typeId: 1,
      },
      {
        startDate: "2021-01-10",
        endDate: "2021-01-13",
        eventTitle: "일정3",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2021-03-11",
        endDate: "2021-03-13",
        eventTitle: "일정4",
        userId: 2,
        typeId: 2,
      },
      {
        startDate: "2021-02-13",
        endDate: "2021-02-16",
        eventTitle: "일정5",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2021-01-14",
        endDate: "2021-01-15",
        eventTitle: "일정6",
        userId: 2,
        typeId: 1,
      },
      {
        startDate: "2021-01-21",
        endDate: "2021-01-21",
        eventTitle: "일정17",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2021-01-24",
        endDate: "2021-01-26",
        eventTitle: "일정18",
        userId: 1,
        typeId: 1,
      },
      {
        startDate: "2021-01-25",
        endDate: "2021-01-27",
        eventTitle: "일정19",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2020-08-16",
        endDate: "2020-08-24",
        eventTitle: "일정1",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2021-01-05",
        endDate: "2021-01-07",
        eventTitle: "일정2",
        userId: 1,
        typeId: 1,
      },
      {
        startDate: "2021-03-10",
        endDate: "2021-03-17",
        eventTitle: "일정3",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2021-04-11",
        endDate: "2021-04-13",
        eventTitle: "일정4",
        userId: 2,
        typeId: 1,
      },
      {
        startDate: "2021-03-10",
        endDate: "2021-03-16",
        eventTitle: "일정5",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2021-02-14",
        endDate: "2021-02-15",
        eventTitle: "일정6",
        userId: 2,
        typeId: 2,
      },
      {
        startDate: "2020-12-21",
        endDate: "2020-12-21",
        eventTitle: "일정17",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2020-09-20",
        endDate: "2020-11-21",
        eventTitle: "일정20",
        userId: 0,
        typeId: 1,
      },
      {
        startDate: "2020-09-20",
        endDate: "2020-10-13",
        eventTitle: "일정21",
        userId: 1,
        typeId: 1,
      },
      {
        startDate: "2020-09-20",
        endDate: "2020-10-10",
        eventTitle: "일정22",
        userId: 0,
        typeId: 2,
      },
      {
        startDate: "2020-07-20",
        endDate: "2020-10-10",
        eventTitle: "일정23",
        userId: 2,
        typeId: 1,
      },
      {
        startDate: "2020-06-20",
        endDate: "2020-10-10",
        eventTitle: "일정24",
        userId: 2,
        typeId: 0,
      },
      {
        startDate: "2020-09-20",
        endDate: "2020-10-29",
        eventTitle: "일정19",
        userId: 0,
        typeId: 0,
      },
      {
        startDate: "2020-12-24",
        endDate: "2020-12-26",
        eventTitle: "일정18",
        userId: 1,
        typeId: 1,
      },
    ];

    eventList.sort(function (prev, next) {
      if (prev.startDate < next.startDate) {
        return -1;
      } else if (
        prev.startDate === next.startDate &&
        prev.endDate < next.endDate
      ) {
        return -1;
      }
      return 0;
    });

    setEvents(eventList);
  };

  // 이전, 다음, 오늘 버튼 이벤트
  const handleCalendar = (type: string) => {
    const location: any = history.location;
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);

    if (Utils.isEmpty(parsed.week) && parsed.week === undefined) {
      // 메인 캘린더
      if (type === "pre") {
        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
      } else if (type === "next") {
        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1
        );
      } else if (type === "today") {
        localStorage.removeItem("currentWeek");
        currentDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
      } else return;

      //TODO
      //   localStorage.setItem("currentState", JSON.stringify(this.state));
      let currentYear = currentDate.getFullYear();
      let currentMonth: number | string = currentDate.getMonth() + 1;
      currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
      history.push({
        pathname: "/calendar",
        search: `date=${String(currentYear)}${String(currentMonth)}`,
      });
    } else if (!Utils.isEmpty(parsed.week)) {
      // 캘린더 상세 페이지
      if (type === "pre") {
        if (localStorage.getItem("currentWeek") === "0") {
          currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
          );
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
          history.push({
            pathname: "/calendar",
            search: `date=${String(currentYear)}${String(
              currentMonth
            )}&week=${String(
              Utils.weeks(currentDate.getFullYear(), currentDate.getMonth()) - 1
            )}`,
          });
          localStorage.setItem(
            "currentWeek",
            String(
              Number(
                Utils.weeks(currentDate.getFullYear(), currentDate.getMonth()) -
                  1
              )
            )
          );
        } else {
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
          history.push({
            pathname: "/calendar",
            search: `date=${String(currentYear)}${String(
              currentMonth
            )}&week=${String(Number(parsed.week) - 1)}`,
          });
          localStorage.setItem("currentWeek", String(Number(parsed.week) - 1));
        }
      } else if (type === "next") {
        if (
          Number(localStorage.getItem("currentWeek")) ===
          Number(
            Utils.weeks(currentDate.getFullYear(), currentDate.getMonth()) - 1
          )
        ) {
          currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
          );
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
          history.push({
            pathname: "/calendar",
            search: `date=${String(currentYear)}${String(
              currentMonth
            )}&week=${"0"}`,
          });
          localStorage.setItem("currentWeek", "0");
        } else {
          currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          let currentYear = currentDate.getFullYear();
          let currentMonth: number | string = currentDate.getMonth() + 1;
          currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
          history.push({
            pathname: "/calendar",
            search: `date=${String(currentYear)}${String(
              currentMonth
            )}&week=${String(Number(parsed.week) + 1)}`,
          });
          localStorage.setItem("currentWeek", String(Number(parsed.week) + 1));
        }
      } else if (type === "today") {
        currentDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
        let currentYear = currentDate.getFullYear();
        let currentMonth: number | string = currentDate.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
        history.push({
          pathname: "/calendar",
          search: `date=${String(currentYear)}${String(currentMonth)}`,
        });
      } else return;
    }
    // setState({})
  };

  // 일정 Hover 툴팁 띄우기
  const handleCalendarHover = (e: any, event: any, flag: boolean) => {
    let userName = "";
    let userIcon = "";
    const tooltip = document.querySelector<HTMLElement>(".event-tooltip");
    if (flag && e.target && tooltip !== null) {
      tooltip.className = "event-tooltip active";
      tooltip.style.left = `${e.pageX + 30}px`;
      tooltip.style.top = `${e.pageY}px`;

      for (let i = 0; i < userList.length; i++) {
        if (Number(userList[i].userId) === event.userId) {
          userName = userList[i].userName;
          userIcon = userList[i].userIcon;
        }
      }
      // tooltip.childNodes[0] = (<div> </div>); //user icon
      tooltip.childNodes[1].textContent = `${userName}`;
      tooltip.childNodes[2].textContent = `${event.eventTitle}`;
      tooltip.childNodes[3].textContent = `${event.startDate} ~ ${event.endDate}`;
    } else if (!flag && tooltip !== null) {
      tooltip.className = "event-tooltip passive";
    }
  };

  const handleSetDetailTable = (week: any) => {
    let year = new Date(currentDate).getFullYear();
    let month = new Date(currentDate).getMonth();
    const location: any = history.location;
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);
    if (!Utils.isEmpty(location.search) && !Utils.isEmpty(parsed.date)) {
      year = parsed.date.slice(0, 4);
      month = parsed.date.slice(4, 6);
    }
    if (parsed.week) {
      history.push({
        pathname: "/calendar",
        search: `date=${String(year)}${String(month)}`,
        state: {
          //   state: this.state,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        },
      });
    } else {
      history.push({
        pathname: "/calendar",
        search: `date=${String(year)}${String(month)}&week=${week}`,
        state: {
          //   state: this.state,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        },
      });
    }

    localStorage.setItem("currentWeek", week);
    // localStorage.setItem("currentState", JSON.stringify(state));
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
  };

  const handleDetailTable = (week?: any) => {
    const location: any = history.location;
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);
    const selectWeek = document.querySelectorAll<HTMLElement>(
      ".calendar tbody tr"
    ); // 달력 week
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    handleCalendarHover("", "", false); // tooltip 초기화
    if (!Utils.isEmpty(location.search) && !Utils.isEmpty(parsed.week)) {
      if (week === "back") {
        // for (let i = 0; i <= selectWeek.length; i++) {
        //     if (!Utils.isEmpty(selectWeek[i])) {
        //         selectWeek[i].classList.remove('passive');
        //         selectWeek[i].classList.remove('active');
        //     }
        // }
        localStorage.removeItem("currentWeek");
      } else {
        for (let i = 0; i <= selectWeek.length; i++) {
          if (!Utils.isEmpty(selectWeek[i])) {
            if (week + 1 !== i && i !== 0) {
              selectWeek[i].className = "passive";
            } else if (selectWeek[week + 1] !== undefined) {
              selectWeek[week + 1].className = "active";
            }
          }
        }
      }
    }
  };

  // 내 일정 Route
  const handleGoToTimeTable = () => {
    let currentYear = currentDate.getFullYear();
    let currentMonth: number | string = currentDate.getMonth() + 1;
    currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
    let tempDate: number | string = new Date().getDate();
    tempDate = tempDate >= 10 ? tempDate : "0" + tempDate;
    localStorage.setItem("currentPage", "table");
    history.push({
      pathname: "/table",
      search: `date=${String(currentYear)}${String(currentMonth)}${String(
        tempDate
      )}`,
    });
  };

  // 달력 주 단위 그리기
  const renderCalendar = () => {
    // 년도
    let year = new Date(currentDate).getFullYear();
    // 월  - 1월 : 0 부터 시작
    let month = new Date(currentDate).getMonth();
    // 달의 첫 1일 요일
    let firstDay = new Date(year, month, 1).getDay();
    // 달의 마지막 일
    let lastDay = new Date(year, month + 1, 0).getDate();
    // 마지막 주
    let lastWeek = Math.ceil((firstDay + lastDay) / 7);

    let curDate = new Date(year, month, 1);

    currentDate.setDate(currentDate.getDate() - firstDay);

    let html: any[] = [];

    for (let i = 0; i < lastWeek; i++) {
      html.push(
        <tr key={Math.random()}>
          {renderCalendarDate(i, Utils.convertDateMonthToString(curDate))}
        </tr>
      );
    }
    currentDate = new Date(year, month, 1);
    return html;
  };

  // 달력 일 단위 그리기
  const renderCalendarDate = (week: number, curDate: string) => {
    let html: any[] = [];
    let year = new Date(currentDate).getFullYear();
    let month = new Date(currentDate).getMonth();
    let firstDay = new Date(year, month + 1, 1).getDay();
    let lastDay = new Date(year, month + 1, 0).getDate();
    let className = "";

    for (let i = 0; i < 7; i++) {
      className = "";
      let date = Utils.convertDateToString(currentDate);
      if (date === Utils.convertDateToString(new Date())) {
        className = "today";
      } else if (Utils.convertDateMonthToString(currentDate) !== curDate) {
        className = "empty";
      }

      html.push(
        <td
          key={Math.random()}
          className={className}
          onClick={() => handleSetDetailTable(week)}
        >
          <span className={"calendar-date"}>{currentDate.getDate()}</span>
          <div className="event-list">{renderCalendarEvent(week)}</div>
        </td>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return html;
  };

  // 달력 일정(events) 그리기
  const renderCalendarEvent = (week: number) => {
    let html: any[] = [];
    let date = Utils.convertDateToString(currentDate);
    let className = "";
    let eventTitle = "";
    let eventArray = array;
    array = {};
    let tempData: any = {};
    let weekStartDate = date;
    let weekEndDate = date;

    if (currentDate.getDay() === 0) {
      // 일요일일때 초기화
      weekData = {};
      weekStartDate = date;
      currentDate.setDate(currentDate.getDate() + 6);
      weekEndDate = Utils.convertDateToString(currentDate);
      currentDate.setDate(currentDate.getDate() - 6);
    }

    let cnt = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].startDate === date) {
        array[i] = i;
      } else if (events[i].startDate <= date && events[i].endDate >= date) {
        tempData[i] = i;
      }
      if (
        (events[i].startDate >= weekStartDate &&
          events[i].startDate <= weekEndDate) ||
        (events[i].endDate >= weekStartDate && events[i].endDate <= weekEndDate)
      ) {
        weekData[i] = events[i];
      }
      if (!Utils.isEmpty(weekData[i])) {
        html.push(
          <span
            key={Math.random()}
            className={`empty ${cnt >= 4 ? "hide" : ""}`}
          >
            {" "}
          </span>
        );
        cnt++;
      }
    }

    events.map((event: any, idx: number) => {
      eventTitle = event.eventTitle;
      let position = array[idx];
      if (event.startDate === date) {
        // 일정 시작
        // 일정이 하루일 때
        if (idx !== 0 && event.startDate === event.endDate) {
          className = "start one-day";
        } else {
          className = "start";
        }

        position = Object.keys(array).indexOf(String(idx));
        array[idx] = position;

        if (currentDate.getDay() === 0) {
          let i = 0;
          for (let key in array) {
            if (Number(key) === idx) {
              position = i;
              array[key] = i;
            }
            i++;
          }
        }
        html[position] = (
          <span
            key={idx}
            className={`${className} event${idx % 5} ${
              position >= 4 ? "hide" : ""
            }`}
            onMouseEnter={e => handleCalendarHover(e, event, true)}
            onMouseLeave={e => handleCalendarHover(e, event, false)}
          >
            {eventTitle}
          </span>
        );
      } else if (event.endDate === date) {
        // 일정 끝
        className = "end";
        if (currentDate.getDay() === 0) {
          let i = 0;
          for (let key in tempData) {
            if (Number(key) === idx) {
              position = i;
              array[key] = i;
            }
            i++;
          }
        } else {
          position = eventArray[idx];
          array[idx] = position;
        }
        html[position] = (
          <span
            key={idx}
            className={`${className} event${idx % 5} ${
              position >= 4 ? "hide" : ""
            }`}
            onMouseEnter={e => handleCalendarHover(e, event, true)}
            onMouseLeave={e => handleCalendarHover(e, event, false)}
          >
            {week === 0 && currentDate.getDay() === 0 ? eventTitle : ""}
          </span>
        );
      } else if (event.startDate < date && event.endDate > date) {
        // 일정 진행중
        className = "ing";
        if (currentDate.getDay() === 0) {
          let i = 0;
          for (let key in tempData) {
            if (Number(key) === idx) {
              position = i;
              array[key] = i;
            }
            i++;
          }
        } else {
          position = eventArray[idx];
          array[idx] = position;
        }
        html[position] = (
          <span
            key={idx}
            className={`${className} event${idx % 5}  ${
              position >= 4 ? "hide" : ""
            }`}
            onMouseEnter={e => handleCalendarHover(e, event, true)}
            onMouseLeave={e => handleCalendarHover(e, event, false)}
          >
            {week === 0 && currentDate.getDay() === 0 ? eventTitle : ""}
          </span>
        );
      }
      if (position !== undefined && position === 4) {
        html[position] = (
          <span key={Math.random()} className={"more"}>
            . . .
          </span>
        );
      }
      return event;
    });

    return html;
  };

  // 일정 목록 그리기
  const renderEventList = (type: string) => {
    let html: any[] = [];
    let userName = "";
    let eventName = "";
    let count = 0;

    events.map((event: any, idx: number) => {
      for (let i = 0; i < userList.length; i++) {
        if (Number(userList[i].userId) === event.userId) {
          userName = userList[i].userName;
        }
      }
      for (let i = 0; i < eventType.length; i++) {
        if (Number(eventType[i].id) === event.typeId) {
          eventName = eventType[i].name;
        }
      }
      if (type === eventName) {
        let currentStartDate = Utils.convertDateToString(currentDate);
        let currentEndDate = Utils.convertDateToString(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        );
        if (
          (event.startDate >= currentStartDate &&
            event.startDate <= currentEndDate) ||
          (event.endDate >= currentStartDate &&
            event.endDate <= currentEndDate) ||
          (event.startDate < currentStartDate && event.endDate > currentEndDate)
        ) {
          html.push(
            <li key={Math.random()} className={`event${idx % 5}`}>
              <span className="event-list-circle"> </span>
              <span>{`${
                type === "important"
                  ? event.eventTitle + " (" + userName + ")"
                  : userName
              }`}</span>
            </li>
          );
          count++;
        }
      }
    });
    if (count === 0) {
      html.push(
        <li key={Math.random()}>
          <span className="event-list-empty"> - </span>
        </li>
      );
    }
    return html;
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="event-wrap">
        <div className="event-list">
          <div className="event-important">
            <span className="event-list-title">주요 일정</span>
            <ul>{renderEventList("important")}</ul>
          </div>
          <div className="event-annual">
            <span className="event-list-title">연차</span>
            <ul>{renderEventList("annualLeave")}</ul>
          </div>
          <div className="event-annual-half">
            <span className="event-list-title">반차</span>
            <ul>{renderEventList("halfDayLeave")}</ul>
          </div>
        </div>
      </div>

      <div className="date-wrap main">
        <div className="select-date">
          <div className="date-label">
            {Utils.isEmpty(parsed.week) && (
              <>
                <span className="date-main">
                  <h2>
                    {parsed.date === null
                      ? ""
                      : `${Number(parsed.date.slice(4, 6))}월`}
                  </h2>
                </span>
                <span className={"date-sub year"}>
                  <h4>
                    {parsed.date === null ? "" : `${parsed.date.slice(0, 4)}년`}
                  </h4>
                </span>
              </>
            )}

            {!Utils.isEmpty(parsed.week) && (
              <>
                <span className="date-main">
                  <h2>
                    {parsed.date === null
                      ? ""
                      : `${Number(parsed.date.slice(4, 6))}월`}
                  </h2>
                </span>
                <span className={"date-sub"}>
                  <h4>
                    {parsed.date === null ? "" : `${parsed.date.slice(0, 4)}년`}
                  </h4>
                  <h4>
                    {parsed.week === null ? "" : Number(parsed.week) + 1}주차
                  </h4>
                </span>
              </>
            )}
          </div>
          <span
            className={
              "pre " +
              (Utils.convertDateMonthToString(new Date()) !==
              Utils.convertDateMonthToString(currentDate)
                ? ""
                : "op")
            }
            onClick={() =>
              handleCalendar(
                Utils.convertDateMonthToString(new Date()) !==
                  Utils.convertDateMonthToString(currentDate)
                  ? "pre"
                  : "pre"
              )
            }
          >
            &lt;
          </span>
          <span
            className={"current-month"}
            onClick={() => handleCalendar("today")}
          >
            오늘
          </span>
          <span className={"next "} onClick={() => handleCalendar("next")}>
            &gt;
          </span>
          <div className={"create-event-btn"} onClick={handleGoToTimeTable}>
            내 일정
          </div>
        </div>
        <table className="calendar main">
          <tbody>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
            {renderCalendar()}
          </tbody>
        </table>
      </div>
      <div className={"event-tooltip"}>
        <img src={"/image/user_icon.png"} />
        <span className={"event-user"}>이름</span>
        <span className={"event-title"}> 내용</span>
        <span className={"event-date"}>기간~기간</span>
      </div>
    </div>
  );
};

export default Main;
