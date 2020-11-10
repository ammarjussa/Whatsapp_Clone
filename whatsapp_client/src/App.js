import React from "react";
import "./App.scss";
import Homepage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import firebase from "firebase";
import firebaseConfig from "./firebase";

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
