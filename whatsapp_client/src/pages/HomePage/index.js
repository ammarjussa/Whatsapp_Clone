import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./index.scss";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import Pusher from "pusher-js";
import axios from "../../axios";

function Homepage({ history }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (person) {
      if (person) {
        console.log(person);
        setUser(person);
      } else {
        history.push("/login");
      }
    });

    console.log(user);
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("952f098bb894c5ef807c", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="home">
      <div className="home__body">
        <Sidebar user={user} />
        <Chat messages={messages} user={user} />
      </div>
    </div>
  );
}

export default Homepage;
