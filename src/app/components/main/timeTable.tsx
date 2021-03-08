import React from "react";
import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";
import Header from "../common/header";


export interface TimeTableProps {
}

export interface TimeTableState {
    weekDate: any[],
    events: any[],
    firstDate: string,
    lastDate: string,
}

export class TimeTable extends React.Component<TimeTableProps, TimeTableState> {
    private currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()); // 로컬 스토리지

    constructor(props?: any) {
        super(props);
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search);

        if (!Utils.isEmpty(location.search) && !Utils.isEmpty(parsed.date)) {
            let year = parsed.date.slice(0, 4);
            let month = parsed.date.slice(4, 6);
            let date = parsed.date.slice(6, 8);
            this.currentDate = new Date(year, month - 1, date);
        }

        this.state = {
            weekDate: [],
            events: [
                {
                    startDate: "2020-12-14",
                    endDate: "2020-12-18",
                    eventTitle: '일정1',
                },
                {
                    startDate: "2020-12-05",
                    endDate: "2020-12-06",
                    eventTitle: '휴가1',
                },
            ],
            firstDate: '',
            lastDate: '',

        }
    }

    componentDidMount() {
        this.handleGetEvents();
        this.handleSetTime();
    }

    componentDidUpdate() {
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search);

        window.onpopstate = () => {
            localStorage.setItem('currentPage', 'table');
            this.handleClickCell('init');
            if (!Utils.isEmpty(location.search) && !Utils.isEmpty(parsed.date)) {
                let year = parsed.date.slice(0, 4);
                let month = parsed.date.slice(4, 6);
                let date = parsed.date.slice(6, 8);
                this.currentDate = new Date(year, month - 1, date);
            }
            this.handleSetTime();
        }
    }


    // 일정 Get API 호출 부분
    handleGetEvents = () => {
        let eventList: any[] = [
            {
                startDate: "2021-01-04",
                endDate: "2021-01-05",
                eventTitle: '일정1',
                userId: 0,
                typeId: 0,
            },
            {
                startDate: "2021-02-05",
                endDate: "2021-02-07",
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
                startDate: "2021-03-11",
                endDate: "2021-03-13",
                eventTitle: '일정4',
                userId: 2,
                typeId: 2,
            },
            {
                startDate: "2021-02-13",
                endDate: "2021-02-16",
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
            {
                startDate: "2020-08-16",
                endDate: "2020-08-24",
                eventTitle: '일정1',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2021-01-05",
                endDate: "2021-01-07",
                eventTitle: '일정2',
                userId: 1,
                typeId: 1,
            },
            {
                startDate: "2021-03-10",
                endDate: "2021-03-17",
                eventTitle: '일정3',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2021-04-11",
                endDate: "2021-04-13",
                eventTitle: '일정4',
                userId: 2,
                typeId: 1,
            },
            {
                startDate: "2021-03-10",
                endDate: "2021-03-16",
                eventTitle: '일정5',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2021-02-14",
                endDate: "2021-02-15",
                eventTitle: '일정6',
                userId: 2,
                typeId: 2,
            },
            {
                startDate: "2020-12-21",
                endDate: "2020-12-21",
                eventTitle: '일정17',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2020-09-20",
                endDate: "2020-11-21",
                eventTitle: '일정20',
                userId: 0,
                typeId: 1,
            },
            {
                startDate: "2020-09-20",
                endDate: "2020-10-13",
                eventTitle: '일정21',
                userId: 1,
                typeId: 1,
            },
            {
                startDate: "2020-09-20",
                endDate: "2020-10-10",
                eventTitle: '일정22',
                userId: 0,
                typeId: 2,
            },
            {
                startDate: "2020-07-20",
                endDate: "2020-10-10",
                eventTitle: '일정23',
                userId: 2,
                typeId: 1,
            },
            {
                startDate: "2020-06-20",
                endDate: "2020-10-10",
                eventTitle: '일정24',
                userId: 2,
                typeId: 0,
            },
            {
                startDate: "2020-09-20",
                endDate: "2020-10-29",
                eventTitle: '일정19',
                userId: 0,
                typeId: 0,
            },
            {
                startDate: "2020-12-24",
                endDate: "2020-12-26",
                eventTitle: '일정18',
                userId: 1,
                typeId: 1,
            },
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

    handleSetTime = () => {
        let currentDay = this.currentDate;
        let theYear = currentDay.getFullYear();
        let theMonth = currentDay.getMonth();
        let theDate = currentDay.getDate();
        let theDayOfWeek = currentDay.getDay();
        let thisWeek = [];
        let firstDate = '';
        let lastDate = '';
        const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

        for (let i = 0; i < 7; i++) {
            let resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
            if (i === 0) firstDate = resultDay.getMonth() + 1 + '.' + resultDay.getDate();
            else if (i === 6) lastDate = resultDay.getMonth() + 1 + '.' + resultDay.getDate();
            localStorage.setItem('yearMatch', (new Date).getFullYear() === this.currentDate.getFullYear() ? "true" : "false");
            thisWeek[i] = resultDay.getMonth() + 1 + '월 ' + resultDay.getDate() + '일 (' + dayArr[resultDay.getDay()] + ')';
        }
        this.setState({
            weekDate: thisWeek,
            firstDate: firstDate,
            lastDate: lastDate,
        })
        // localStorage.setItem('currentState', JSON.stringify(this.state));
    }

    handleClickCell = (cell: any) => {
        const selectCell = document.querySelectorAll<HTMLElement>('.time-table tr');
        const todayCell = document.querySelectorAll<HTMLElement>('.time-table tr.today');

        if (selectCell !== null && !Utils.isEmpty(cell)) {
            for (let i = 0; i < selectCell.length; i++) {
                if (cell + 1 === i) {
                    selectCell[i].className += " active";
                } else {
                    selectCell[i].classList.remove("active");
                    if (i !== 0 && i < selectCell.length) {
                    }
                }
            }
        }
        if (cell === 'today' && !Utils.isEmpty(cell)) {
            todayCell[0].className += " active";
        }
    }

    // 이전, 다음, 오늘 버튼 이벤트
    handleTimeTable = (type: string) => {
        if (type === "pre") {
            this.handleClickCell('init');
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);
        } else if (type === "next") {
            this.handleClickCell('init');
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);
        } else if (type === "today") {
            let curDate = Utils.convertDateToString(this.currentDate);
            let todayDate = Utils.convertDateToString(new Date());
            if (curDate !== todayDate) {
                this.handleClickCell('init');
                this.currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            } else if (curDate === todayDate) {
                this.handleClickCell('today');
            }
        } else return;

        let currentYear = this.currentDate.getFullYear();
        let currentMonth: number | string = this.currentDate.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
        let currentDate: number | string = this.currentDate.getDate();
        currentDate = currentDate >= 10 ? currentDate : '0' + currentDate;
        history.push({
            pathname: process.env.PUBLIC_URL + '/table',
            search: `date=${currentYear}${currentMonth}${currentDate}`
        })
        this.setState({})
        this.handleSetTime();
    }

    handleRequestStatus = () => {
        //todo 요청현황 Modal
    }

    renderTimeTable = () => {
        const {weekDate} = this.state;
        let html: any[] = [];
        let yearMatch = localStorage.getItem('yearMatch');
        let today = `${(new Date).getMonth() + 1}월 ${(new Date).getDate()}일`;
        weekDate.map((date, idx) => {
                html.push(
                    <tr className={yearMatch === "true" && date.split(' (')[0] === today ? `date${idx} today active` : `date${idx}`}
                        key={idx} onClick={() => this.handleClickCell(idx)}>
                        <td><span className="work-time-date">{date}</span>
                            {yearMatch === "true" && date.split(' (')[0] === today &&
                            <span className="today">오늘</span>}</td>
                        <td>{this.renderTimeTableEvents(idx)}</td>
                    </tr>
                )
            }
        )
        return html;
    }

    renderTimeTableEvents = (idx: number) => {
        // dayType - working(근무), weekend(주말), annualLeave(연차), halfDayLeave(반차)
        let html: any[] = [];
        let className = ''
        className = idx !== 0 && idx !== 6 ? 'working' : 'weekend';

        html.push(
            <div className="work-time-list" key={Math.random()}>
                <span className={`work-time-title ${className}`}>{className === "working" ? "근무" : "주말"}</span>
                {className === "working" && <span className="work-time">오전 10:00 ~ 오후 06:00</span>}
                <div className="work-time-progress">{this.renderEventsProgress()}</div>
            </div>
        )

        return html;
    }

    renderEventsProgress = () => {
        let html: any[] = [];
        let progressStyle = {
            width: '40%',
        }

        html.push(
            <div className="work-time-progress-box" key={Math.random()}>
                <span className="progress-grid">6</span>
                <span className="progress-grid">8</span>
                <span className="progress-grid">10</span>
                <span className="progress-grid">12</span>
                <span className="progress-grid">14</span>
                <span className="progress-grid">16</span>
                <span className="progress-grid">18</span>
                <span className="progress-grid">20</span>
                <span className="progress-grid">22</span>
                <span className="progress-grid last">00</span>
                <span className="progress" style={progressStyle}></span>
            </div>
        )

        return html;
    }

    render() {
        let tempDate = Utils.convertDateMonthToString(new Date());
        let preFlag = tempDate !== Utils.convertDateMonthToString(this.currentDate);
        const {weekDate, firstDate, lastDate} = this.state;

        return (
            <div className="wrapper">
                <Header/>
                <div className="date-wrap time-table-wrap">
                    <div className="select-date">
                        <div className="date-label">
                            <span className="date-main">
                            <h2>
                                {this.currentDate === null ? "" : `${this.currentDate.getMonth() + 1}월`}
                            </h2>
                            </span>
                            <span className="date-sub">
                                 <h4>
                                {this.currentDate === null ? "" : `${this.currentDate.getFullYear()}년`}
                            </h4>
                            <h4>
                                {weekDate === null ? "" : `${firstDate}  ~ ${lastDate}`}
                            </h4>
                            </span>

                        </div>

                        {/*<span className={"back"} onClick={() => Utils.handleHistoryBack()}>돌아가기</span>*/}
                        <span className={"pre " + (preFlag ? "" : "op")}
                              onClick={() => this.handleTimeTable(preFlag ? "pre" : "pre")}>&lt;</span>
                        <span className="current-month" onClick={() => this.handleTimeTable("today")}>오늘</span>

                        <span className={"next "} onClick={() => this.handleTimeTable("next")}>&gt;</span>
                        <div className="create-event-btn" onClick={() => this.handleRequestStatus()}>요청 현황</div>
                    </div>
                    <table className="time-table">
                        <tbody>
                        <tr>
                            <th>근무 일자</th>
                            <th></th>
                        </tr>
                        {this.renderTimeTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TimeTable;