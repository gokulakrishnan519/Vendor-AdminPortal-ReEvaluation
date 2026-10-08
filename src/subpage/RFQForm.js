import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Divider,
  Paper,
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Autocomplete,
  IconButton,
  Popover,
  Checkbox,
  Stack,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from "../Navbars/Navbar";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

import customParseFormat from "dayjs/plugin/customParseFormat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

dayjs.extend(customParseFormat);

const labelStyle = {
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: "Poppins, sans-serif",
  color: "#2C2C2C",
  marginBottom: "6px",
};

const helperStyle = {
  fontSize: "12px",
  fontStyle: "italic",
  color: "#6B7280",
  marginTop: "6px",
  fontFamily: "Poppins, sans-serif",
};

const compactTextField = {
  backgroundColor: "#Ffff",
  borderRadius: "2px",
  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
    height: "25px",
    fontFamily: "Poppins, sans-serif",
    border: "1px solid #AAAAAA",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
};

const compactTextField1 = {
  backgroundColor: "#Ffff",
  borderRadius: "2px",
  "& .MuiOutlinedInput-root": {
    fontSize: "12px",

    fontFamily: "Poppins, sans-serif",
    border: "1px solid #AAAAAA",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
};

const tableStyles = {
  headerRow: {
    backgroundColor: "#ECEFF4",
    py: "0px",
  },

  subHeaderRow: {
    backgroundColor: "#ECEFF4",
    py: "0px",
  },

  headerCell: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    color: "#333",
    border: "1px solid #DDDEE0",
    py: "2px",
    whiteSpace: "nowrap",
  },

  bodyCell: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "12px",
    color: "#444",
    backgroundColor: "#fff",
    whiteSpace: "nowrap",
  },

  autoFillButton: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "12px",
    textTransform: "none",
  },
};

const textStyle = {
  fontFamily: "Poppins, sans-serif",
};

// const labelStyle = {
//   fontFamily: "Poppins, sans-serif",
//   fontSize: "12px",
//   fontWeight: 600,
//   color: "#2E2E2E",
// };

const valueStyle = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "12px",
  fontWeight: 400,
  color: "#555",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
  border: "none",
  outline: "none",
};

const AutocompleteinputStyle = {
  "& .MuiInputBase-input": {
    fontSize: "0.7rem",
    fontFamily: "Poppins, sans-serif",
    padding: "4px 6px",
  },

  "& .MuiOutlinedInput-root": {
    height: "25px",
    backgroundColor: "#Ffff",

    // default
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #AAAAAA",
      borderWidth: "0.5px",
    },

    // ✅ hover
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #AAAAAA",
    },

    // focus
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #AAAAAA",
      borderWidth: "0.6px",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
};

const autocompletePaperStyle = {
  fontSize: "0.7rem",
  fontFamily: "Poppins, sans-serif",
  overflowY: "auto",
};

