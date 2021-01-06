import React from "react";
import {Link} from "react-router-dom";

export interface SideBarProps {
}

export interface SideBarState {
}

export class SideBar extends React.Component<SideBarProps, SideBarState> {
    constructor(props?: any) {
        super(props);
        this.state = {};
    }

    // renderCalendar = () => {
    //   let html = "11";
    //   return html;
    // };

    render() {
        return (
            <div className="side-bar">
                <ul className="side-bar-list">
                    {/*<li className="list-menu"><Link to={'/'}>홈</Link></li>*/}
                    <li className="list-menu"><Link to={'/calendar'}>일정 확인</Link></li>
                    <li className="list-menu"><Link to={'/table'}>근무&middot;휴가</Link></li>
                </ul>
            </div>
        );
    }
}

export default SideBar;
