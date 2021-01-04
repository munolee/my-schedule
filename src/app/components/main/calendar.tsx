import React from "react";
import moment from "moment";
import "moment/locale/ko";
import {Link} from "react-router-dom";
import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";

export interface CalendarProps {
}

export interface CalendarState {
    events: any[]
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    private curDate: any = moment(new Date());
    private date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    private array: any = {};
    private weekData: any = {};

    constructor(props?: any) {
        super(props);
        this.state = {
            // 6 ~ 12
            events: [
                // {
                //     startDate: "2021-01-06",
                //     endDate: "2021-01-07",
                //     eventTitle: '일정1',
                // },
                // {
                //     startDate: "2021-01-07",
                //     endDate: "2021-01-09",
                //     eventTitle: '일정2',
                // },
                // {
                //     startDate: "2021-01-10",
                //     endDate: "2021-01-13",
                //     eventTitle: '일정3',
                // },
                // {
                //     startDate: "2021-01-11",
                //     endDate: "2021-01-13",
                //     eventTitle: '일정4',
                // },
                // {
                //     startDate: "2021-01-14",
                //     endDate: "2021-01-16",
                //     eventTitle: '일정5',
                // },
                // {
                //     startDate: "2021-01-14",
                //     endDate: "2021-01-15",
                //     eventTitle: '일정6',
                // },
                // {
                //     startDate: "2021-01-15",
                //     endDate: "2021-01-16",
                //     eventTitle: '일정7',
                // },
                // {
                //     startDate: "2021-01-15",
                //     endDate: "2021-01-16",
                //     eventTitle: '일정8',
                // },
                // {
                //     startDate: "2021-01-17",
                //     endDate: "2021-01-20",
                //     eventTitle: '일정9',
                // },
                // {
                //     startDate: "2021-01-18",
                //     endDate: "2021-01-20",
                //     eventTitle: '일정10',
                // },
                {
                    startDate: "2021-01-21",
                    endDate: "2021-01-23",
                    eventTitle: '일정11',
                },
                {
                    startDate: "2021-01-21",
                    endDate: "2021-01-23",
                    eventTitle: '일정12',
                },
                {
                    startDate: "2021-01-21",
                    endDate: "2021-01-23",
                    eventTitle: '일정13',
                },
                {
                    startDate: "2021-01-21",
                    endDate: "2021-01-23",
                    eventTitle: '일정14',
                },
                {
                    startDate: "2021-01-21",
                    endDate: "2021-01-23",
                    eventTitle: '일정15',
                },
                {
                    startDate: "2021-01-21",
                    endDate: "2021-01-23",
                    eventTitle: '일정16',
                },
                {
                    startDate: "2021-01-21",
                    endDate: "2021-01-23",
                    eventTitle: '일정17',
                },
                {
                    startDate: "2021-01-24",
                    endDate: "2021-01-26",
                    eventTitle: '일정18',
                },
                {
                    startDate: "2021-01-25",
                    endDate: "2021-01-27",
                    eventTitle: '일정19',
                },
            ],
        };

    }

    componentDidMount() {
    }

    componentDidUpdate() {
        let week = localStorage.getItem('currentWeek');
        if (!Utils.isEmpty(week)) {
            this.handleTimeTable(Number(week));
        }

        window.onpopstate = () => {
            let data = localStorage.getItem('currentState');
            if (data != null) {
                let jsonDate = JSON.parse(data);
                this.setState({
                    ...jsonDate
                }, () => {
                    const location: any = history.location;
                    const queryString = require("query-string");
                    const parsed = queryString.parse(location.search);
                    let week = parsed.page ? Number(parsed.page) - 1 : "back";
                    this.handleTimeTable(week);
                })
            }
        };
        // 새로고침시
    }

    renderCalendar = () => {
        // 년도
        let year = new Date(this.date).getFullYear();
        // 월  - 1월 : 0 부터 시작
        let month = new Date(this.date).getMonth();
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
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        return html;
    }

