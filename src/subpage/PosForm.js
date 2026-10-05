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
  IconButton,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from "../Navbars/Navbar";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    py: "5px",
    whiteSpace: "nowrap", // single line
  },

  bodyCell: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "12px",
    color: "#444",
    backgroundColor: "#fff",
  },

  autoFillButton: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "12px",
    textTransform: "none",
  },
};

export default function PosForm() {
  const [detailsData, setSetDetailsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const textStyle = {
    fontFamily: "Poppins, sans-serif",
  };

  const labelStyle = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: "#2E2E2E",
  };

  const valueStyle = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "#555",
  };

  const getPoDetails = async () => {
    setLoading(true);
    const payload = {
      purch_id: sessionStorage.getItem("purch_id"),
      vendor_account: sessionStorage.getItem("vend_account"),
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/po/details",
        payload,
      );

      console.log(res.data);

      setSetDetailsData(res.data.data);
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
    getPoDetails();
  }, []);

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
                  mb: 1,
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
                      {detailsData?.header?.po_number}
                    </Typography>

                    <Box mt={1} display='flex' gap={4} flexWrap='wrap'>
                      <Typography sx={valueStyle}>
                        <strong>RFQ Number:</strong>{" "}
                        {detailsData?.header?.rfq_number}
                      </Typography>

                      {/* <Typography sx={valueStyle}>
                    <strong>Expected Delivery Date:</strong> {detailsData?.header?.rfq_number}
                  </Typography> */}

                      <Typography sx={valueStyle}>
                        <strong>Status:</strong>{" "}
                        {detailsData?.header?.header_status}
                      </Typography>
                    </Box>
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
                  Order Overview
                </Typography>

                <Grid container spacing={1}>
                  <Grid
                    size={{ xs: 12, sm: 12, md: 12, lg: 3 }}
                    sx={{ display: "flex", gap: 1 }}
                  >
                    <Typography sx={labelStyle}>Issue Date</Typography>
                    <Typography sx={valueStyle}>
                      {" "}
                      {detailsData?.header?.issue_date}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{ xs: 12, sm: 12, md: 12, lg: 3 }}
                    sx={{ display: "flex", gap: 1 }}
                  >
                    <Typography sx={labelStyle}>Confirmed Date</Typography>
                    <Typography sx={valueStyle}>
                      {detailsData?.header?.confirmed_date}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{ xs: 12, sm: 12, md: 12, lg: 3 }}
                    sx={{ display: "flex", gap: 1 }}
                  >
                    <Typography sx={labelStyle}>Total Value</Typography>
                    <Typography sx={valueStyle}>
                      {detailsData?.header?.total_value}
                    </Typography>
                  </Grid>
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
                  Quatation Line items
                </Typography>

                <Grid sx={{ mt: 1 }}>
                  <TableContainer>
                    <Table>
                      {/* Top Header */}
                      <TableHead>
                        <TableRow sx={tableStyles.headerRow}>
                          <TableCell sx={tableStyles.headerCell}>
                            Sl No
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            Material Description
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            Material Code
                          </TableCell>

                          <TableCell align='center' sx={tableStyles.headerCell}>
                            Quantity
                          </TableCell>

                          <TableCell align='center' sx={tableStyles.headerCell}>
                            UOM
                          </TableCell>
                          <TableCell align='center' sx={tableStyles.headerCell}>
                            Unit Price
                          </TableCell>
                          <TableCell align='center' sx={tableStyles.headerCell}>
                            Net Amount
                          </TableCell>
                          <TableCell align='center' sx={tableStyles.headerCell}>
                            Delivery Date
                          </TableCell>
                          {/* <TableCell align='center' sx={tableStyles.headerCell}>
                            Status
                          </TableCell> */}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {detailsData?.lines.map((item, index) => (
                          <TableRow>
                            <TableCell sx={tableStyles.bodyCell}>
                              {index + 1}
                            </TableCell>
                            <TableCell sx={tableStyles.bodyCell}>
                              {item.description}
                            </TableCell>
                            <TableCell sx={tableStyles.bodyCell}>
                              {item.item}
                            </TableCell>
                            <TableCell sx={tableStyles.bodyCell}>
                              {" "}
                              {item.quantity}
                            </TableCell>
                            <TableCell sx={tableStyles.bodyCell}>
                              {" "}
                              {item.uom}
                            </TableCell>

                            <TableCell sx={tableStyles.bodyCell}>
                              {item.unit_price}
                            </TableCell>
                            <TableCell sx={tableStyles.bodyCell}>
                              {item.net_amount}
                            </TableCell>
                            <TableCell sx={tableStyles.bodyCell}>
                              {dayjs(
                                item.expected_delivery_date,
                                "DD/MM/YYYY",
                              ).year() > 2020
                                ? item.expected_delivery_date
                                : "-"}
                            </TableCell>
                            {/* <TableCell sx={tableStyles.bodyCell}>
                              {item.line_status}
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Card>
            </Grid>
          </Box>
        </Navbar>
      )}
    </div>
  );
}

const actionButtonStyles = {
  accept: {
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
