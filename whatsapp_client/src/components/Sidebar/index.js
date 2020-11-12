import React, { useState } from "react";
import "./index.scss";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import firebase from "firebase";

const Sidebar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log(anchorEl);
  };

  const signOut = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Signed Out");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton
            onClick={handleClick}
            aria-label="more"
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <MoreVertIcon />
            <Menu
              id="simple-menu"
              keepMounted
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
            >
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div>
          <SearchOutlinedIcon />
          <input placeholder="Search or Start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
