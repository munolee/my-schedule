import React from "react";

import history from "../../../app/containers/history";
import * as Utils from "../../../app/containers/utils";

export interface TimeTableProps {
}

export interface TimeTableState {
    events: any[]
}

export class TimeTable extends React.Component<TimeTableProps, TimeTableState> {
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

        }
    }

    renderTimeTable = () => {
        let html: any[] = [];

        html.push(
            <tr key={Math.random()}>
                <td>오전 12:00</td>
                <td> 1</td>
            </tr>
        // <tr>
        //     <td>오전 2:00</td>
        //     <td>내용</td>
        // </tr>
        //
        // <tr>
        //     <td>오전 4:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오전 6:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오전 8:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오전 10:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오후 12:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오후 2:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오후 4:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오후 6:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오후 8:00</td>
        //     <td>내용</td>
        // </tr>
        // <tr>
        //     <td>오후 10:00</td>
        //     <td>내용</td>
        // </tr>

    )
        return html;
    }


    render() {
        return <div className="wrapper">
            <div className="date-wrap time-table-wrap">
                <table className="time-table">
                    <tbody>
                    <tr>
                        <th>시간</th>
                        <th>일정</th>
                    </tr>
                    {this.renderTimeTable()}
                    </tbody>
                </table>
            </div>
        </div>;
    }
}

export default TimeTable;