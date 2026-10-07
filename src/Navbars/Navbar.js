import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import profile from "../Images/Navbars/profile.png";
import bellvideo from "../Videos/bellvideo.gif";

import {
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../UseContext/UserContext";

import Home from "../../src/Images/Navbars/Home.png";
import RFQs from "../../src/Images/Navbars/RFQs.png";
import POs from "../../src/Images/Navbars/POs.png";
import Vendors from "../../src/Images/Navbars/Vendors.png";
import search from "../../src/Images/Prospects/searchIcon.png";
import revaluationactive from "../../src/Images/Revaluation/Revaluation Nav Bar Active 1.png";
import revaluation from "../../src/Images/Revaluation/Revaluation Icon.png";

import axios from "axios";
import dayjs from "dayjs";

import hiQ_logo from "../Images/Hiq_icon.png";
import vendorHub from "../Images/VendorHub.png";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  ///marginLeft: drawer == "miniopen" ? `${drawerWidth}` : "0px", // whichever your mini-drawer width
  transition: theme.transitions.create(["margin"], {
    duration: theme.transitions.duration.standard,
  }),
}));

export default function Navbar({ children }) {
  const [selectedNav, setSelectedNav] = React.useState(
    sessionStorage.getItem("selectnav1"),
  );

  const [open, setOpen] = React.useState(true);

  // const { drawer, setDrawer } = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const location = useLocation();
  const {
    activeStep,
    setActiveStep,
    modal,
    setModal,
    modalTittle,
    setModalTittle,
    modalDesc,
    setModalDesc,
    modalNavigate,
    setModalNavigate,
  } = React.useContext(UserContext);

  const [notificationList, setNotificationList] = React.useState(null);
  const [notificationCount, setNotifiationCount] = React.useState("");
  const [roleName, setRoleName] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const menuItems = [
    ...(roleName === "RFQ Management"
      ? [
          {
            text: "Home",
            activeicon: Home,
            path: "Home",
            id: 1,
          },
          {
            text: "Vendors",
            activeicon: Vendors,
            path: "Vendors",
            id: 2,
          },
          {
            text: "RFQs",
            activeicon: RFQs,
            path: "RFQs",
            id: 3,
          },
          {
            text: "POs",
            activeicon: POs,
            path: "POs",
            id: 4,
          },
        ]
      : [
          {
            text: "Prospects",
            activeicon: search,
            path: "Prospects",
            id: 5,
          },
          {
            text: "Revaluation",
            activeicon: revaluation,
            path: "Revaluation",
            id: 7,
          },
        ]),
  ];

  // const menuItems = [
  //   {
  //     text: "Home",
  //     activeicon: Home,
  //     path: "Home",
  //     id: 1,
  //   },
  //   {
  //     text: "Vendors",
  //     activeicon: Vendors,
  //     path: "Vendors",
  //     id: 2,
  //   },
  //   {
  //     text: "RFQs",
  //     activeicon: RFQs,
  //     path: "RFQs",
  //     id: 3,
  //   },
  //   {
  //     text: "POs",
  //     activeicon: POs,
  //     path: "POs",
  //     id: 4,
  //   },
  //   {
  //     text: "Prospects",
  //     activeicon: search,
  //     path: "Prospects",
  //     id: 5,
  //   },
  // ];

  React.useEffect(() => {
    setRoleName(sessionStorage.getItem("RoleName"));
  }, []);

  const navigate = useNavigate();

  React.useEffect(() => {
    const role = sessionStorage.getItem("RoleName");

    if (!role) return;

    let blockedRoutes = [];

    if (role === "RFQ Management") {
      // RFQ Management cannot access Prospects
      blockedRoutes = ["/Prospects", "/Revaluation"];
    } else if (role === "Approver" || role == "Risk Assessment") {
      // Approver cannot access these pages
      blockedRoutes = ["/Home", "/Vendors", "/RFQs", "/POs"];
    }

    if (blockedRoutes.includes(location.pathname)) {
      navigate("/", { replace: true });
      // sessionStorage.clear();
    }
  }, [location.pathname, navigate]);

  const bellOpen = Boolean(anchorEl);
  const id = bellOpen ? "simple-popover" : undefined;

  const profileOpen = Boolean(anchorEl2);
  const id2 = profileOpen ? "simple-popover" : undefined;

  const chatbotOPen = Boolean(anchorEl3);
  const id3 = chatbotOPen ? "simple-popover" : undefined;

  React.useEffect(() => {
    if (sessionStorage.getItem("UserId") == null) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    sessionStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  const access = JSON.parse(localStorage.getItem("access"));

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const getNotificationCount = async () => {
    try {
      const res = await axios.get(
        `http://10.50.20.89:9091/notifications/count?vendor_account=${sessionStorage.getItem("vend_account")}`,
      );

      console.log(res.data);
      setNotifiationCount(res.data.unread_count);
      sessionStorage.setItem("notificationCount", res.data.unread_count);
      if (
        sessionStorage.getItem("servernotificationCount") !=
        res.data.unread_count
      ) {
        sessionStorage.setItem(
          "servernotificationCount",
          res.data.unread_count,
        );
      }

      // getNotification();
    } catch (err) {
      // const errorMessage =
      //   err.response?.data?.message || err.message || "Login failed";
      // console.log(err);
      // sessionStorage.setItem("errormessge", errorMessage);
      // navigate("/ErrorHandling");
    }
  };

  const getNotification = async () => {
    const payload = {
      vendor_account: sessionStorage.getItem("vend_account"),
    };

    try {
      const res = await axios.post(
        `http://10.50.20.89:9091/notifications/unread`,
        payload,
      );

      console.log(res.data);
      setNotificationList(res.data.notifications);
    } catch (err) {
      // const errorMessage =
      //   err.response?.data?.message || err.message || "Login failed";
      // console.log(err);
      // sessionStorage.setItem("errormessge", errorMessage);
      // navigate("/ErrorHandling");
    }
  };

  React.useEffect(() => {
    if (
      sessionStorage.getItem("notificationCount") !=
        sessionStorage.getItem("servernotificationCount") ||
      sessionStorage.getItem("servernotificationCount") == null ||
      sessionStorage.getItem("servernotificationCount") == 0 ||
      sessionStorage.getItem("servernotificationCount") > 0
    ) {
      // getNotificationCount();
      // getNotification();
    }
  }, []);

  const INACTIVITY_TIME = 2 * 60 * 60 * 1000; // 2 hours

  // const INACTIVITY_TIME = 1 * 60 * 1000; // 1 minute

  React.useEffect(() => {
    let timer;

    const logout = () => {
      sessionStorage.clear();
      localStorage.clear();
      navigate("/");
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, INACTIVITY_TIME);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // open={open}
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          height: "8vh",
        }}
      >
        <Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Grid sx={{ paddingLeft: "22vh", mt: "1.5vh" }}>
              <Box
                component="img"
                src={vendorHub}
                sx={{
                  width: 150,
                  objectFit: "contain",
                }}
              />
              {/* <Typography
                sx={{
                  fontSize: "18px",
                  fontFamily: "Poppins, sans-serif",
                  color: "black",
                }}
              >
                {sessionStorage.getItem("selectnav1")}
              </Typography> */}
            </Grid>
            <Grid
              sx={{
                paddingRight: 5,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton onClick={handleClick2}>
                <Box
                  component="img"
                  src={profile} // Path to your image
                  alt="Notification"
                  sx={{
                    width: 23,
                    height: 23,
                    objectFit: "contain",
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontFamily: "Poppins, sans-serif",
                  color: "black",
                }}
              >
                {sessionStorage.getItem("FullName")}
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          // width: drawer == "miniopen" ? drawerWidth : 60, // 👈 IMPORTANT
          width: 100,
          transition: "width 0.3s",
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            // width: drawer == "miniopen" ? drawerWidth : 60, // 👈 IMPORTANT
            width: 100,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
            border: "none",
            background: "#1F2933",
          },
        }}
      >
        {/* <DrawerHeader></DrawerHeader> */}
        <Grid sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <img
            src={hiQ_logo}
            alt="icon"
            style={{
              height: 56,
              objectFit: "contain",
            }}
          />
        </Grid>

        <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Grid sx={{ p: "3px" }}>
            {menuItems.map((item) => {
              const selected = selectedNav === item.text;

              return (
                <Grid
                  onClick={() => {
                    setSelectedNav(item.text);
                    sessionStorage.setItem("selectnav1", item.text);
                    navigate(`/${item.path}`);
                    sessionStorage.removeItem("searchItem");
                    sessionStorage.setItem("vendor_status", "All");
                  }}
                  sx={{
                    mb: 1.5,
                    borderRadius: "6px",
                    px: "4",
                    py: "12px",
                    background: selected ? "#1B314F" : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 70, // total width control
                    }}
                  >
                    {/* ICON BOX */}
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: selected ? "#0C52BC" : "#4C545C",
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0, // icon size fixed
                      }}
                    >
                      <Box
                        component="img"
                        src={item.activeicon}
                        sx={{
                          width: 20,
                          height: 20,
                          opacity: selected ? 1 : 0.8,
                        }}
                      />
                    </Box>

                    {/* TEXT */}
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.6rem",
                        fontFamily: "Poppins, sans-serif",
                        mt: 0.8,
                        textAlign: "center",
                        wordBreak: "break-word", // long text wrap
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Drawer>
      <Main
        open={open}
        sx={{
          pl: 0,
          bgcolor: "#fafafa",
          pl: 3,
          // height: "100vh",
          overflow: "auto",
          mt: "7vh",
        }}
      >
        {/* <DrawerHeader /> */}
        {children}
      </Main>

      <div>
        <Popover
          id={id}
          open={bellOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 5, // rounded corners
                mt: 1, // small margin from icon
              },
            },
          }}
        >
          <Card
            sx={{
              width: 420,
              borderRadius: 5,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                bgcolor: "#f7faff",
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Notifications
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "#144FEE",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                  fontFamily: "Poppins, sans-serif",
                }}
                onClick={async () => {
                  const payload = {
                    vendor_account: sessionStorage.getItem("vend_account"),
                  };

                  try {
                    await axios.post(
                      `http://10.50.20.89:9091/notifications/read-all`,
                      payload,
                    );
                    console.log();
                    getNotificationCount();
                    getNotification();
                    setAnchorEl(null);
                  } catch (err) {
                    // const errorMessage =
                    //   err.response?.data?.message ||
                    //   err.message ||
                    //   "Login failed";
                    // console.log(err);
                    // sessionStorage.setItem("errormessge", errorMessage);
                    // navigate("/ErrorHandling");
                  }
                }}
              >
                Mark all as read
              </Typography>
            </Box>

            {/* Notification list */}

            <TableContainer>
              <Table>
                <TableBody>
                  {notificationList?.map((item, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f7ff" },
                      }}
                      onClick={async () => {
                        const payload = {
                          notify_id: item.id,
                          vendor_account:
                            sessionStorage.getItem("vend_account"),
                        };

                        try {
                          await axios.post(
                            `http://10.50.20.89:9091/notifications/read`,
                            payload,
                          );

                          sessionStorage.setItem("RFQsToggle", item.tab);
                          sessionStorage.setItem(
                            "searchItem",
                            item.reference_id,
                          );

                          navigate(item.url);
                          window.location.reload();
                        } catch (err) {
                          // const errorMessage =
                          //   err.response?.data?.message ||
                          //   err.message ||
                          //   "Login failed";
                          // console.log(err);
                          // sessionStorage.setItem("errormessge", errorMessage);
                          // navigate("/ErrorHandling");
                        }
                      }}
                    >
                      {/* LEFT SIDE — Title + Description */}
                      <TableCell
                        sx={{ width: "70%", borderBottom: "1px solid #eee" }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            lineHeight: 1.3,
                          }}
                        >
                          <span
                            style={{ fontWeight: 600, fontSize: "0.75rem" }}
                          >
                            {item.message}
                          </span>
                          <span
                            style={{
                              fontWeight: 400,
                              fontSize: "0.65rem",
                              color: "#666",
                              marginLeft: 4,
                            }}
                          >
                            {item.title}
                          </span>
                        </Typography>
                      </TableCell>

                      {/* RIGHT SIDE — Time */}
                      <TableCell
                        align="right"
                        sx={{
                          width: "30%",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.7rem",
                          color: "#999",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {dayjs(item.created_at).format("DD MMM YYYY, hh:mm A")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer */}
            {/* <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  cursor: "pointer",
                  color: "#144FEE",
                  fontFamily: "Poppins, sans-serif",
                  //textDecoration: "underline", // same as link hover
                  "&:hover": {
                    textDecoration: "underline", // hover effect
                  },
                }}
              >
                View all notifications
              </Typography>
            </Box> */}
          </Card>
        </Popover>
      </div>

      <div>
        <Popover
          id={id2}
          open={profileOpen}
          anchorEl={anchorEl2}
          onClose={handleClose2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 5, // rounded corners
                mt: 1, // small margin from icon
              },
            },
          }}
        >
          {/* <Button
            variant='contained'
            sx={{
              textTransform: "none",
              borderRadius: 2,
              bgcolor: "#144FEE",
              color: "white",
              boxShadow: "none",
              "&:hover": { bgcolor: "#144FEE", boxShadow: "none" },
            }}
            onClick={() => {
              navigate("/");
              sessionStorage.clear();
            }}
          >
            ↪ Sign out
          </Button> */}
          <Card
            sx={{
              width: 420,
              borderRadius: 5,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              padding: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 500,
                mb: 1,
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {sessionStorage.getItem("custemail")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 1,
                mb: 2,
              }}
            >
              <Avatar sx={{ width: 56, height: 56, bgcolor: "purple" }}>
                {sessionStorage.getItem("FullName")?.[0]?.toUpperCase()}
              </Avatar>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  mt: 1,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Hi, {sessionStorage.getItem("FullName")} !
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  mt: 1.5,
                  borderRadius: 20,
                  fontSize: 14,
                  color: "#144FEE",
                  fontFamily: "Poppins, sans-serif",
                  border: "1px solid #144FEE",
                }}
                onClick={() => {
                  navigate("/UserModule");
                  sessionStorage.setItem("selectnav1", "My Profile");
                }}
              >
                Access Management
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  bgcolor: "#144FEE",
                  color: "white",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#144FEE", boxShadow: "none" },
                }}
                onClick={() => {
                  navigate("/");
                  sessionStorage.clear();
                }}
              >
                ↪ Sign out
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "gray",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Privacy Policy · Terms of Service
              </Typography>
            </Box>
          </Card>
        </Popover>
      </div>
    </Box>
  );
}