    renderCalendarDate = (week: number) => {
        let html: any[] = [];
        let year = new Date(this.date).getFullYear();
        let month = new Date(this.date).getMonth();
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
                let date = Utils.convertDateToString(this.date);
                if (date === Utils.convertDateToString(new Date())) {
                    className = 'today';
                }
                html.push(
                    <td key={Math.random()} className={className}>
                        <Link to={{
                            pathname: "/calendar",
                            search: `page=${week + 1}`,
                            state: {
                                state: this.state,
                                date: new Date(this.date.getFullYear(), this.date.getMonth(), 1)
                            },
                        }} onClick={() => this.handleSetTimeTable(week)}>
                            <span className={'calendar-date'}>{this.date.getDate()}</span>
                            <div className='event-list'>{this.renderCalendarEvent()}</div>
                        </Link>
                    </td>
                )
                if (this.date.getDate() !== lastDay) { // 마지막 일 전까지 date + 1
                    this.date.setDate(this.date.getDate() + 1);
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
        let date = Utils.convertDateToString(this.date);
        let className = '';
        let eventTitle = '';
        let eventArray = this.array;
        this.array = {};
        let tempData: any = {};
        let weekStartDate = date;
        let weekEndDate = date;

        if (this.date.getDay() === 0) { // 일요일일때 초기화
            this.weekData = {};
            weekStartDate = date;
            this.date.setDate(this.date.getDate() + 6);
            weekEndDate = Utils.convertDateToString(this.date);
            this.date.setDate(this.date.getDate() - 6);
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
                html.push(<span key={Math.random()} className={`empty ${cnt >= 4 ? "hide" : ""}`}></span>)
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

                    for (let i = Object.keys(this.array).length; i <= idx; i++) {
                        if (Utils.isEmpty(this.array[i - 1])) {
                            position = 0;
                            this.array[idx] = position;
                        } else {
                            position = this.array[i - 1] + 1;
                            this.array[idx] = position;
                        }
                    }
                    if (this.date.getDay() === 0) {
                        let i = 0;
                        for (let key in this.array) {
                            if (Number(key) === idx) {
                                position = i;
                                this.array[key] = i;
                            }
                            i++;
                        }
                    }
                    if (position === 5) {
                        html.push(<span key={Math.random()} className={'more'}>. . .</span>)
                    }
                    html[position] =
                        <span key={idx} className={`${className} event${idx % 5} ${position >= 4 ? "hide" : ""}`}
                              onMouseEnter={() => this.handleCalendarHover(`event${idx}`, true)}
                              onMouseLeave={() => this.handleCalendarHover(`event${idx}`, false)}>{eventTitle}</span>;
                } else if (event.endDate === date) {
                    className = 'end'
                    if (this.date.getDay() === 0) {
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
                              className={`${className} event${idx % 5} ${position >= 4 ? "hide" : ""} ${this.date.getDay() === 0 ? "show-title" : ""}`}>{eventTitle}</span>;
                } else if (event.startDate < date && event.endDate > date) {
                    className = 'ing'
                    if (this.date.getDay() === 0) {
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
                    html[position] = <span key={idx}
                                           className={`${className} event${idx % 5}  ${position >= 4 ? "hide" : ""}`}></span>;
                }
                return event;
            }
        )

        return html;
    }

    handleCalendar = (type: string) => {
        if (type === "pre") {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
        } else if (type === "next") {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
        } else return;

        this.setState({})
    }

    handleCalendarHover = (className: string, flag: boolean) => {
        let name = '.' + className;
        const el = document.querySelectorAll<HTMLElement>(name);

        // if (flag) {
        //     // let classColor = Number(className.split('event')[1]) % 5;
        //     for (let i = 0; i < el.length; i++) {
        //             el[i].style.opacity = '.8';
        //     }
        // } else {
        //     for (let i = 0; i < el.length; i++) {
        //         el[i].style.opacity = '1';
        //     }
        // }
    }

    handleSetTimeTable = (week: any) => {
        localStorage.setItem('currentWeek', week);
        localStorage.setItem('currentState', JSON.stringify(this.state));
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    }

    handleTimeTable = (week?: any) => {
        const selectWeek = document.querySelectorAll<HTMLElement>('.calendar tbody tr'); // 달력 week
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

        if (week === 'back') {
            for (let i = 0; i <= selectWeek.length; i++) {
                if (!Utils.isEmpty(selectWeek[i])) {
                    selectWeek[i].classList.remove('passive');
                    selectWeek[i].classList.remove('active');
                }
            }
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

    render() {
        let tempDate = Utils.convertDateMonthToString(new Date());
        let preFlag = tempDate !== Utils.convertDateMonthToString(this.curDate);

        return (
            <div className="wrapper">
                <div className="date-wrap main">
                    <div className="select-date">
                        <span className={"back"} onClick={() => Utils.handleHistoryBack()}>돌아가기</span>
                        <span className={"pre " + (preFlag ? "" : "op")}
                              onClick={() => this.handleCalendar(preFlag ? "pre" : "pre")}>이전{" "}</span>
                        <h2 className="date">
                            {this.curDate === null ? "" : `${this.date.getFullYear()}.${this.date.getMonth() + 1}`}
                        </h2>
                        <span className={"next "} onClick={() => this.handleCalendar("next")}>다음</span>
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
            </div>
        );
    }
}

export default Calendar;
