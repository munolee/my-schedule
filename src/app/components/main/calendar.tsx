import React from "react";
import moment from "moment";
import "moment/locale/ko";
import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";

export interface CalendarProps {
}

export interface CalendarState {
    events: any[]
    calendar: {
        lists: {
            all: any[];
            hospital: any[];
            local: any[];
        };
    };
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    private curDate: any = moment(new Date());
    private date = new Date(2020, 11, 1);
    private eventLength = 1;

    constructor(props?: any) {
        super(props);
        this.state = {
            events: [
                {
                    startDate: "2020-12-14",
                    endDate: "2020-12-18",
                    eventTitle: '휴가1',
                },
                {
                    startDate: "2020-12-05",
                    endDate: "2020-12-06",
                    eventTitle: '일정1',
                },
                {
                    startDate: "2020-12-06",
                    endDate: "2020-12-09",
                    eventTitle: '일정2',
                },
                {
                    startDate: "2020-12-18",
                    endDate: "2020-12-18",
                    eventTitle: '일정3',
                },
                {
                    startDate: "2020-12-06",
                    endDate: "2020-12-06",
                    eventTitle: '일정4',
                },
                // {
                //     startDate: "2020-12-06",
                //     endDate: "2020-12-06",
                //     eventTitle: '일정5',
                // },
            ],
            calendar: {
                lists: {
                    all: [],
                    hospital: [],
                    local: [],
                },
            },
        };
    }

    renderTestCalendar = () => {
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
                <tr key={Math.random()}>{this.renderTestCalendarDate(i)}</tr>
            );
        }
        return html;
    }
    renderTestCalendarDate = (week: number) => {
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
                        <div>{this.renderCalendarEvent()}</div>
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
    renderCalendarEvent = () => {
        const {events} = this.state;
        let html: any[] = [];
        let date = Utils.convertDateToString(this.date);
        let className = '';
        let eventTitle = '';
        // let eventLength = 0;
        let mt1 = {
            marginTop: "8px"
        }
        let mt2 = {
            marginTop: "24px"
        }

        events.map((event, idx) => {
            if (event.startDate === date) {
                eventTitle = event.eventTitle;
                className = 'start'
                html.push(
                    <span key={Math.random()} style={this.eventLength === 1 ? mt1 : mt2}
                          className={className}>{eventTitle}</span>
                )
            } else if (event.endDate === date) {
                className = 'end'
                html.push(
                    <span key={Math.random()} style={this.eventLength === 1 ? mt1 : mt2}
                          className={className}> </span>
                )
            } else if (event.startDate < date && event.endDate > date) {
                className = 'ing'
                html.push(
                    <span key={Math.random()} style={this.eventLength === 1 ? mt1 : mt2}
                          className={className}> </span>
                )
            }
            return event;
        });

        return html;
    }

    handleTestCalendar = (type: string) => {
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
            <span
                className={"pre " + (preFlag ? "" : "op")}
                onClick={() => this.handleTestCalendar(preFlag ? "pre" : "pre")}
            >
              이전{" "}
            </span>
                        <h2 className="date">
                            {this.date === null ? "" : `${this.date.getFullYear()}.${this.date.getMonth() + 1}`}
                        </h2>
                        <span
                            className={"next "}
                            onClick={() => this.handleTestCalendar("next")}
                        >
              다음
            </span>
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
                        {this.renderTestCalendar()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Calendar;
