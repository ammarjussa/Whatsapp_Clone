import React from "react";
import "./index.scss";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://scontent.fkhi4-1.fna.fbcdn.net/v/t1.0-1/p160x160/119741127_104766208049447_1835121773555063927_n.jpg?_nc_cat=103&ccb=2&_nc_sid=dbb9e7&_nc_eui2=AeGNDRiAVdxZ6yZ64m0SMEUarFAgzL5B8-esUCDMvkHz54bVZAZdzXaCbw14Qd6l1oaCrGFTcno1a8iHqraUtUQr&_nc_ohc=rXpjqhv0MLEAX_-d6zK&_nc_ht=scontent.fkhi4-1.fna&tp=6&oh=3ed6603a77ed5511e040b37be992bfe0&oe=5FC8E1D3" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
