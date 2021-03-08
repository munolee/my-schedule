import React from "react";
import {
  HashRouter,
  BrowserRouter,
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
  <HashRouter basename={process.env.PUBLIC_URL}>
    {/* <Switch> */}
    <Route path="/" component={Calendar} />
    <Route exact={true} path="/calendar" component={Calendar} />
    <Route path="/table" component={TimeTable} />
    {/* <Route path="/error" component={Error} />
      <Redirect path="*" to="/error" /> */}
    {/* </Switch> */}
  </HashRouter>
);

export default Root;
