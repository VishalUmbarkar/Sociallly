import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Drawer.css";
import { Link } from "react-router-dom";
import Create from "./Create";
import { Typography } from "@mui/material";

const drawerWidth = 220;

export default function MiniDrawer() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [showCreate, setShowCreate] = useState(false);
  const [clickedHome, setClickedHome] = useState(true);
  const [clickedExplore, setClickedExplore] = useState(false);
  const [clickedSearch, setClickedSearch] = useState(false);

  const handleHomeClick = () => {
    setClickedExplore(false);
    setClickedHome(true);
    setClickedSearch(false);
  };

  const handleEploreClick = () => {
    setClickedHome(false);
    setClickedExplore(true);
    setClickedSearch(false);
  };

  const handleCreateClick = () => {
    setShowCreate(true);
    setClickedExplore(false);
    setClickedHome(false);
    setClickedSearch(false);
  };

  const handleSearchClick=()=>{
    setClickedSearch(true);
    setClickedHome(false);
    setClickedExplore(false);
  }

  const handleClose = () => {
    setShowCreate(false);
  };

  return (
    <Box sx={{ display: "flex" , background:"transparent"}}>
      <Drawer
        className="drawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "transparent",
            overflow: "clip",
            borderRight: "1px solid #ccc",
            backgroundColor: "rgba(231, 229, 234, 0.3)",
            boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
            /* Adjust the blur value as needed */
            backdropFilter: "blur(5px)",
            "@media (max-width: 600px)": {
              width: "63px", // Adjust the width for smaller screens
              marginLeft: "none",
              flex: "1",
            },
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <div style={{ width: isSmallScreen ? "40px" : "100%" }}>
          <img
            src={isSmallScreen ? "/black_logo.png" : "/new_logo.png"}
            style={{ width: "80%", margin: "20px", objectFit: "contain" }}
            alt="logo"
          />
        </div>

        <List>
          <ListItem
            disablePadding
            style={{ margin: "10px", width: "180px" }}
            className="list-item"
          >
            <ListItemButton
              component={Link}
              to="http://localhost:3000/feed"
              onClick={handleHomeClick}
            >
              <img
                src={clickedHome ? "/home_clicked.png" : "/home.png"}
                alt="Home icon"
                style={
                  clickedHome
                    ? { width: "29px", height: "29px", marginRight: "10px" }
                    : { marginRight: "10px" }
                }
                className="icon-img"
              />

              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={
                      clickedHome
                        ? {
                            color: "black",
                            fontWeight: "600",
                            fontSize: "large",
                            marginLeft:"5px"
                          }
                        : {
                            color: "black",
                            fontWeight: "400",
                            fontSize: "large",
                            marginLeft:"5px"
                          }
                    }
                  >
                    Home
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{ margin: "10px", width: "180px" }}
            className="list-item"
          >
            <ListItemButton
              component={Link}
              to="http://localhost:3000/explore"
              onClick={handleEploreClick}
            >
              <img
                src={clickedExplore ? "/explore_clicked.png" : "/explore.png"}
                alt="Explore icon"
                style={{ marginRight: "10px" }}
                className="icon-img"
              />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={
                      clickedExplore
                        ? {
                            color: "black",
                            fontWeight: "600",
                            fontSize: "large",
                            marginLeft:"5px"
                          }
                        : {
                            color: "black",
                            fontWeight: "400",
                            fontSize: "large",
                            marginLeft:"5px"
                          }
                    }
                  >
                    Explore
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{ margin: "10px", width: "180px" }}
            className="list-item"
          >
            <ListItemButton component={Link} to="http://localhost:3000/profile">
              <img
                src="/avatar.png"
                alt="Profile icon"
                style={{ marginRight: "10px" }}
                className="icon-img"
              />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={{
                            color: "black",
                            fontWeight: "400",
                            fontSize: "large",
                            marginLeft:"5px"
                            }
                            }>
                    Profile
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{ margin: "10px", width: "180px" }}
            className="list-item"
          >
            <ListItemButton onClick={handleCreateClick}>
              <img
                src="/create.png"
                alt="Create icon"
                style={{ marginRight: "10px" }}
                className="icon-img"
              />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={{
                            color: "black",
                            fontWeight: "400",
                            fontSize: "large",
                            marginLeft:"5px"
                            }
                            }>
                    Create
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            style={{ margin: "10px", width: "180px" }}
            className="list-item"
          >
            <ListItemButton onClick={handleSearchClick}

            >
              <img
                src={clickedSearch ? "/search_clicked.png" : "/search.png"}
                alt="Search icon"
                style={{ marginRight: "10px" }}
                className="icon-img"
              />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={
                      clickedSearch
                        ? {
                            color: "black",
                            fontWeight: "600",
                            fontSize: "large",
                            marginLeft:"5px"
                          }
                        : {
                            color: "black",
                            fontWeight: "400",
                            fontSize: "large",
                            marginLeft:"5px"
                          }
                    }
                  >
                    Search
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {showCreate && (
        <Create
          open={showCreate}
          onClose={handleClose}
          // selectedPostId={selectedPostId}
        />
      )}

      <Box
        component="main"
        sx={{ flexGrow: 1, background:"none", p: 3 }}
      >
        {/* Your main content goes here */}
      </Box>
    </Box>
  );
}
