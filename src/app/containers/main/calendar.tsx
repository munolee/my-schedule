import React from "react";
import CalendarComponent from "../../components/main/calendar";

export interface CalendarProps {}

export interface CalendarState {}

export class Calendar extends React.Component<CalendarProps,CalendarState> {
  render() {
    return <CalendarComponent />;
  }
}

export default Calendar;
