import React from "react";
import "./App.scss";
import Homepage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import firebase from "firebase";
import firebaseConfig from "./firebase";

/* Things to implement:

2) One on one messaging. (Complicated)
3) Group messaging. (Easier)
5) Audio message
6) Attachments sending along with message
7) All Members shown when chat icon clicked(UI + Functionality)
8) Logout option 
9) Deploy on Heroku

*/

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
