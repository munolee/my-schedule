import React from "react";
import history from "../../../app/containers/history";

export interface HeaderProps {}

export interface HeaderState {}

export class Header extends React.Component<HeaderProps, HeaderState> {
  private currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  constructor(props?: any) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    window.onpopstate = () => {
      // 다시 렌더되게끔 해야함
      this.setState({});
    };
  }

  handleRouteLocation = (location: string) => {
    let curPage = localStorage.getItem("currentPage");
    let currentYear = this.currentDate.getFullYear();
    let currentMonth: number | string = this.currentDate.getMonth() + 1;
    currentMonth = currentMonth >= 10 ? currentMonth : "0" + currentMonth;
    let currentDate: number | string = new Date().getDate();
    currentDate = currentDate >= 10 ? currentDate : "0" + currentDate;

    if (location === "calendar" && curPage !== "calendar") {
      history.push({
        pathname: process.env.PUBLIC_URL + "/calendar",
        search: `date=${String(currentYear)}${String(currentMonth)}`,
        state: {
          state: this.state,
          date: new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth(),
            1
          ),
        },
      });
    } else if (location === "table" && curPage !== "table") {
      history.push({
        pathname: process.env.PUBLIC_URL + "/table",
        search: `date=${String(currentYear)}${String(currentMonth)}${String(
          currentDate
        )}`,
      });
    }
    localStorage.setItem("currentPage", location);
  };

  render() {
    let curPage = localStorage.getItem("currentPage");
    if (!curPage) curPage = "calendar";

    return (
      <div className="header">
        <ul className="header-list">
          <li
            className={`list-menu ${curPage === "calendar" ? "active" : ""}`}
            onClick={() => this.handleRouteLocation("calendar")}
          >
            <img src={"./image/home.png"} />
            <span>전체 일정</span>
          </li>
          <li
            className={`list-menu ${curPage === "table" ? "active" : ""}`}
            onClick={() => this.handleRouteLocation("table")}
          >
            <img src={"./image/time.png"} />
            <span>근무&middot;일정</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
