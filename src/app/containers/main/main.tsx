import React from "react";
import MainComponent from "../../components/main/main";

export interface MainProps {}

export interface MainState {}

export class Main extends React.Component<MainProps, MainState> {
  render() {
    return <MainComponent />;
  }
}

export default Main;
