import React, { useState, useEffect } from "react";
import Link from "next/link";
import CryptoJS from "crypto-js";
import {
  Menu,
  Typography,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
  Input,
  Drawer,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import userimg from "../../assets/images/users/user2.jpg";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children, setlog }) => {
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = React.useState(Math.random());
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const logout = () => {
    setUser({ value: null });
    localStorage.removeItem("token");
    localStorage.removeItem("userKey");
    localStorage.removeItem("name");
    setKey(Math.random());
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const [name, setName] = useState("");
  const router = useRouter();
  const [showDrawer2, setShowDrawer2] = useState(false);

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  useEffect(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await setUser({ value: token });
      await setName(localStorage.getItem("name"));
      await setKey(Math.random());
    } else {
      setUser({ value: null });
    }
  }, []);

  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <MainWrapper>
      <style jsx global>{`
        .css-ddd {
          padding-top: 0px;
        }
      `}</style>
      <AppBar
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#fbfbfb",
        }}
        position={"fixed"}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileSidebarOpen(true)}
            sx={{
              display: {
                lg: "none",
                xs: "flex",
              },
            }}
          >
            <FeatherIcon icon="menu" width="20" height="20" />
          </IconButton>
          {/* ------------------------------------------- */}
          {/* Search Dropdown */}
          {/* ------------------------------------------- */}
          <>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              aria-controls="search-menu"
              aria-haspopup="true"
              onClick={() => setShowDrawer2(true)}
              size="large"
            >
              <FeatherIcon icon="search" width="20" height="20" />
            </IconButton>
            <Drawer
              anchor="top"
              open={showDrawer2}
              onClose={() => setShowDrawer2(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  padding: "15px 30px",
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <Input
                  placeholder="Search here"
                  aria-label="description"
                  fullWidth
                />
                <Box
                  sx={{
                    ml: "auto",
                  }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      color: (theme) => theme.palette.grey.A200,
                    }}
                    onClick={handleDrawerClose2}
                  >
                    <FeatherIcon icon="x-circle" />
                  </IconButton>
                </Box>
              </Box>
            </Drawer>
          </>
          {/* ------------ End Menu icon ------------- */}

          <Box flexGrow={1} key={key} />
          {!user.value && <Button variant="contained">Login</Button>}
          {user.value && (
            <>
              <Button
                aria-label="menu"
                color="inherit"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleClick4}
              >
                <Box display="flex" alignItems="center">
                  <Image
                    src={userimg}
                    alt={userimg}
                    width="30"
                    height="30"
                    className="roundedCircle"
                  />
                  <Box
                    sx={{
                      display: {
                        xs: "none",
                        sm: "flex",
                      },
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h5"
                      fontWeight="400"
                      sx={{ ml: 1 }}
                    >
                      Hi,
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="700"
                      sx={{
                        ml: 1,
                      }}
                    >
                      {name}
                    </Typography>
                    <FeatherIcon icon="chevron-down" width="20" height="20" />
                  </Box>
                </Box>
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl4}
                keepMounted
                open={Boolean(anchorEl4)}
                onClose={handleClose4}
                sx={{
                  "& .MuiMenu-paper": {
                    width: "385px",
                  },
                }}
              >
                <Box>
                  <Box p={2} pt={0}>
                    <List
                      component="nav"
                      aria-label="secondary mailbox folder"
                      onClick={handleClose4}
                    >
                      <ListItemButton>
                        <ListItemText primary="My Account" />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText primary="Change Password" />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText primary="My Settings" />
                      </ListItemButton>
                    </List>
                  </Box>
                  <Divider />
                  <Box p={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setlog();
                        logout();
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
                </Box>
              </Menu>
            </>
          )}
          {/* ------------------------------------------- */}
          {/* Profile Dropdown */}
          {/* ------------------------------------------- */}
        </Toolbar>
      </AppBar>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
