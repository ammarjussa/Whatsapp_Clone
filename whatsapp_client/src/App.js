import React from "react";
import "./App.scss";
import Homepage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
