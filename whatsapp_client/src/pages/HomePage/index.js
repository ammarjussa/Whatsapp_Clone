import React, { useEffect, useState } from "react";
import "./index.scss";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import Pusher from "pusher-js";
import axios from "../../axios";

/* Things to implement:

1) Firebase authentication.
1.5) Automatic down scroll, when new message arrives.
2) One on one messaging. (Complicated)
3) Group messaging. (Easier)
4) Login page UI.
5) Audio message
6) Attachments sending along with message
7) All Members shown when chat icon clicked(UI + Functionality)
8) Logout option 
9) Deploy on Heroku

*/

function Homepage() {
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
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default Homepage;
