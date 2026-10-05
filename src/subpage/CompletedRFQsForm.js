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
  Chip,
  IconButton,
  Popover,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from "../Navbars/Navbar";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import customParseFormat from "dayjs/plugin/customParseFormat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../Loading/Loading";
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

export default function CompletedRFQsForm() {
  const [formData, setFormData] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [tableData, setTableData] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState();
  const [deliveryTerm, setDeliveryTerm] = useState("");
  const [modeofDelivery, setModeDelivery] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [methodofPayment, setMethodofPayment] = useState("");
  const [remarks, setRemarks] = useState("");
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

  const location = useLocation();

  const locationName = location.pathname;

  console.log(locationName);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [popverValue, setPopoverValue] = useState(null);

  const handlePopoverOpen = (event, comment) => {
    setPopoverValue(comment);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open1 = Boolean(anchorEl);

  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const getPoLineItem = async () => {
    setLoading(true);
    const payload = {
      vendor_account: sessionStorage.getItem("vend_account"),
      rfq_id: sessionStorage.getItem("rfq_id"),
    };

    try {
      const res = await axios.post(
        sessionStorage.getItem("fromtab") == "Completed Bid Status"
          ? "http://10.50.20.89:9091/rfq/completed-detail"
          : sessionStorage.getItem("fromtab") == "Expired"
            ? "http://10.50.20.89:9091/expiry/expired-detail"
            : "http://10.50.20.89:9091/sub/completed-detail",
        payload,
      );

      console.log(res.data);

      setFormData(res.data.data);
      setTableData(res.data.data.line_items);
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
  }, []);

  console.log(tableData);

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
          <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 10 } }}>
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
                        <strong>Issue Date:</strong> {formData?.issue_date}
                      </Typography>

                      <Typography sx={valueStyle}>
                        <strong>Closing Date:</strong>
                        {formData?.closing_date}
                      </Typography>

                      {/* <Typography sx={valueStyle}>
                    <strong>Status:</strong> In Progress
                  </Typography> */}
                    </Box>
                  </Grid>

                  {/* RIGHT SIDE TIMER */}
                  {/* <Grid
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
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    {timeLeft}
                  </Typography>
                </Paper>
              </Grid> */}
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
                      {formData?.delivery_date}
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
                      {formData?.delivery_mode}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                    <Typography sx={labelStyle}>Method of Payment</Typography>
                    <Typography sx={valueStyle}>
                      {formData?.payment_mode}
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
                      handlePopoverOpen(e, formData?.termsandconditions);
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
                    PaperProps={{
                      sx: {
                        boxShadow: "none",
                        border: "1px solid #E0E0E0",
                        borderRadius: "8px",
                        mt: -3, // 👈 popover top-ku move aagum
                      },
                    }}
                  >
                    {/* Content */}
                    <Box
                      sx={{
                        py: 2,
                        px: 4,

                        overflow: "auto",
                        maxHeight: "90vh",
                      }}
                    >
                      <Grid sx={{ position: "absolute", right: 5, top: 5 }}>
                        <CloseIcon
                          onClick={handlePopoverClose}
                          sx={{ cursor: "pointer", fontSize: "1.2rem" }}
                        />
                      </Grid>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",
                        }}
                      >
                        {popverValue}
                      </Typography>
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
                    <TextField
                      disabled
                      fullWidth
                      size='small'
                      sx={compactTextField}
                      value={
                        formData?.reply_delivery_date == "01/01/1900"
                          ? ""
                          : formData?.reply_delivery_date
                      }
                    />
                    <Typography sx={helperStyle}>
                      Expected by HiQ :{" "}
                      {dayjs(
                        formData?.delivery_date,
                        "DD/MM/YYYY",
                        true,
                      ).format("Do MMMM YYYY")}
                    </Typography>
                  </Grid>

                  {/* Delivery Term */}
                  <Grid size={{ lg: 4, xs: 12, md: 12, sm: 12 }}>
                    <Typography sx={labelStyle}>Delivery Term</Typography>
                    <TextField
                      disabled
                      fullWidth
                      size='small'
                      sx={compactTextField}
                      value={
                        deliveryTermList.find(
                          (item) => item.key === formData?.reply_delivery_term,
                        )?.text || ""
                      }
                    />
                    <Typography sx={helperStyle}>
                      Expected by HiQ : {formData?.delivery_term}
                    </Typography>
                  </Grid>

                  {/* Mode of Delivery */}
                  <Grid size={{ lg: 4, xs: 12, md: 12, sm: 12 }}>
                    <Typography sx={labelStyle}>Mode of Delivery</Typography>

                    <TextField
                      disabled
                      fullWidth
                      size='small'
                      sx={compactTextField}
                      value={
                        modeofDeliveryList.find(
                          (item) => item.key === formData?.reply_delivery_mode,
                        )?.text || ""
                      }
                    />

                    <Typography sx={helperStyle}>
                      Expected by HiQ : {formData?.delivery_mode}
                    </Typography>
                  </Grid>

                  {/* Payment Term */}
                  {/* <Grid size={{ lg: 2.4, xs: 12, md: 12, sm: 12 }}>
                <Typography sx={labelStyle}>Payment Term</Typography>
                <TextField
                  fullWidth
                  size='small'
                  sx={compactTextField}
                  value={formData?.reply_payment_term}
                />
                <Typography sx={helperStyle}>
                  Expected by HiQ: Not specified
                </Typography>
              </Grid> */}

                  {/* Method of Payment */}
                  {/* <Grid size={{ lg: 2.4, xs: 12, md: 12, sm: 12 }}>
                <Typography sx={labelStyle}>Method of Payment</Typography>
                <TextField
                  fullWidth
                  size='small'
                  sx={compactTextField}
                  //   value={formData?.reply_payment_term}
                />
                <Typography sx={helperStyle}>
                  Expected by HiQ: Not specified
                </Typography>
              </Grid> */}
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
                            Material Description
                          </TableCell>
                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Material Code
                          </TableCell>
                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Status
                          </TableCell>

                          <TableCell rowSpan={2} sx={tableStyles.headerCell}>
                            Currency
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

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.item_name}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.item_id}
                            </TableCell>

                            <TableCell
                              sx={tableStyles.bodyCell}
                              style={{ padding: "1px" }}
                            >
                              <Chip
                                label={item.hiq_decision}
                                size='small'
                                sx={{
                                  fontSize: "12px",
                                  ml: 2,
                                  px: 0.5,
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 500,
                                  borderRadius: "10px",

                                  backgroundColor:
                                    DECISION_COLOR[item.hiq_decision]?.bg,
                                  color:
                                    DECISION_COLOR[item.hiq_decision]?.text,
                                  // border: `1px solid ${
                                  //   DECISION_COLOR[item.hiq_decision]?.border
                                  // }`,
                                }}
                              />
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.currency}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell} align='right'>
                              {item.quantity}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.uom}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell} align='right'>
                              {Number(item.target_price) === 0
                                ? "-"
                                : Number(item.target_price).toFixed(2)}
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
                              sx={tableStyles.bodyCell}
                              style={{ backgroundColor: "#fff", width: "40%" }}
                              align='right'
                            >
                              {item.unit_price == 0
                                ? "-"
                                : item.unit_price.toFixed(2)}
                              {/* <TextField
                            size='small'
                            type='number'
                            placeholder='Enter unit price'
                            value={item.unit_price || ""}
                            sx={{ ...compactTextField, width: 120 }}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "unit_price",
                                Number(e.target.value),
                              )
                            }
                          /> */}{" "}
                              {/* {item.currency} */}
                            </TableCell>

                            {/* Autofill = unit_price * quantity */}
                            <TableCell sx={tableStyles.bodyCell} align='right'>
                              {item.net_amount == 0
                                ? "-"
                                : item.net_amount.toFixed(2)}
                            </TableCell>

                            {/* Remarks */}

                            <TableCell
                              sx={tableStyles.bodyCell}
                              style={{
                                cursor:
                                  item.vendor_comments?.length > 20
                                    ? "pointer"
                                    : "default",
                              }}
                              onClick={
                                item.vendor_comments?.length > 20
                                  ? (e) =>
                                      handlePopoverOpen(e, item.vendor_comments)
                                  : undefined
                              }
                            >
                              {item.vendor_comments?.length > 20
                                ? `${item.vendor_comments.slice(0, 20)}...`
                                : item.vendor_comments}
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
                      // disabled
                      fullWidth
                      sx={compactTextField1}
                      multiline
                      value={formData?.remarks}
                      // onChange={(e) => {
                      //   setRemarks(e.target.value);
                      // }}
                    />
                  </Grid>
                </Grid>
              </Card>
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
                Submitted Successfully
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
        </Navbar>
      )}
    </div>
  );
}

const DECISION_COLOR = {
  "Under Review": {
    bg: "#FEF2E0",
    text: "#F99709",
    border: "#C7D2FE",
  },
  Rejected: {
    bg: "#FFE0E5",
    text: "#E53A6B",
    border: "#FCA5A5",
  },
  Accepted: {
    bg: "#E3F7F4",
    text: "#21BFA7",
    border: "#6EE7B7",
  },
  Cancelled: {
    bg: "#FFE0E5",
    text: "#E53A6B",
    border: "#E5E7EB",
  },
  Declined: {
    bg: "#FFE0E5",
    text: "#E53A6B",
    border: "#E5E7EB",
  },
  Expired: {
    bg: "#FFE0E5",
    text: "#E53A6B",
    border: "#FCA5A5",
  },
};
