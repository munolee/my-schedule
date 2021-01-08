import React from "react";
import {Link} from "react-router-dom";
import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";
import Header from "../common/header";
import moment from "moment";

export interface CalendarProps {
}

export interface CalendarState {
    events: any[],
    userList: any[],
    eventType: any[],
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    private currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    private array: any = {};
    private weekData: any = {};

    constructor(props?: any) {
        super(props);
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search);

        let currentYear = this.currentDate.getFullYear();
        let currentMonth: number | string = this.currentDate.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;

        if (!Utils.isEmpty(location.search)) {
            if (!Utils.isEmpty(parsed.date) && Utils.isEmpty(parsed.week)) {
                let year = parsed.date.slice(0, 4);
                let month = parsed.date.slice(4, 7);
                this.currentDate = new Date(Number(year), Number(month) - 1, 1);
            } else if (!Utils.isEmpty(parsed.date) && !Utils.isEmpty(parsed.week)) {
                let year = parsed.date.slice(0, 4);
                let month = parsed.date.slice(4, 7);
                this.currentDate = new Date(Number(year), Number(month) - 1, 1);
                if (Number(Utils.lastWeek(this.currentDate)) < Number(parsed.week)) {
                    history.push({
                        pathname: '/calendar',
                        search: `date=${String(parsed.date)}`,
                    })
                } else {
                    this.handleDetailTable(Number(parsed.week));
                    history.push({
                        pathname: '/calendar',
                        search: `date=${String(parsed.date)}&week=${Number(parsed.week)}`,
                    })
                    localStorage.setItem('currentWeek', parsed.week);
                }

            } else if (Utils.isEmpty(parsed.date) && Utils.isEmpty(parsed.week)) {
                history.push({
                    pathname: '/calendar',
                    search: `date=${String(currentYear) + String(currentMonth)}`,
                })
            }
        }
        this.state = {
            events: [],
            userList: [
                {
                    userId: 0,
                    userName: '사용자1',
                    userIcon: '/image/user_icon.png',
                },
                {
                    userId: 1,
                    userName: '사용자2',
                    userIcon: '/image/user_icon.png',
                },
                {
                    userId: 2,
                    userName: '사용자3',
                    userIcon: '/image/user_icon.png',
                }

            ],
            eventType: [
                {
                    id: 0,
                    name: 'important',
                },
                {
                    id: 1,
                    name: 'annual',
                },
                {
                    id: 2,
                    name: 'annual-half'
                }
            ],
        };
    }

    componentDidMount() {
        this.handleGetEvents();
    }

    componentDidUpdate() {
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search)

        let week = localStorage.getItem('currentWeek');
        if (!Utils.isEmpty(week) || !Utils.isEmpty(parsed.week)) {
            this.handleDetailTable(Number(week));
        }

        window.onpopstate = () => {
            localStorage.setItem('currentPage', 'calendar');
            let data = localStorage.getItem('currentState');
            if (data != null) {
                let jsonDate = JSON.parse(data);
                let year = parsed.date.slice(0, 4);
                let month = parsed.date.slice(4, 7);
                this.currentDate = new Date(Number(year), Number(month) - 1, 1);
                // this.handleGetEvents();
                this.setState({
                    ...jsonDate
                })
            }
            if (!Utils.isEmpty(parsed.week)) {
                this.handleDetailTable(Number(parsed.week));
            }

        };

    }

    handleGetEvents = () => {
        let tempList: any[] = [
            {
                startDate: "2021-01-04",
                endDate: "2021-01-05",
                eventTitle: '일정1',
                userId: 0,
                typeId: 0,
            },
            {
                startDate: "2021-01-05",
                endDate: "2021-01-07",
                eventTitle: '일정2',
                userId: 1,
                typeId: 1,
            },
            {
                startDate: "2021-01-10",
                endDate: "2021-01-13",
                eventTitle: '일정3',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2021-01-11",
                endDate: "2021-01-13",
                eventTitle: '일정4',
                userId: 2,
                typeId: 2,
            },
            {
                startDate: "2021-01-13",
                endDate: "2021-01-16",
                eventTitle: '일정5',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2021-01-14",
                endDate: "2021-01-15",
                eventTitle: '일정6',
                userId: 2,
                typeId: 1,
            },
            {
                startDate: "2021-01-21",
                endDate: "2021-01-21",
                eventTitle: '일정17',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2021-01-24",
                endDate: "2021-01-26",
                eventTitle: '일정18',
                userId: 1,
                typeId: 1,
            },
            {
                startDate: "2021-01-25",
                endDate: "2021-01-27",
                eventTitle: '일정19',
                userId: 0,
                typeId: 1,
            },
        ]
        let eventList: any[] = [
            {
                startDate: "2020-08-16",
                endDate: "2020-08-24",
                eventTitle: '일정1',
                userId: 0,
            },
            // {
            //     startDate: "2021-01-05",
            //     endDate: "2021-01-07",
            //     eventTitle: '일정2',
            //     userId: 1,
            // },
            {
                startDate: "2021-03-10",
                endDate: "2021-03-17",
                eventTitle: '일정3',
                userId: 0,
            },
            {
                startDate: "2021-04-11",
                endDate: "2021-04-13",
                eventTitle: '일정4',
                userId: 2,
            },
            {
                startDate: "2021-03-10",
                endDate: "2021-03-16",
                eventTitle: '일정5',
                userId: 0,
            },
            {
                startDate: "2021-02-14",
                endDate: "2021-02-15",
                eventTitle: '일정6',
                userId: 2,
            },
            // {
            //     startDate: "2020-12-21",
            //     endDate: "2020-12-21",
            //     eventTitle: '일정17',
            //     userId: 0,
            // },
            // {
            //     startDate: "2020-09-20",
            //     endDate: "2020-11-21",
            //     eventTitle: '일정20',
            //     userId: 0,
            // },
            {
                startDate: "2020-09-20",
                endDate: "2020-10-13",
                eventTitle: '일정21',
                userId: 0,
            },
            {
                startDate: "2020-09-20",
                endDate: "2020-10-10",
                eventTitle: '일정22',
                userId: 0,
            },
            {
                startDate: "2020-07-20",
                endDate: "2020-10-10",
                eventTitle: '일정23',
                userId: 0,
            },
            {
                startDate: "2020-06-20",
                endDate: "2020-10-10",
                eventTitle: '일정24',
                userId: 0,
            },
            {
                startDate: "2020-09-20",
                endDate: "2021-01-29",
                eventTitle: '일정19',
                userId: 0,
            },
            // {
            //     startDate: "2020-12-24",
            //     endDate: "2020-12-26",
            //     eventTitle: '일정18',
            //     userId: 1,
            // },
        ]

        eventList.sort(function (prev, next) {
            if (prev.startDate < next.startDate) {
                return -1;
            } else if (prev.startDate === next.startDate && prev.endDate < next.endDate) {
                return -1;
            }
            return 0;
        });

        this.setState({
            events: eventList,
        })

    }

    handleCalendar = (type: string) => {
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search);

        if (Utils.isEmpty(parsed.week) && parsed.week === undefined) { // 메인 캘린더
            if (type === "pre") {
                this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
            } else if (type === "next") {
                this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
            } else if (type === "today") {
                localStorage.removeItem('currentWeek');
                this.currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            } else return;

            localStorage.setItem('currentState', JSON.stringify(this.state));
            let currentYear = this.currentDate.getFullYear();
            let currentMonth: number | string = this.currentDate.getMonth() + 1;
            currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
            history.push({
                pathname: '/calendar',
                search: `date=${String(currentYear)}${String(currentMonth)}`
            })
        } else if (!Utils.isEmpty(parsed.week)) {
            if (type === "pre") {
                if (localStorage.getItem("currentWeek") === '0') {
                    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
                    let currentYear = this.currentDate.getFullYear();
                    let currentMonth: number | string = this.currentDate.getMonth() + 1;
                    currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
                    history.push({
                        pathname: '/calendar',
                        search: `date=${String(currentYear)}${String(currentMonth)}&week=${String(Utils.lastWeek(this.currentDate))}`
                    })
                    localStorage.setItem('currentWeek', String(Number(Utils.lastWeek(this.currentDate)) - 1));
                } else {
                    let currentYear = this.currentDate.getFullYear();
                    let currentMonth: number | string = this.currentDate.getMonth() + 1;
                    currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
                    history.push({
                        pathname: '/calendar',
                        search: `date=${String(currentYear)}${String(currentMonth)}&week=${String(Number(parsed.week) - 1)}`
                    })
                    localStorage.setItem('currentWeek', String(Number(parsed.week) - 1));
                }
            } else if (type === "next") {
                if (localStorage.getItem("currentWeek") === String(Number(Utils.lastWeek(this.currentDate)) - 1)) {
                    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
                    let currentYear = this.currentDate.getFullYear();
                    let currentMonth: number | string = this.currentDate.getMonth() + 1;
                    currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
                    history.push({
                        pathname: '/calendar',
                        search: `date=${String(currentYear)}${String(currentMonth)}&week=${'0'}`
                    })
                    localStorage.setItem('currentWeek', '0');
                } else {
                    let currentYear = this.currentDate.getFullYear();
                    let currentMonth: number | string = this.currentDate.getMonth() + 1;
                    currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
                    history.push({
                        pathname: '/calendar',
                        search: `date=${String(currentYear)}${String(currentMonth)}&week=${String(Number(parsed.week) + 1)}`
                    })
                    localStorage.setItem('currentWeek', String(Number(parsed.week) + 1));
                }
            } else if (type === "today") {
                this.currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                let currentYear = this.currentDate.getFullYear();
                let currentMonth: number | string = this.currentDate.getMonth() + 1;
                currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
                history.push({
                    pathname: '/calendar',
                    search: `date=${String(currentYear)}${String(currentMonth)}`
                })
            } else return;
        }
        this.setState({})
    }

    handleCalendarHover = (e: any, event: any, flag: boolean) => {
        const {userList, events} = this.state;
        let userName = '';
        let userIcon = '';
        const tooltip = document.querySelector<HTMLElement>(".event-tooltip")
        if (flag && e.target && tooltip !== null) {
            tooltip.className = 'event-tooltip active';
            tooltip.style.left = `${e.pageX + 30}px`;
            tooltip.style.top = `${e.pageY}px`;

            for (let i = 0; i < userList.length; i++) {
                if (Number(userList[i].userId) === event.userId) {
                    userName = userList[i].userName;
                    userIcon = userList[i].userIcon;
                }
            }
            // tooltip.childNodes[0] = (<div> </div>); //user icon
            tooltip.childNodes[1].textContent = `${userName}`
            tooltip.childNodes[2].textContent = `${event.eventTitle}`
            tooltip.childNodes[3].textContent = `${event.startDate} ~ ${event.endDate}`
        } else if (!flag && e.target && tooltip !== null) {
            tooltip.className = 'event-tooltip passive';
        }
    }

    handleSetDetailTable = (week: any) => {
        localStorage.setItem('currentWeek', week);
        localStorage.setItem('currentState', JSON.stringify(this.state));
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

    }

    handleDetailTable = (week?: any) => {
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search);
        const selectWeek = document.querySelectorAll<HTMLElement>('.calendar tbody tr'); // 달력 week
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

        if (!Utils.isEmpty(location.search) && !Utils.isEmpty(parsed.week)) {
            if (week === 'back') {
                // for (let i = 0; i <= selectWeek.length; i++) {
                //     if (!Utils.isEmpty(selectWeek[i])) {
                //         selectWeek[i].classList.remove('passive');
                //         selectWeek[i].classList.remove('active');
                //     }
                // }
                localStorage.removeItem('currentWeek');
            } else {
                for (let i = 0; i <= selectWeek.length; i++) {
                    if (!Utils.isEmpty(selectWeek[i])) {
                        if (week + 1 !== i && i !== 0) {
                            selectWeek[i].className = 'passive';
                        } else {
                            selectWeek[week + 1].className = 'active';
                        }
                    }
                }
            }
        }
    }

    handleGoToTimeTable = () => {
        let currentYear = this.currentDate.getFullYear();
        let currentMonth: number | string = this.currentDate.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
        let currentDate: number | string = new Date().getDate();
        currentDate = currentDate >= 10 ? currentDate : '0' + currentDate;
        localStorage.setItem('currentPage', 'table');
        history.push({
            pathname: "/table",
            search: `date=${String(currentYear)}${String(currentMonth)}${String(currentDate)}`,
        })
    }

    renderCalendar = () => {
        // 년도
        let year = new Date(this.currentDate).getFullYear();
        // 월  - 1월 : 0 부터 시작
        let month = new Date(this.currentDate).getMonth();
        // 달의 첫 1일 요일
        let firstDay = new Date(year, month, 1).getDay();
        // 달의 마지막 요일
        let lastDay = new Date(year, month, 0).getDate();
        // 마지막 주
        let lastWeek = Math.ceil((firstDay + lastDay) / 7);

        let html: any[] = [];

        for (let i = 0; i < lastWeek; i++) {
            html.push(
                <tr key={Math.random()}>{this.renderCalendarDate(i)}</tr>
            );
        }
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        return html;
    }

    renderCalendarDate = (week: number) => {
        let html: any[] = [];
        let year = new Date(this.currentDate).getFullYear();
        let month = new Date(this.currentDate).getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        let lastDay = new Date(year, month + 1, 0).getDate();
        let className = '';
        for (let i = 0; i < 7; i++) {
            className = '';
            if (week === 0 && i < firstDay) { // 0주차, 1일의 요일보다 작은日 공백
                html.push(
                    <td key={Math.random()} className='empty'>
                        <span/>
                    </td>
                );
            } else { // 1일부터 말일까지 그리기
                const location: any = history.location;
                const queryString = require("query-string");
                const parsed = queryString.parse(location.search);
                if (!Utils.isEmpty(location.search) && !Utils.isEmpty(parsed.date)) {
                    year = parsed.date.slice(0, 4);
                    month = parsed.date.slice(4, 6);
                }
                let date = Utils.convertDateToString(this.currentDate);
                if (date === Utils.convertDateToString(new Date())) {
                    className = 'today';
                }

                html.push(
                    <td key={Math.random()} className={className}>
                        <Link to={{
                            pathname: "/calendar",
                            search: `date=${String(year)}${String(month)}&week=${week}`,
                            state: {
                                state: this.state,
                                date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
                            },
                        }} onClick={() => this.handleSetDetailTable(week)}>
                            <span className={'calendar-date'}>{this.currentDate.getDate()}</span>
                            <div className='event-list'>{this.renderCalendarEvent()}</div>
                        </Link>
                    </td>
                )
                if (this.currentDate.getDate() !== lastDay) { // 마지막 일 전까지 date + 1
                    this.currentDate.setDate(this.currentDate.getDate() + 1);
                } else { // 마지막 일 break
                    break;
                }
            }
        }
        return html;
    }

    // event 일정 그리기
    renderCalendarEvent = () => {
        const {events} = this.state;
        let html: any[] = [];
        let date = Utils.convertDateToString(this.currentDate);
        let className = '';
        let eventTitle = '';
        let eventArray = this.array;

        this.array = {};
        let tempData: any = {};
        let weekStartDate = date;
        let weekEndDate = date;

        if (this.currentDate.getDay() === 0) { // 일요일일때 초기화
            this.weekData = {};
            weekStartDate = date;
            this.currentDate.setDate(this.currentDate.getDate() + 6);
            weekEndDate = Utils.convertDateToString(this.currentDate);
            this.currentDate.setDate(this.currentDate.getDate() - 6);
        }

        let cnt = 0;
        for (let i = 0; i < events.length; i++) {
            if (events[i].startDate === date) {
                this.array[i] = i;
            } else if (events[i].startDate <= date && events[i].endDate >= date) {
                tempData[i] = i;
            }
            if ((events[i].startDate >= weekStartDate && events[i].startDate <= weekEndDate) ||
                (events[i].endDate >= weekStartDate && events[i].endDate <= weekEndDate)) {
                this.weekData[i] = events[i];
            }
            if (!Utils.isEmpty(this.weekData[i])) {
                html.push(<span key={Math.random()} className={`empty ${cnt >= 4 ? "hide" : ""}`}> </span>)
                cnt++;
            }
        }

        events.map((event, idx) => {
                eventTitle = event.eventTitle;
                let position = this.array[idx];
                if (event.startDate === date) {
                    // 일정이 하루일 때
                    if (idx !== 0 && event.startDate === event.endDate) {
                        className = 'start one-day'
                    } else {
                        className = 'start'
                    }

                    position = Object.keys(this.array).indexOf(String(idx));
                    this.array[idx] = position;

                    // for (let i = Object.keys(this.array).length; i <= idx; i++) {
                    //     if (Utils.isEmpty(this.array[i - 1])) {
                    //         position = 0;
                    //         this.array[idx] = position;
                    //     } else {
                    //         position = this.array[i - 1] + 1;
                    //         this.array[idx] = position;
                    //     }
                    // }
                    if (this.currentDate.getDay() === 0) {
                        let i = 0;
                        for (let key in this.array) {
                            if (Number(key) === idx) {
                                position = i;
                                this.array[key] = i;
                            }
                            i++;
                        }
                    }
                    html[position] =
                        <span key={idx} className={`${className} event${idx % 5} ${position >= 4 ? "hide" : ""}`}
                              onMouseEnter={(e) => this.handleCalendarHover(e, event, true)}
                              onMouseLeave={(e) => this.handleCalendarHover(e, event, false)}>{eventTitle}</span>;
                } else if (event.endDate === date) {
                    className = 'end'
                    if (this.currentDate.getDay() === 0) {
                        let i = 0;
                        for (let key in tempData) {
                            if (Number(key) === idx) {
                                position = i;
                                this.array[key] = i;
                            }
                            i++;
                        }
                    } else {
                        position = eventArray[idx];
                        this.array[idx] = position;
                    }
                    html[position] =
                        <span key={idx}
                              className={`${className} event${idx % 5} ${position >= 4 ? "hide" : ""}`}
                              onMouseEnter={(e) => this.handleCalendarHover(e, event, true)}
                              onMouseLeave={(e) => this.handleCalendarHover(e, event, false)}>{this.currentDate.getDay() === 0 ? eventTitle : ""
                        }</span>;
                } else if (event.startDate < date && event.endDate > date) {
                    className = 'ing'
                    if (this.currentDate.getDay() === 0) {
                        let i = 0;
                        for (let key in tempData) {
                            if (Number(key) === idx) {
                                position = i;
                                this.array[key] = i;
                            }
                            i++;
                        }
                    } else {
                        position = eventArray[idx];
                        this.array[idx] = position;
                    }

                    html[position] =
                        <span key={idx}
                              className={`${className} event${idx % 5}  ${position >= 4 ? "hide" : ""}`}
                              onMouseEnter={(e) => this.handleCalendarHover(e, event, true)}
                              onMouseLeave={(e) => this.handleCalendarHover(e, event, false)}>{this.currentDate.getDay() === 0 ? eventTitle : ""}</span>;
                }
                if (position === 5) {
                    html.push(<span key={Math.random()} className={'more'}>. . .</span>)
                }
                return event;
            }
        )

        return html;
    }

    renderEventList = (type: string) => {
        const {events, userList, eventType} = this.state;
        let html: any[] = [];
        let userName: '';
        let eventName: '';

        events.map((event, idx) => {

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
                html.push(
                    <li key={Math.random()} className={`event${idx % 5}`}>
                        <span className="event-list-circle"> </span>
                        {event.eventTitle} ({userName})</li>
                )
            }
        })

        return html;

    }


    render() {
        let tempDate = Utils.convertDateMonthToString(new Date());
        let preFlag = tempDate !== Utils.convertDateMonthToString(this.currentDate);
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search);
        let year = this.currentDate.getFullYear();
        let month = this.currentDate.getMonth() + 1;
        if (location.search) {
            year = parsed.date.slice(0, 4);
            month = parsed.date.slice(4, 6);
        }
        return (
            <div className="wrapper">
                <Header/>
                <div className="event-wrap">
                    <div className="event-list">
                        <div className="event-important">주요 일정
                            <ul>{this.renderEventList('important')}</ul>
                        </div>
                        <div className="event-annual">연차
                            <ul>{this.renderEventList('annual')}</ul>
                        </div>
                        <div className="event-annual-half">반차
                            <ul>{this.renderEventList('annual-half')}</ul>
                        </div>
                    </div>
                </div>

                <div className="date-wrap main">
                    <div className="select-date">
                        <div className="date-label">
                            {
                                Utils.isEmpty(parsed.week) &&
                                <>
                                <span className="date-main">
                            <h2>
                                {parsed.date === null ? "" : `${Number(month)}월`}
                            </h2>
                            </span>
                                    <span className={"date-sub year"}>
                                <h4>
                            {parsed.date === null ? "" : `${year}년`}
                                </h4>
                                </span>
                                </>
                            }

                            {!Utils.isEmpty((parsed.week)) &&
                            <>
                                <span className="date-main">
                            <h2>
                                {parsed.date === null ? "" : `${Number(month)}월`}
                            </h2>
                            </span>
                                <span className={"date-sub"}>
                                <h4>
                            {parsed.date === null ? "" : `${year}년`}
                                </h4>
                                <h4>
                                {parsed.week === null ? "" : Number(parsed.week) + 1}주차
                                </h4>
                                </span>

                            </>
                            }
                        </div>
                        <span className={"pre " + (preFlag ? "" : "op")}
                              onClick={() => this.handleCalendar(preFlag ? "pre" : "pre")}>&lt;</span>
                        <span className={"current-month"} onClick={() => this.handleCalendar("today")}>오늘</span>

                        <span className={"next "} onClick={() => this.handleCalendar("next")}>&gt;</span>
                        <div className={"create-event-btn"} onClick={this.handleGoToTimeTable}>내 일정</div>
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
                        {this.renderCalendar()}
                        </tbody>
                    </table>
                </div>
                <div className={"event-tooltip"}>
                    <img src={'/image/user_icon.png'}/>
                    <span className={"event-user"}>이름</span>
                    <span className={"event-title"}> 내용</span>
                    <span className={"event-date"}>기간~기간</span>
                </div>
            </div>
        );
    }

}

export default Calendar;
