import React from "react";
import TimeTableComponent from "../../components/main/timeTable";

export interface TimeTableProps {}

export interface TimeTableState {}

export class TimeTable extends React.Component<TimeTableProps,TimeTableState> {
    render() {
        return <TimeTableComponent />;
    }
}

export default TimeTable;
