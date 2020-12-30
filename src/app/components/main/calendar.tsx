import React from "react";
import moment from "moment";
import "moment/locale/ko";
import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";

export interface CalendarProps {
}

export interface CalendarState {
    events: any[]
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    private curDate: any = moment(new Date());
    private date = new Date(2020, 11, 1);
    private array: any = {};

    constructor(props?: any) {
        super(props);
        this.state = {
            // 6 ~ 12
            events: [
                {
                    startDate: "2020-12-06",
                    endDate: "2020-12-07",
                    eventTitle: '일정1',
                },
                {
                    startDate: "2020-12-07",
                    endDate: "2020-12-09",
                    eventTitle: '일정2',
                },
                {
                    startDate: "2020-12-08",
                    endDate: "2020-12-15",
                    eventTitle: '일정3',
                },
                {
                    startDate: "2020-12-11",
                    endDate: "2020-12-13",
                    eventTitle: '일정4',
                },
                {
                    startDate: "2020-12-13",
                    endDate: "2020-12-16",
                    eventTitle: '일정5',
                },
                {
                    startDate: "2020-12-17",
                    endDate: "2020-12-19",
                    eventTitle: '일정5',
                },
                {
                    startDate: "2020-12-17",
                    endDate: "2020-12-18",
                    eventTitle: '일정6',
                },
                // {
                //     startDate: "2020-12-23",
                //     endDate: "2020-12-23",
                //     eventTitle: '일정7',
                // },
            ],
        };

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
                        <span onClick={() => this.handleTimeTable(date)}>{this.date.getDate()}</span>
                        <div className='event-list'>{this.renderCalendarEvent()}</div>
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
        // console.log(date)
        // console.log(Utils.convertDateToString(this.curDate));
        let className = '';
        let eventTitle = '';
        let eventArray = this.array;
        this.array = {};
        let cnt = 0;
        let tempData: any = {};

        events.map((event, idx) => {
            if (event.startDate === date) { // start
                this.array[idx] = idx;
            } else if (event.startDate <= date && event.endDate >= date) {
                tempData[idx] = idx;
            }
            html.push(<span key={Math.random()} className={"empty"}>empty</span>)
            return event;
        })

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
                    for (let i = idx - 1; i >= Object.keys(this.array).length; i--) {
                        if (idx !== 0 && !Utils.isEmpty(this.array[i])) {
                            position = this.array[i] + 1;
                            this.array[idx] = position;
                            break;
                        } else if (Utils.isEmpty(this.array[i])) {
                            position = 0;
                            this.array[idx] = position;
                        }
                    }
                    html[position] = <span key={idx} className={`${className} event${idx}`}>{idx}</span>;
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
                    html[position] = <span key={idx} className={`${className} event${idx}`}>{idx}</span>;
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
                    html[position] = <span key={idx} className={`${className} event${idx}`}>{idx}</span>;
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

    handleTimeTable = (date?: any) => {
        console.log(date);
        // history.push({
        //     pathname: `/table`,
        //     search: `date=${date}`,
        // });

    }

    render() {
        let tempDate = Utils.convertDateMonthToString(new Date());
        let preFlag = tempDate !== Utils.convertDateMonthToString(this.curDate);

        return (
            <div className="wrapper">
                <div className="date-wrap main">
                    <div className="select-date">
                        <span className={"pre " + (preFlag ? "" : "op")}
                              onClick={() => this.handleCalendar(preFlag ? "pre" : "pre")}>이전{" "}</span>
                        <h2 className="date">
                            {this.curDate === null ? "" : `${this.curDate.format('YYYY.MM')}`}
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
