import React from "react";
import "./index.scss";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

const Chat = () => {
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
        <p className="send">
          <span className="name">Ammar </span>
          This is a message
          <span className="timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="receive">
          <span className="name">Ammar </span>
          This is a message
          <span className="timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="send">
          <span className="name">Ammar </span>
          This is a message
          <span className="timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input placeholder="Type a message" type="text" />
          <button type="submit">Send</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
