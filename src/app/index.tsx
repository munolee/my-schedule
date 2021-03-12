import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Calendar, TimeTable } from "./containers";
import history from "../app/containers/history";
// import RootStore from "./stores/rootStore";
// import PrivateRoute from "./privateRoute";

// const rootStore = new RootStore();
const Root: React.FC = () => (
  <Router basename="/management">
    {/* <Switch> */}
    <Route exact path="/" component={Calendar} />
    <Route exact path="/calendar" component={Calendar} />
    <Route exact path="/table" component={TimeTable} />
    {/* <Route path="/error" component={Error} />
      <Redirect path="*" to="/error" /> */}
    {/* </Switch> */}
  </Router>
);

export default Root;
