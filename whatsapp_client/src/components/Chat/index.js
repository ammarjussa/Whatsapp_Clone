import React, { useState } from "react";
import "./index.scss";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../../axios";

const Chat = ({ messages, user }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: text,
      name: "Ammar",
      timestamp: "Just now!",
      received: false,
    });

    setText("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="info">
          <h3>Room name</h3>
          <p>Last seen at....</p>
        </div>

        <div className="icons">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(({ name, message, timestamp, received }) => (
          <p className={received ? "send" : "receive"}>
            <span className="name">{name} </span>
            {message}
            <span className="timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={text}
            onChange={handleChange}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
