import React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
// import { Provider } from "mobx-react";

import {
    Calendar,
    TimeTable
} from "./containers";
import history from "../app/containers/history";
// import { Calendar } from "react-big-calendar";

// import "../assets/css/main.css";
// import RootStore from "./stores/rootStore";
// import PrivateRoute from "./privateRoute";
// import * as Utils from "./constants/utils";

// const APP_SERVER_TYPE = ['REAL', 'QA'];
// const SERVER_TYPE = process.env.REACT_APP_SERVER_TYPE;
// const rootStore = new RootStore();
const Root: React.FC = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Calendar}/>
            <Route exact={true} path="/calendar" component={Calendar}/>
            <Route path="/table" component={TimeTable}/>
            {/* <Route path="/error" component={Error} />
      <Redirect path="*" to="/error" /> */}
        </Switch>
    </Router>
);

export default Root;
