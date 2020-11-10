import React from "react";
import "./index.scss";
import firebase from "firebase";

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("Lolly pop");
      })
      .catch((err) => alert(err.message));
  };
  return <div className="login"></div>;
};

export default Login;
