import React from "react";
import {Link} from "react-router-dom";

export interface HeaderProps {
}

export interface HeaderState {
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    private date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    constructor(props?: any) {
        super(props);
        this.state = {};
    }

    render() {
        let currentYear = this.date.getFullYear();
        let currentMonth: number | string = this.date.getMonth() + 1;
        currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth; // month 두자리로 저장

        return (
            <div className="header">
                <ul className="header-list">
                    {/*<li className="list-menu"><Link to={'/'}>홈</Link></li>*/}
                    <li className="list-menu"><Link to={{
                        pathname: "/calendar",
                        search: `date=${String(currentYear) + currentMonth}`,
                        state: {
                            state: this.state,
                            date: new Date(this.date.getFullYear(), this.date.getMonth(), 1)
                        },
                    }}
                    >일정 확인</Link></li>
                    <li className="list-menu"><Link to={'/table'}>근무&middot;휴가</Link></li>
                </ul>
            </div>
        );
    }
}

export default Header;
