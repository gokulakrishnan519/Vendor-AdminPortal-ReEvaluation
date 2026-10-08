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
import loginimg from "../Images/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Loadingbar from "../Loading/Loadingbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loading from "../Loading/Loading";
import left_img from "../Images/Login/Left Image.png";
import right_img from "../Images/Login/Right Image.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const errorlabelstyle = {
  mt: 0.5,
  fontFamily: "Poppins, sans-serif",
  fontSize: "0.7rem",
  color: "red",
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

const LogWithOTP = () => {
  sessionStorage.setItem("mini", true);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [modal, setModal] = useState(false);
  const [modalTittle, setModalTittle] = useState("");
  const [modalDesc, setModalDesc] = useState(null);

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const [errors, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 1

  useEffect(() => {
    setTimeLeft(120);
  }, [stage]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    inputs.current[0]?.focus();
  }, [stage]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // 👉 remove OTP error when user starts typing
    setError((prev) => ({
      ...prev,
      otp: "",
    }));

    // auto focus next
    if (value && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Paste full OTP
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp([...newOtp, ...Array(length - newOtp.length).fill("")]);

    const focusIndex = newOtp.length - 1;
    inputs.current[focusIndex]?.focus();
  };

  const handlsendOTP = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const payload = {
        identifier: email,
        channel: "email",
      };

      axios
        .post("http://10.10.0.115:8095/auth/otp/send", payload)
        .then((res) => {
          if (res.data.ok == true) {
            setLoading(false);
            setStage(2);
          } else {
            setModal(true);
            setModalTittle("Information");
            setModalDesc(res.data.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message || err.message || "Login failed";
          // console.log(err);
          // sessionStorage.setItem("errormessge", errorMessage);
          // navigate("/ErrorHandling");
          setModal(true);
          setModalTittle("Information");
          setModalDesc(errorMessage);
          setLoading(false);
        });
    }
  };

  const sendOTP = async () => {
    console.log(otp);

    let newErrors = {};

    if (otp.some((digit) => digit === "")) {
      newErrors.otp = "Please Enter OTP";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        identifier: email,
        channel: "email",
        otp_code: otp.join(""),
      };

      console.log(payload);

      try {
        const res = await axios.post(
          `http://10.10.0.115:8095/auth/otp/verify`,
          payload,
        );

        console.log(res.data);
        if (res.data.ok == true) {
          navigate("/Home");
          sessionStorage.setItem("vend_account", res.data.vendor_account);
          sessionStorage.setItem("vend_name", res.data.vendor_name);
          sessionStorage.setItem("selectnav1", "Home");

          setLoading(false);
        } else {
          setModal(true);
          setModalTittle("Information");
          setModalDesc(res.data.message);
          setLoading(false);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Login failed";

        setModal(true);
        setModalTittle("Information");
        setModalDesc(errorMessage);
        setLoading(false);
      }
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
            {stage == 2 && (
              <ArrowBackIcon
                onClick={() => {
                  setStage(1);
                }}
                sx={{ cursor: "pointer" }}
              />
            )}

            <Typography
              variant='h5'
              sx={{
                mb: 1,
                fontWeight: 500,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Sign in with OTP
            </Typography>

            <Typography
              variant='body2'
              sx={{
                mb: 3,
                fontFamily: "Poppins",
                fontSize: "12px",
              }}
            >
              Access your dashboard and manage your work seamlessly.
            </Typography>

            {stage == 1 ? (
              <>
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

                <Grid sx={{ display: "flex", gap: 2, mt: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "14px",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Login with Email
                  </Typography>
                </Grid>

                <Grid sx={{ marginTop: 2 }}>
                  <Button
                    variant='outlined'
                    sx={actionButtonStyles.accept}
                    // onClick={handlLogin}
                    onClick={() => {
                      handlsendOTP();
                      setOtp(Array(length).fill(""));
                    }}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      value={digit}
                      inputRef={(el) => (inputs.current[index] = el)}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: "20px",
                          // fontWeight: "bold",
                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                      sx={{
                        ...textFieldStyles,
                        width: 55,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          background: "#eef1f6",
                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                    />
                  ))}
                </Box>
                {errors.otp && (
                  <Typography sx={errorlabelstyle}>{errors.otp}</Typography>
                )}

                <Typography
                  sx={{
                    mt: 1,
                    color: "#FF4D4F",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {timeLeft > 0
                    ? `OTP expires in: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                    : "OTP expired. Please resend OTP."}
                </Typography>

                <Typography
                  onClick={() => {
                    if (timeLeft === 0) {
                      handlsendOTP();
                      setOtp(Array(length).fill(""));
                      setTimeLeft(60);
                    }
                  }}
                  sx={{
                    mt: 1,
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: timeLeft > 0 ? "#9e9e9e" : "#1976d2",
                    cursor: timeLeft > 0 ? "not-allowed" : "pointer",
                    textDecoration: timeLeft > 0 ? "none" : "underline",
                    display: "inline-block",
                  }}
                >
                  {loading ? "Resend..." : "Resend"}
                </Typography>

                <Grid sx={{ marginTop: 2 }}>
                  <Button
                    variant='outlined'
                    sx={actionButtonStyles.accept}
                    onClick={() => {
                      sendOTP();
                    }}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </Button>
                </Grid>
              </>
            )}
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
          >
            {/* <Box
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
              </Box> */}
          </Grid>
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
};

export default LogWithOTP;
