import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import "moment/locale/ko";
import events from "../../../app/event";

const localizer = momentLocalizer(moment);

export interface MainProps {}
export interface MainState {
  events: any;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props?: any) {
    super(props);
    this.state = { events: events };
  }

  // renderCalendar = () => {
  //   let html = "11";
  //   return html;
  // };

  render() {
    return (
      <div className="wrapper">
        <div className="contents">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            step={60}
            scrollToTime={new Date(1970, 1, 1, 6)}
            style={{ width:1000, height: 600 }}
            events={events}
            defaultView="month"
            // events={[
            //   {
            //     title: "0",
            //     allDay: false,
            //     start: new Date(2015, 3, 7),
            //     end: new Date(2015, 3, 10),
            //   },
            // ]}
            // events={this.state.events}
            // min={new Date(2008, 0, 1, 8, 0)}
            // max={new Date(2008, 0, 1, 17, 0)}
            // date={new Date(2020, 12, 22)}
          />
        </div>
      </div>
    );
  }
}

export default Main;
