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
      <div className="heading">
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="whatsapp logo"
          height="60"
          width="60"
        />
        <h1>WhatsApp</h1>
      </div>
      <div>
        <div class="google-btn" onClick={signInWithGoogle}>
          <div class="google-icon-wrapper">
            <img
              alt="google"
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Log in with Google</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
