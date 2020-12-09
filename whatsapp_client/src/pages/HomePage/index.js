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

  useEffect(() => {
    const pusher = new Pusher("7a0306a85bc21d1a726f", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      const updatedGroup = selectedGroup;
      const length = updatedGroup.messages ? updatedGroup.messages.length : 0;
      const newmessage = data.message[`messages.${length}`];
      updatedGroup.messages = [...updatedGroup.messages, newmessage];
      setSelectedGroup({ ...updatedGroup });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [selectedGroup, groups]);

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
          id={selectedGroup ? selectedGroup._id : null}
          messages={selectedGroup ? selectedGroup.messages : null}
          user={user}
        />
      </div>
    </div>
  );
}

export default Homepage;
