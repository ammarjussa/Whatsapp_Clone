import { Avatar } from "@material-ui/core";
import React from "react";
import "./index.scss";

const SidebarChat = ({ id, name, lastMsg, setGroup }) => {
  return (
    <div className="sidebarChat" onClick={() => setGroup(id)}>
      <Avatar />
      <div>
        <h2>{name}</h2>
        <p>{lastMsg && lastMsg.message ? lastMsg.message : <i>No text</i>}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
