import React from "react";
import {Link} from "react-router-dom";

export interface HeaderProps {
}

export interface HeaderState {
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    private currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    constructor(props?: any) {
        super(props);
        this.state = {};
    }

    render() {
        let currentYear = this.currentDate.getFullYear();
        let currentMonth: number | string = this.currentDate.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
        let currentDate: number | string = new Date().getDate();
        currentDate = currentDate >= 10 ? currentDate : '0' + currentDate;

        return (
            <div className="header">
                <ul className="header-list">
                    {/*<li className="list-menu"><Link to={'/'}>홈</Link></li>*/}
                    <li className="list-menu"><Link to={{
                        pathname: "/calendar",
                        search: `date=${String(currentYear)}${String(currentMonth)}`,
                        state: {
                            state: this.state,
                            date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
                        },
                    }}
                    >일정 확인</Link></li>
                    <li className="list-menu"><Link to={{
                        pathname: '/table',
                        search: `date=${String(currentYear)}${String(currentMonth)}${String(currentDate)}`
                    }}>근무&middot;휴가</Link></li>
                </ul>
            </div>
        );
    }
}

export default Header;
