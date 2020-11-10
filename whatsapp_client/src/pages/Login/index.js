import React from "react";
import firebase from "firebase";
import "./index.scss";

const Login = ({ history }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        history.push("/");
        console.log("Lolly pop");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <button onClick={signInWithGoogle}>Google Login</button>
    </div>
  );
};

export default Login;
