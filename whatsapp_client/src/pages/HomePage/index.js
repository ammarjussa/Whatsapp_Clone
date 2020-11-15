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
        setUser(person);
      } else {
        history.push("/login");
      }
    });
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

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});

  useEffect(() => {
    axios.get("/groups/all").then((res) => {
      const allgroups = res.data;
      const mygroups = allgroups.filter((group) =>
        group.members.includes(user.uid)
      );
      setGroups(mygroups);
    });
  }, [user.uid]);

  useEffect(() => {
    setSelectedGroup(groups[0]);
  }, [groups]);

  return (
    <div className="home">
      <div className="home__body">
        <Sidebar
          groups={groups}
          user={user}
          setGroup={(id) =>
            setSelectedGroup(groups.filter((group) => group._id === id)[0])
          }
        />
        <Chat
          id={selectedGroup ? selectedGroup._id : ""}
          messages={selectedGroup ? selectedGroup.messages : ""}
          user={user}
        />
      </div>
    </div>
  );
}

export default Homepage;
