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
        this.handleSetTime();
    }

    componentDidUpdate() {
        const location: any = history.location;
        const queryString = require("query-string");
        const parsed = queryString.parse(location.search);

        window.onpopstate = () => {
            localStorage.setItem('currentPage', 'table');

            if (!Utils.isEmpty(location.search) && !Utils.isEmpty(parsed.date)) {
                let year = parsed.date.slice(0, 4);
                let month = parsed.date.slice(4, 6);
                let date = parsed.date.slice(6, 8);
                this.currentDate = new Date(year, month - 1, date);
            }
            this.handleSetTime();
        }
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

        if (selectCell !== null && !Utils.isEmpty(cell)) {
            for (let i = 0; i < selectCell.length; i++) {
                if (cell + 1 === i) {
                    selectCell[i].className += " active";
                } else {
                    selectCell[i].classList.remove("active");
                }
            }
        }
    }

    handleCalendar = (type: string) => {
        if (type === "pre") {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);
        } else if (type === "next") {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);
        } else if (type === "today") {
            this.handleClickCell('init');
            this.currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        } else return;

        let currentYear = this.currentDate.getFullYear();
        let currentMonth: number | string = this.currentDate.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
        let currentDate: number | string = this.currentDate.getDate();
        currentDate = currentDate >= 10 ? currentDate : '0' + currentDate;
        history.push({
            pathname: '/table',
            search: `date=${currentYear}${currentMonth}${currentDate}`
        })
        this.setState({})
        this.handleSetTime();
    }

    renderTimeTable = () => {
        const {weekDate} = this.state;
        let html: any[] = [];
        let yearMatch = localStorage.getItem('yearMatch');
        let today = `${(new Date).getMonth() + 1}월 ${(new Date).getDate()}일`;
        weekDate.map((date, idx) => {
                //1월 4일 (화)
                html.push(
                    <tr className={yearMatch === "true" && date.split(' (')[0] === today ? `date${idx} active` : `date${idx}`}
                        key={idx} onClick={() => this.handleClickCell(idx)}>
                        <td>{date}
                            {yearMatch === "true" && date.split(' (')[0] === today &&
                            <span className="today">오늘</span>}</td>
                        <td>{this.renderTimeTableCell(idx)}</td>
                    </tr>
                )
            }
        )

        return html;
    }

    renderTimeTableCell = (index: number) => {
        let html: any[] = [];
        if (index !== 0 && index !== 6) {

            html.push(
                <span className="work-time" key={Math.random()}>
                    <span className="working">근무</span>
                    오전 10:00 ~ 오후 06:00 </span>
            )
        } else {
            html.push(
                <span className="work-time weekend" key={Math.random()}>주말</span>
            )
        }


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
                            <span className={"date-sub"}>
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
                              onClick={() => this.handleCalendar(preFlag ? "pre" : "pre")}>&lt;</span>
                        <span className={"current-month"} onClick={() => this.handleCalendar("today")}>오늘</span>

                        <span className={"next "} onClick={() => this.handleCalendar("next")}>&gt;</span>
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