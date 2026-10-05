import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import loginimg from "../Images/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Loadingbar from "../Loading/Loadingbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loading from "../Loading/Loading";

const textFieldStyles = {
  borderRadius: "2px",

  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
    // height: "35px",
    fontFamily: "Poppins, sans-serif",
    border: "1px solid white",
    color: "white", // input text color

    "& .MuiInputBase-input": {
      color: "white", // typing text color
    },

    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
};

const actionButtonStyles = {
  accept: {
    width: 150,
    backgroundColor: "#FF2E4D",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "4px",
    padding: "6px 20px",
    fontSize: "13px",
    minWidth: "90px",
    height: "32px",
    "&:hover": {
      backgroundColor: "#e62643",
    },
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  border: "none", // remove border
  outline: "none", // remove focus outline
};

const Login = () => {
  sessionStorage.setItem("mini", true);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlLogin = () => {
    setLoading(true);

    const payload = {
      identifier: userName,
      password: password,
    };

    axios
      .post("http://10.50.20.89:9091/auth/login", payload)
      .then((res) => {
        if (!res.data.ok) {
          setLoading(false);
          alert("Invalid username or password");
          return;
        }

        const RoleName = res.data.data.RoleName;

        // Common session values
        sessionStorage.setItem("RoleName", RoleName);
        sessionStorage.setItem("vend_account", res.data.vendor_account);
        sessionStorage.setItem("vend_name", res.data.vendor_name);

        if (RoleName === "RFQ Management") {
          sessionStorage.setItem("selectnav1", "Home");
          navigate("/Home");
          alert("hii");
        } else if (RoleName === "Risk Assessment") {
          sessionStorage.setItem("selectnav1", "Prospects");
          navigate("/Prospects");
        } else if (RoleName === "Approver") {
          alert("hii");
          sessionStorage.setItem("selectnav1", "Prospects");
          navigate("/Prospects");
        } else {
          alert("You are not authorized to access this application.");
          navigate("/");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed");
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Grid container sx={{ minHeight: "98vh" }}>
          {/* Left Section */}
          <Grid
            size={{ lg: 7, xs: 7, md: 7, sm: 7 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#3D75C9",
              paddingLeft: 2,
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 550 }}>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 500,
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Sign in to HiQ Connect
              </Typography>

              <Typography
                variant='body2'
                sx={{
                  mb: 3,
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                }}
              >
                Access your dashboard and manage your work seamlessly.
              </Typography>

              <Grid sx={{ maxWidth: 400 }}>
                <TextField
                  fullWidth
                  variant='outlined'
                  placeholder='Email'
                  sx={{
                    ...textFieldStyles,
                    "& .MuiInputBase-input": {
                      cursor: "pointer", // cursor change
                      cursor: "text",
                    },
                    "& .MuiOutlinedInput-input": {
                      caretColor: "white", // cursor color
                    },
                  }}
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />

                <TextField
                  style={{ marginTop: "10px" }}
                  fullWidth
                  variant='outlined'
                  placeholder='Password'
                  type={showPassword ? "text" : "password"}
                  sx={{
                    ...textFieldStyles,
                    "& input": {
                      caretColor: "#fff", // cursor color
                      "::selection": {
                        backgroundColor: "#fff", // highlight background
                        color: "#000", // selected text color
                      },
                    },
                    "& input:focus": {
                      caretColor: "white",
                    },
                  }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                        >
                          {showPassword ? (
                            <Visibility sx={{ color: "white" }} />
                          ) : (
                            <VisibilityOff sx={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* <Link
                href='#'
                underline='always'
                sx={{
                  fontSize: "0.9rem",
                  mt: 2,
                  mb: 3,
                  display: "inline-block",
                  color: "#2e2e2e",
                  fontFamily: "Poppins",
                  textDecorationColor: "#2e2e2e", // underline color
                }}
              >
                Forgot Password
              </Link> */}

              <Grid sx={{ marginTop: 2 }}>
                <Button
                  variant='outlined'
                  sx={actionButtonStyles.accept}
                  onClick={handlLogin}
                >
                  Log in
                </Button>
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ lg: 5, xs: 5, md: 5, sm: 5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                component='img'
                src={loginimg}
                alt='login illustration'
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Login;
