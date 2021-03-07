import React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";

import {
    Calendar,
    TimeTable
} from "./containers";
import history from "../app/containers/history";
// import RootStore from "./stores/rootStore";
// import PrivateRoute from "./privateRoute";

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
