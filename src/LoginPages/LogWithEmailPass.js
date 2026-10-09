import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  IconButton,
  InputAdornment,
  Modal,
  CircularProgress,
} from "@mui/material";
import left_img from "../Images/Login/Left Image.png";
import right_img from "../Images/Login/Right Image.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const actionButtonStyles = {
  accept: {
    border: "none",
    width: "fit-content",
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

const textFieldStyles = {
  borderRadius: "2px",

  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
    // height: "35px",
    fontFamily: "Poppins, sans-serif",
    // border: "1px solid white",
    // color: "white", // input text color

    // "& .MuiInputBase-input": {
    //   color: "white", // typing text color
    // },

    // "& fieldset": { border: "none" },
    // "&:hover fieldset": { border: "none" },
    // "&.Mui-focused fieldset": { border: "none" },
  },
};

const errorlabelstyle = {
  mt: 0.5,
  fontFamily: "Poppins, sans-serif",
  fontSize: "0.7rem",
  color: "red",
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

export default function LogWithEmailPass() {
  const [modal, setModal] = useState(false);
  const [modalTittle, setModalTittle] = useState("");
  const [modalDesc, setModalDesc] = useState(null);
  const [errors, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlSubmit = async () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter email";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter password";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      Email: email,
      Password: password,
    };

    setLoading(true);

    try {
      const res = await axios.post(
        "http://10.10.0.115:8095/login/login",
        payload,
      );

      if (res.data.status) {
        const roleName = res.data.data.RoleName;

        // Store user details
        sessionStorage.setItem("UserId", res.data.data.UserId);
        sessionStorage.setItem("RoleId", res.data.data.RoleId);
        sessionStorage.setItem("RoleName", roleName);
        sessionStorage.setItem("Email", res.data.data.Email);
        sessionStorage.setItem("Username", res.data.data.Username);
        sessionStorage.setItem("FullName", res.data.data.FullName);

        // Navigate based on role
        if (roleName === "RFQ Management") {
          sessionStorage.setItem("selectnav1", "Home");
          navigate("/Home");
        } else if (roleName === "Risk Assessment" || roleName === "Approver") {
          sessionStorage.setItem("selectnav1", "Prospects");
          navigate("/Prospects");
        } else if (roleName === "Reevaluation") {
          sessionStorage.setItem("selectnav1", "Revaluation");
          navigate("/Revaluation");
        } else {
          navigate("/");
        }
      } else {
        setModal(true);
        setModalTittle("Information");
        setModalDesc(res.data.message);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      setModal(true);
      setModalTittle("Information");
      setModalDesc(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Left Section */}
        <Grid
          size={{ lg: 6, xs: 12, md: 12, sm: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#0C52BC",
            position: "relative",
          }}
        >
          <Box
            component='img'
            src={left_img}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 500,
              objectFit: "contain",
              objectPosition: "left", // 👈 left side align
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              width: "fit-content",
              background: "white",
              zIndex: 100,
              padding: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant='h5'
              sx={{
                mb: 1,
                fontWeight: 500,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Login with Email
            </Typography>

            <Typography
              variant='body2'
              sx={{
                mb: 3,
                fontFamily: "Poppins",
                fontSize: "12px",
              }}
            >
              Verify your email to get started and access the admin dashboard.
            </Typography>

            <Grid sx={{ maxWidth: 400 }}>
              <TextField
                fullWidth
                variant='outlined'
                placeholder='Email'
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input": {
                    cursor: "pointer",
                    cursor: "text",
                  },
                  // "& .MuiOutlinedInput-input": {
                  //   caretColor: "white",
                  // },
                }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }}
              />
              {errors.email && (
                <Typography sx={errorlabelstyle}>{errors.email}</Typography>
              )}
            </Grid>

            <Grid sx={{ maxWidth: 400, mt: 2 }}>
              <TextField
                type={showPassword ? "text" : "password"}
                fullWidth
                variant='outlined'
                placeholder='Password'
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input": {
                    cursor: "text",
                  },
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && (
                <Typography sx={errorlabelstyle}>{errors.password}</Typography>
              )}
            </Grid>

            {/* <Grid sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#1976d2",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
                onClick={() => navigate("/LogWithOTP")}
              >
                Login with OTP
              </Typography>
 
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#1976d2",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
                onClick={() => navigate("/SetPassword")}
              >
                Set Password
              </Typography>
            </Grid> */}

            <Grid sx={{ marginTop: 2 }}>
              <Button
                variant='outlined'
                sx={actionButtonStyles.accept}
                // onClick={handlLogin}
                onClick={() => {
                  //   handlsendOTP();
                  //   setOtp(Array(length).fill(""));

                  handlSubmit();
                }}
              >
                {loading ? "Login..." : "Login"}
              </Button>
            </Grid>
          </Box>
        </Grid>

        <Grid
          size={{ lg: 6, xs: 12, md: 12, sm: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#0C52BC",
            position: "relative",
          }}
        >
          <Box
            component='img'
            src={right_img}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "100%",
              height: 400,
              objectFit: "contain",
              objectPosition: "right", // 👈 left side align
              zIndex: 0,
            }}
          />
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#3D75C9",
              paddingLeft: 2,
            }}
          ></Grid>
        </Grid>
      </Grid>

      <Modal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
            }}
          >
            {modalTittle}
          </Typography>

          <Typography
            id='modal-modal-description'
            sx={{
              mt: 1,
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              color: "#555",
            }}
          >
            {modalDesc}
          </Typography>
          <Grid>
            <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant='contained'
                size='small'
                sx={{
                  boxShadow: "none",
                  backgroundColor: "#FF2E53",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "12px",
                  borderRadius: "4px",
                  padding: "3px 10px",
                  fontFamily: "Poppins, sans-serif",
                  "&:hover": {
                    backgroundColor: "#FF2E53",
                  },
                }}
                onClick={() => {
                  setModal(false);
                }}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
