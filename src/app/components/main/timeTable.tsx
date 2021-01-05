import React from "react";
import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";
import moment from "moment";
import SideBar from "../main/sideBar";


export interface TimeTableProps {
}

export interface TimeTableState {
    weekDate: any[],
    events: any[],
    firstDate: string,
    lastDate: string,

}

export class TimeTable extends React.Component<TimeTableProps, TimeTableState> {
    private curDate: any = moment(new Date());
    private date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()); // 로컬 스토리지

    constructor(props?: any) {
        super(props);
        // const location: any = history.location;
        // const queryString = require("query-string");
        // const parsed = queryString.parse(location.search);
        //
        // if (!Utils.isEmpty(location)) {
        // console.log(parsed.date);
        // }

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
    }

    handleSetTime = () => {
        let currentDay = this.date;
        let theYear = currentDay.getFullYear();
        let theMonth = currentDay.getMonth();
        let theDate = currentDay.getDate();
        let theDayOfWeek = currentDay.getDay();
        let thisWeek = [];
        const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
        let firstDate = '';
        let lastDate = '';

        for (let i = 0; i < 7; i++) {
            let resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
            if (i === 0) firstDate = resultDay.getMonth() + 1 + '.' + resultDay.getDate();
            else if (i === 6) lastDate = resultDay.getMonth() + 1 + '.' + resultDay.getDate();
            thisWeek[i] = resultDay.getMonth() + 1 + '월 ' + resultDay.getDate() + '일 (' + dayArr[resultDay.getDay()] + ')';
        }
        this.setState({
            weekDate: thisWeek,
            firstDate: firstDate,
            lastDate: lastDate,
        })
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
        console.log(type)
        if (type === "pre") {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7);
        } else if (type === "next") {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7);
        } else if (type === "today") {
            this.date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        } else return;

        this.setState({})
        this.handleSetTime();
    }

    renderTimeTable = () => {
        const {weekDate} = this.state;
        // let data = new Date(weekDate);
        let html: any[] = [];
        weekDate.map((date, idx) => {
                //1월 4일 (화)
                html.push(
                    <tr className={`date${idx}`} key={idx} onClick={() => this.handleClickCell(idx)}>
                        <td>{date}</td>
                        <td> 오전 10:00 ~ 오후 06:00</td>
                    </tr>
                )
            }
        )

        return html;
    }


    render() {
        let tempDate = Utils.convertDateMonthToString(new Date());
        let preFlag = tempDate !== Utils.convertDateMonthToString(this.curDate);
        const {weekDate, firstDate, lastDate} = this.state;

        return (
            <div className="wrapper">
                <SideBar/>
                <div className="date-wrap time-table-wrap">
                    <div className="select-date">
                        <div className="date-label">
                            <span className="date-main">
                            <h2>
                                {this.curDate === null ? "" : `${this.date.getMonth() + 1}월`}
                            </h2>
                            </span>
                            <span className={"date-sub"}>
                                 <h4>
                                {this.curDate === null ? "" : `${this.date.getFullYear()}년`}
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