export default function RFQForm() {
  const [formData, setFormData] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [tableData, setTableData] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryTerm, setDeliveryTerm] = useState("");
  const [modeofDelivery, setModeDelivery] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [methodofPayment, setMethodofPayment] = useState("");
  const [remarks, setRemarks] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const [deliveryTermList, setDeliveryTermList] = useState([
    { key: "C&F", text: "Cost and freight" },
    { key: "DAP", text: "Deliver At Place" },
    { key: "EXW", text: "EX WORKS" },
    { key: "FCA", text: "Free carrier upto airport" },
    { key: "FOB", text: "Free on board" },
  ]);
  const [modeofDeliveryList, setModeofDeliveryList] = useState([
    { key: "BY ROAD", text: "By 2 or 4 wheeler" },
    { key: "BY AIR", text: "By AIR BANGALORE AIRPORT" },
    { key: "BY SEA", text: "BY SEA CHENNAI SEA PORT" },
    { key: "BY SEA B", text: "BY SEA ICD BANGALORE" },
    { key: "GATE DLVRY", text: "Customer Pickup" },
  ]);
  const [paymentList, setPaymentList] = useState([]);
  const [methodPaymentList, setMethodPaymendList] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [remarkIndex, setRemarkIndex] = useState("");
  const [remarkIndexValue, setRemarkIndexValue] = useState("");

  const [popverValue, setPopoverValue] = useState(null);
  const [points, setPoints] = useState(null);

  const handlePopoverOpen = (event, comment, termscondition) => {
    if (termscondition == "termscondition") {
      setPoints(
        formData?.termsandconditions != null
          ? formData?.termsandconditions.split(/\d+\./).filter(Boolean)
          : "",
      );
      setPopoverValue(null);
    } else {
      setPoints(null);
      setPopoverValue(comment);
    }
    // setPoints(null);
    // setPopoverValue(comment);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  console.log(tableData);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };
  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const getPoLineItem = async () => {
    setLoading(true);
    const payload = {
      vendor_account: sessionStorage.getItem("vend_account"),
      rfq_id: sessionStorage.getItem("rfq_id"),
    };

    try {
      const res = await axios.post(
        "http://10.10.0.115:8095/rfqfetch/rfq-detail",
        payload,
      );

      console.log(res.data);

      setFormData(res.data.data);
      // setTableData(res.data.data.items);

      setTableData(
        res.data.data.items.map((item) => ({
          ...item,
          // lineStatus: true, // default value
        })),
      );

      setDeliveryDate(dayjs(res.data.data.saved_reply_delivery_date));

      setModeDelivery(res.data.data.saved_reply_mode_of_delivery);
      setDeliveryTerm(res.data.data.saved_reply_delivery_terms);
      setPaymentTerm(res.data.data.saved_terms_of_payment);
      setMethodofPayment(res.data.data.saved_method_of_payment);
      setRemarks(res.data.data.saved_vendor_comments);

      setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const getMasterList = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://10.10.0.115:8095/dropdown/list");

      console.log(res.data);

      // setFormData(res.data.data);
      // setTableData(res.data.data.items);

      // setModeofDeliveryList(res.data.data.delivery_modes);
      // setDeliveryTermList(res.data.data.delivery_terms);
      setPaymentList(res.data.data.payment_terms);
      setMethodPaymendList(res.data.data.payment_modes);

      setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPoLineItem();
    getMasterList();
  }, []);

  useEffect(() => {
    if (!formData?.closing_date) return;

    const [day, month, year] = formData.closing_date.split("/");

    const target = new Date(year, month - 1, day, 23, 59, 59);

    let interval; // declare first

    const updateTimer = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Closed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(days).padStart(2, "0")}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`,
      );
    };

    updateTimer();
    interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [formData?.closing_date]);

  console.log(tableData);

  const handleChange = (index, key, value) => {
    const updated = [...tableData];
    updated[index][key] = value;
    setTableData(updated);
  };

  const handleConfirm = async (btn_sts) => {
    setLoading(true);
    const payload = {
      confirmSave: btn_sts,
      rfqCaseId: formData?.rfq_case_id,
      documentTitle: formData?.document_title,
      rfqId: formData?.rfq_id,
      expiryDate: formData?.closing_date,
      receiptDate: "",
      modeOfDelivery: formData?.mode_of_delivery,
      DeliveryTerms: formData?.delivery_term,
      methodOfPayment: formData?.method_of_payment,
      termsOfPayment: formData?.payment_term,
      currency: "INR",
      vendorAccount: sessionStorage.getItem("vend_account"),
      bidType: "Open",
      isSealed: false,
      Item: tableData
        // .filter((item) => item.unit_price) // remove items with 0, null, undefined
        .map((item, index) => ({
          itemNumber: item.material_code,
          quantity: item.quantity,
          unitOfMeasure: item.uom,
          unitPrice:
            item.unit_price == null || item.unit_price == ""
              ? 0
              : item.unit_price,
          netAmount: item.unit_price * item.quantity,
          vendorComments: item.remarks,
          lineNumber: item.sl_no,
          sl_no: item.sl_no,
          lineStatus: item.lineStatus,
        })),
      vendorComments: remarks,
      replyDeliveryTerms: deliveryTerm,
      replyDeliveryDate: dayjs(deliveryDate).isValid()
        ? dayjs(deliveryDate).format("YYYY-MM-DD")
        : "",
      replyModeOfDelivery: modeofDelivery,
    };

    try {
      const res = await axios.post(
        "http://10.10.0.115:8095/rfq/reply",
        payload,
      );

      console.log(res.data);
      setOpen(true);
      setModalTittle(
        btn_sts == "save_progress"
          ? "Drafted Successfully"
          : "Submitted Succesfully",
      );
      setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Grid sx={{ position: "absolute", top: 60 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ color: "black" }} />
            </IconButton>
          </Grid>

          <Box sx={{ px: 10 }}>
            <Grid sx={{ background: "#fff", padding: 2 }}>
              {/* ================= HEADER ================= */}
              <Card
                variant='outlined'
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#dbe5f4",
                  border: "1px solid #c2d1ea",
                  mb: 2,
                }}
              >
                <Grid container alignItems='center'>
                  {/* LEFT SIDE */}
                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
                    <Typography
                      sx={{
                        ...textStyle,
                        fontSize: "24px",
                        fontWeight: 500,
                      }}
                    >
                      {formData?.rfq_id}
                    </Typography>

                    <Box mt={1} display='flex' gap={4} flexWrap='wrap'>
                      <Typography sx={valueStyle}>
                        <strong>Issue Date :</strong> {formData?.issue_date}
                      </Typography>

                      <Typography sx={valueStyle}>
                        <strong>Closing Date : </strong>
                        {formData?.closing_date}
                      </Typography>

                      {/* <Typography sx={valueStyle}>
                    <strong>Status:</strong> In Progress
                  </Typography> */}
                    </Box>
                  </Grid>

                  {/* RIGHT SIDE TIMER */}
                  <Grid
                    size={{ xs: 12, sm: 12, md: 12, lg: 4 }}
                    display='flex'
                    justifyContent={{ lg: "flex-end", xs: "flex-start" }}
                    mt={{ xs: 3, lg: 0 }}
                  >
                    <Paper
                      variant='outlined'
                      sx={{
                        p: 1,
                        borderRadius: 3,
                        minWidth: 220,
                        textAlign: "center",
                        backgroundColor: "#eef2f8",
                      }}
                    >
                      <Typography
                        sx={{ ...textStyle, fontSize: "14px", color: "#666" }}
                      >
                        Time remaining
                      </Typography>

                      <Typography
                        sx={{
                          ...textStyle,
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        {timeLeft}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Card>

              {/* ================= RFQ DETAILS ================= */}
              <Card
                variant='outlined'
                sx={{
                  p: 2,
                  backgroundColor: "#F2F6FC",
                }}
              >
                <Typography
                  sx={{
                    ...textStyle,
                    fontSize: "15px",
                    fontWeight: 500,
                    mb: 2,
                  }}
                >
                  RFQ Details
                </Typography>

                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>RFQ Case</Typography>
                    <Typography sx={valueStyle}>
                      {formData?.rfq_case_id}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>
                      Expected Delivery Date
                    </Typography>
                    <Typography sx={valueStyle}>
                      {" "}
                      {formData?.expected_delivery_date}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>Document Title</Typography>
                    <Typography sx={valueStyle}>
                      {formData?.document_title}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>Payment Term</Typography>
                    <Typography sx={valueStyle}>
                      {" "}
                      {formData?.payment_term}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>Delivery Term</Typography>
                    <Typography sx={valueStyle}>
                      {formData?.delivery_term}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>Mode of Delivery</Typography>
                    <Typography sx={valueStyle}>
                      {formData?.mode_of_delivery}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>Method of Payment</Typography>
                    <Typography sx={valueStyle}>
                      {formData?.method_of_payment}
                    </Typography>
                  </Grid>

                  {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                <Typography sx={labelStyle}>Reason Code</Typography>
                <Typography sx={valueStyle}>{formData?.document_title}</Typography>
              </Grid> */}

                  {/* {formData?.termsandconditions == null ? (
                    ""
                  ) : ( */}
                  <Grid
                    size={{ xs: 12 }}
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup='true'
                    onClick={(e) => {
                      handlePopoverOpen(
                        e,
                        formData?.termsandconditions == null
                          ? "No Data"
                          : formData?.termsandconditions,
                        "termscondition",
                      );
                    }}
                    // onMouseLeave={handlePopoverClose}
                  >
                    <Typography sx={labelStyle}>Terms & Conditions</Typography>
                    <Typography
                      sx={{
                        ...valueStyle,
                        color: "#1565c0",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      View Terms & Conditions
                    </Typography>
                  </Grid>
                  {/* )} */}

                  <Popover
                    id='mouse-over-popover'
                    open={open1}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        boxShadow: "none",
                        border: "1px solid #E0E0E0",
                        borderRadius: "8px",
                        mt: -3, // 👈 popover top-ku move aagum
                      },
                    }}
                  >
                    <Box
                      sx={{
                        py: 2,
                        px: 4,
                        overflow: "auto",
                        maxHeight: "60vh",
                        width: "70vh",
                      }}
                    >
                      <Grid sx={{ position: "absolute", right: 10, top: 10 }}>
                        <CloseIcon
                          onClick={handlePopoverClose}
                          sx={{ cursor: "pointer", fontSize: "1rem" }}
                        />
                      </Grid>

                      {/* {points != null
                        ? */}

                      {points &&
                        points?.map((item, index) => (
                          <>
                            <Typography
                              key={index}
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.8rem",
                              }}
                            >
                              {index}. {item.trim()}
                            </Typography>
                            <br />
                          </>
                        ))}

                      {/* : popverValue} */}

                      {popverValue && (
                        <Typography
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {popverValue}
                        </Typography>
                      )}
                    </Box>
                  </Popover>
                </Grid>
              </Card>

              <Card
                variant='outlined'
                sx={{
                  mt: 1,
                  p: 2,
                  backgroundColor: "#F2F6FC",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: "20px",
                  }}
                >
                  Reply to RFQ
                </Typography>

                <Grid container spacing={3}>
                  {/* Delivery Date */}
                  <Grid size={{ lg: 4, xs: 12, md: 12, sm: 12 }}>
                    <Typography sx={labelStyle}>Delivery Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ border: "none" }}
                        // minDate={dayjs()}
                        format='DD-MM-YYYY'
                        // ✅ ERROR HANDLING HERE (NOT inside slotProps)
                        value={deliveryDate}
                        onChange={(date) => {
                          setDeliveryDate(date);
                          // setError((prev) => ({ ...prev, challanDate: "" }));
                        }}
                        slotProps={{
                          textField: {
                            // backgroundColor: "white",
                            variant: "standard",
                            sx: {
                              // backgroundColor: "#fff", // ✅ ADD THIS
                              border: "1px solid #AAAAAA",
                              backgroundColor: "#fff",
                              borderRadius: "4px",
                            },

                            InputProps: {
                              disableUnderline: true,
                              // backgroundColor: "white",
                              border: "none",
                              fontFamily: "Times New Roman !important",
                              sx: {
                                padding: "6px",
                                fontFamily: "Times New Roman",
                                fontSize: "0.8rem",
                                border: "none",
                                height: 25,
                                "& .MuiInputBase-input": {
                                  padding: "2px 6px",
                                  fontSize: "0.5rem",
                                  fontFamily: "Times New Roman !important",
                                  border: "none",
                                },
                                "& .MuiSvgIcon-root": {
                                  fontSize: "1rem",
                                  fontFamily: "Times New Roman !important",
                                },
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <Typography sx={helperStyle}>
                      Expected by HiQ :{" "}
                      {dayjs(
                        formData?.expected_delivery_date,
                        "DD/MM/YYYY",
                        true,
                      ).format("Do MMMM YYYY")}
                    </Typography>
                  </Grid>

                  {/* Delivery Term */}
                  <Grid size={{ lg: 4, xs: 12, md: 12, sm: 12 }}>
                    <Typography sx={labelStyle}>Delivery Term</Typography>

                    <Autocomplete
                      fullWidth
                      options={deliveryTermList}
                      value={
                        deliveryTermList.find(
                          (item) => item.key === deliveryTerm,
                        ) || null
                      }
                      getOptionLabel={(option) =>
                        `${option.key} - ${option.text}`
                      }
                      onChange={(event, value) => {
                        setDeliveryTerm(value?.key || "");
                      }}
                      PaperComponent={({ children }) => (
                        <Paper sx={autocompletePaperStyle}>{children}</Paper>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} sx={AutocompleteinputStyle} />
                      )}
                    />
                    <Typography sx={helperStyle}>
                      Expected by HiQ : {formData?.delivery_term}
                    </Typography>
                  </Grid>

                  {/* Mode of Delivery */}
                  <Grid size={{ lg: 4, xs: 12, md: 12, sm: 12 }}>
                    <Typography sx={labelStyle}>Mode of Delivery</Typography>

                    <Autocomplete
                      fullWidth
                      options={modeofDeliveryList}
                      value={
                        modeofDeliveryList.find(
                          (item) => item.key === modeofDelivery,
                        ) || null
                      }
                      getOptionLabel={(option) =>
                        `${option.key} - ${option.text}`
                      }
                      onChange={(event, value) => {
                        setModeDelivery(value?.key || "");
                      }}
                      PaperComponent={({ children }) => (
                        <Paper sx={autocompletePaperStyle}>{children}</Paper>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} sx={AutocompleteinputStyle} />
                      )}
                    />
                    <Typography sx={helperStyle}>
                      Expected by HiQ :{" "}
                      {formData?.mode_of_delivery == null
                        ? "Not Specified"
                        : formData?.mode_of_delivery}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid sx={{ mt: 1 }}>
                  <TableContainer>
                    <Table>
                      {/* Top Header */}
                      <TableHead>
                        <TableRow sx={tableStyles.headerRow}>
                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Sl No
                          </TableCell>
                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Select
                          </TableCell>
                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Status
                          </TableCell>

                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Material Description
                          </TableCell>
                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Material Code
                          </TableCell>

                          <TableCell
                            align='center'
                            colSpan={4}
                            sx={tableStyles.headerCell}
                          >
                            HiQ Requirement
                          </TableCell>

                          <TableCell
                            align='center'
                            colSpan={3}
                            sx={tableStyles.headerCell}
                          >
                            Your Response
                          </TableCell>
                        </TableRow>

                        <TableRow sx={tableStyles.subHeaderRow}>
                          <TableCell sx={tableStyles.headerCell}>
                            Quantity
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>UOM</TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            Target Price
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            Comments
                          </TableCell>

                          <TableCell sx={tableStyles.headerCell}>
                            {/* Unit Price <span style={{ color: "red" }}>*</span> */}
                            Unit Price
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            Net Amount
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            Remarks
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      {tableData &&
                        tableData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell sx={tableStyles.bodyCell}>
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{ ...tableStyles.bodyCell, pt: 0, pb: 0 }}
                            >
                              <Checkbox
                                disabled={!item.unit_price}
                                checked={item.lineStatus}
                                onChange={(e) => {
                                  const updated = [...tableData];
                                  updated[index].lineStatus = e.target.checked;
                                  setTableData(updated);
                                }}
                              />
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.unit_price
                                ? item.lineStatus
                                  ? "Confirmed"
                                  : "Save"
                                : ""}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.material_description}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.material_code}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell} align='right'>
                              {item.quantity}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.uom}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell} align='right'>
                              {Number(item.target_price).toFixed(2)}
                            </TableCell>

                            <TableCell
                              sx={tableStyles.bodyCell}
                              style={{
                                cursor:
                                  item.comments?.length > 20
                                    ? "pointer"
                                    : "default",
                              }}
                              onClick={
                                item.comments?.length > 20
                                  ? (e) => handlePopoverOpen(e, item.comments)
                                  : undefined
                              }
                              // onMouseLeave={handlePopoverClose}
                            >
                              {item.comments?.length > 20
                                ? `${item.comments.slice(0, 20)}...`
                                : item.comments}
                            </TableCell>

                            {/* Unit Price */}
                            <TableCell
                              sx={{ backgroundColor: "#fff", width: "40%" }}
                            >
                              <TextField
                                size='small'
                                type='number'
                                placeholder='Enter unit price'
                                value={item.unit_price ?? ""}
                                sx={{
                                  ...compactTextField,
                                  width: 120,

                                  "& input[type=number]": {
                                    MozAppearance: "textfield",
                                  },
                                  "& input[type=number]::-webkit-outer-spin-button":
                                    {
                                      WebkitAppearance: "none",
                                      margin: 0,
                                    },
                                  "& input[type=number]::-webkit-inner-spin-button":
                                    {
                                      WebkitAppearance: "none",
                                      margin: 0,
                                    },
                                }}
                                inputProps={{
                                  step: "any", // decimal allow
                                }}
                                onKeyDown={(e) => {
                                  if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                onChange={(e) => {
                                  const value = e.target.value;

                                  const updated = [...tableData];

                                  updated[index].unit_price =
                                    value === "" ? "" : parseFloat(value);
                                  updated[index].lineStatus =
                                    value === "" ? false : true;

                                  setTableData(updated);
                                }}
                              />
                            </TableCell>

                            {/* Autofill = unit_price * quantity */}
                            <TableCell sx={tableStyles.bodyCell} align='right'>
                              {((item.unit_price || 0) * item.quantity).toFixed(
                                2,
                              )}
                            </TableCell>

                            {/* Remarks */}
                            <TableCell
                              sx={{ backgroundColor: "#fff", width: "40%" }}
                              // onMouseEnter={
                              //   item.remarks?.length > 10
                              //     ? (e) => handlePopoverOpen(e, item.remarks)
                              //     : undefined
                              // }
                              // onDoubleClick={(e) => {
                              //   handlePopoverOpen(e, item.remarks);
                              // }}
                            >
                              <Stack
                                direction='row'
                                alignItems='center'
                                spacing={1}
                              >
                                <TextField
                                  size='small'
                                  placeholder='Enter your remarks'
                                  value={item.remarks || ""}
                                  sx={{
                                    ...compactTextField,
                                    minWidth: 120,
                                    transition: "width 0.2s ease",
                                  }}
                                  // onChange={(e) =>
                                  //   handleChange(
                                  //     index,
                                  //     "remarks",
                                  //     e.target.value,
                                  //   )
                                  // }
                                  onClick={(e) => {
                                    handlePopoverOpen2(e);
                                    setRemarkIndex(index);
                                    setRemarkIndexValue(item.remarks);
                                  }}
                                />

                                {/* <InfoOutlinedIcon
                                  sx={{ cursor: "pointer", color: "#1976d2" }}
                                  onClick={(e) => {
                                    if (item.remarks != "") {
                                      handlePopoverOpen(e, item.remarks);
                                    }
                                  }}
                                /> */}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 500,
                      fontFamily: "Poppins, sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    Remarks
                  </Typography>
                  <Grid>
                    <TextField
                      fullWidth
                      sx={compactTextField1}
                      multiline
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>

              <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {/* {tableData?.some((item) => item.unit_price) ? ( */}
                <Box display='flex' gap={3}>
                  <Button
                    sx={actionButtonStyles.accept}
                    onClick={() => {
                      handleConfirm("confirmSave");
                    }}
                  >
                    Submit
                  </Button>

                  {/* <Button
                    variant='outlined'
                    sx={actionButtonStyles.reject}
                    onClick={() => {
                      handleConfirm("save_progress");
                    }}
                  >
                    Save Progress
                  </Button> */}
                </Box>
                {/* ) : null} */}
              </Grid>
            </Grid>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  mb: 3,
                }}
              >
                {modalTittle}
              </Typography>

              <Button
                variant='contained'
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  textTransform: "none",
                  px: 4,
                }}
                onClick={() => {
                  handleClose();
                  navigate("/RFQs");
                  sessionStorage.setItem("selectnav1", "RFQs");
                }}
              >
                OK
              </Button>
            </Box>
          </Modal>

          <Popover
            id='mouse-over-popover'
            open={open2}
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            onClose={handleClose}
            PaperProps={{
              sx: {
                boxShadow: "none",
                border: "1px solid #E0E0E0",
                borderRadius: "8px",
              },
            }}
          >
            <Box
              sx={{
                py: 2,
                px: 4,
                overflow: "auto",
                maxHeight: "60vh",
                width: "70vh",
              }}
            >
              {/* Heading */}
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Remark
              </Typography>

              <Grid>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  value={remarkIndexValue}
                  sx={{ ...compactTextField1 }}
                  onChange={(e) => {
                    const value = e.target.value;

                    setRemarkIndexValue(value);

                    setTableData((prev) =>
                      prev.map((row, index) =>
                        index === remarkIndex
                          ? { ...row, remarks: value }
                          : row,
                      ),
                    );
                  }}
                />
              </Grid>

              {/* OK Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  variant='contained'
                  size='small'
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                  onClick={handlePopoverClose}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </Popover>
        </Navbar>
      )}
    </div>
  );
}

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

  reject: {
    width: 150,
    border: "1.5px solid #FF2E4D",
    color: "#FF2E4D",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "4px",
    padding: "6px 20px",
    fontSize: "13px",
    minWidth: "90px",
    height: "32px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(255,46,77,0.08)",
    },
  },
};
