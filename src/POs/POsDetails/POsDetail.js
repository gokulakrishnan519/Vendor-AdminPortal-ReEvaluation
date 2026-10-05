import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Grid,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../../Navbars/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Loading from "../../Loading/Loading";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  border: "none", // remove border
  outline: "none", // remove focus outline
};

const InfoItem = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
    <Typography
      sx={{
        fontSize: "12px",
        color: "#2e2e2e",
        fontWeight: 520,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: "12px",
        color: "#2e2e2e",
        whiteSpace: "nowrap",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {value}
    </Typography>
  </Box>
);

const SectionTitle = ({ children }) => (
  <Typography
    sx={{
      fontSize: "15px",
      fontWeight: 500,
      color: "#1a1a1a",
      mb: 1.5,
      fontFamily: "Poppins, sans-serif",
    }}
  >
    {children}
  </Typography>
);

const tableHeadSx = {
  backgroundColor: "#f7f8fa",
  "& .MuiTableCell-head": {
    fontSize: "12px",
    backgroundColor: "#F0EFF7",
    color: "#2e2e2e",
    fontFamily: "Poppins, sans-serif",
    border: "1px solid #DDDEE0",
    paddingTop: "8px",
    paddingBottom: "8px",
    whiteSpace: "nowrap",
    // fontSize: "13px",
    // fontWeight: 600,
    // color: "#444",
    // borderBottom: "1.5px solid #e8e8e8",
    // padding: "10px 14px",
    // fontFamily: "Poppins, sans-serif",
  },
};

const tableBodySx = {
  "& .MuiTableCell-body": {
    fontSize: "12px",
    color: "#2e2e2e",
    fontFamily: "Poppins, sans-serif",
    paddingTop: "10px",
    paddingBottom: "10px",
    whiteSpace: "nowrap",
  },
};

const PURCH_STATUS_COLOR = {
  Open: {
    bg: "rgba(249, 151, 9, 0.15)",
    text: "#FF8800",
  },
  Received: {
    bg: "#BFE1E9",
    text: "#21BFA7",
  },
  Invoiced: {
    bg: "rgba(242, 240, 255, 0.15)",
    text: "#725CFC",
  },
  Cancelled: {
    bg: "#FFE0E5",
    text: "#E53A6B",
  },
};

const POsDetail = () => {
  const [loading, setLoading] = useState(null);
  const [poData, setPoData] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalHeaderValue, setModalHeaderValue] = useState(null);
  const [linesData, setLinesData] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();

  const tabName = location.state?.tabName;

  const purch_id = location.state?.purch_id;

  console.log(tabName);
  console.log(tabName);

  const getPoDetails = async () => {
    setLoading(true);

    const payload = {
      purch_id: purch_id,
    };

    try {
      const res = await axios.post(
        tabName == "All POs"
          ? "http://10.50.20.89:9091/po/details"
          : tabName == "Bidding Orders"
            ? "http://10.50.20.89:9091/po/biddetails"
            : tabName == "Direct Orders"
              ? "http://10.50.20.89:9091/po/directdetails "
              : "",
        payload,
      );

      console.log(res.data);

      setPoData(res.data.data);
      // setTableData(res.data.po_list);
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

  const getInvoiceInformation = async (inv) => {
    setLoading(true);

    const payload = {
      invoice_id: inv,
    };

    try {
      const res = await axios.post("http://10.50.20.89:9091/po/lines", payload);

      console.log(res.data);

      setLinesData(res.data.data);
      // setTableData(res.data.po_list);
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
          <Grid sx={{ position: "absolute", top: 80, cursor: "pointer" }}>
            <ArrowBackIcon
              onClick={() => {
                navigate("/Pos");
              }}
            />
          </Grid>
          <Grid sx={{ px: 4 }}>
            <Box
              sx={{
                background: "#fff",
                borderRadius: "16px",
                // border: "1.5px solid #e8e8e8",
                p: 2,
              }}
            >
              {/* Header Banner */}
              <Paper
                elevation={0}
                sx={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  background: "linear-gradient(to bottom, #CEDCF1, #EBF1FA)",

                  px: 3,
                  py: 3.5,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 500,
                    color: "#1a1a1a",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {poData?.header?.po_number} - {poData?.vendor?.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#555",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Status
                  </Typography>

                  <Chip
                    label={poData?.header?.status}
                    size='small'
                    sx={{
                      height: "25px",
                      width: 120,
                      backgroundColor:
                        PURCH_STATUS_COLOR[poData?.header?.status]?.bg,
                      color: PURCH_STATUS_COLOR[poData?.header?.status]?.text,

                      fontWeight: 500,
                      fontFamily: "Poppins, sans-serif",
                      borderRadius: "12px",
                    }}
                  />
                </Box>
              </Paper>

              {/* Main Content Card */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "12px",
                  // border: "1px solid #e4e8f0",
                  backgroundColor: "#F2F6FC",
                  p: 3,
                }}
              >
                {/* Purchase Order Information Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "#1a1a1a",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Purchase Order Information
                  </Typography>
                  {/* <IconButton
                size='small'
                sx={{ border: "1px solid #ddd", borderRadius: "8px" }}
              >
                <SearchIcon sx={{ fontSize: 18, color: "#555" }} />
              </IconButton> */}
                </Box>

                {/* Inner Card */}
                <Paper
                  elevation={0}
                  sx={{
                    border: "1px solid #e8eaf0",
                    borderRadius: "10px",
                    p: 2.5,
                  }}
                >
                  <Grid sx={{ borderBottom: "2px solid #f0f2f5" }}>
                    {/* Vendor Information */}
                    <SectionTitle>Vendor Information</SectionTitle>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        columnGap: 2, // horizontal space
                        rowGap: 1, // vertical space
                        mb: 3,
                      }}
                    >
                      <InfoItem
                        label='Vendor Account'
                        value={poData?.vendor?.vendor_account}
                      />
                      <InfoItem
                        label='Mobile Phone'
                        value={
                          poData?.vendor?.phone == null
                            ? "-"
                            : poData?.vendor?.phone
                        }
                      />
                      <InfoItem
                        label='Email'
                        value={
                          poData?.vendor?.email == null
                            ? "-"
                            : poData?.vendor?.email
                        }
                      />
                      <InfoItem
                        label='Location'
                        value={
                          poData?.vendor?.address == null
                            ? "-"
                            : poData?.vendor?.address
                        }
                      />
                    </Box>
                  </Grid>

                  <Grid sx={{ borderBottom: "2px solid #f0f2f5" }}>
                    {/* Delivery & Payment */}
                    <Grid sx={{ mt: 3 }}>
                      <SectionTitle>Delivery & Payment</SectionTitle>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 4,
                          mb: 3,
                        }}
                      >
                        <InfoItem
                          label='Delivery Date'
                          value={
                            poData?.header?.delivery_date?.split("/")[2] >= 2000
                              ? poData?.header?.delivery_date
                              : "-"
                          }
                        />
                        <InfoItem
                          label='Mode of Delivery'
                          value={poData?.header?.delivery_mode}
                        />
                        <InfoItem
                          label='Delivery Term'
                          value={
                            poData?.header?.delivery_terms == ""
                              ? "-"
                              : poData?.header?.delivery_terms
                          }
                        />
                        <InfoItem
                          label='Payment Term'
                          value={
                            poData?.header?.payment_terms == ""
                              ? "-"
                              : poData?.header?.payment_terms
                          }
                        />
                        <InfoItem
                          label='Paymend Mode'
                          value={poData?.header?.payment_mode}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Purchase Order Line Items */}
                  <Grid sx={{ mt: 3 }}>
                    <SectionTitle>Purchase Order Line Items</SectionTitle>
                    <TableContainer
                      sx={{
                        border: "1px solid #e8eaf0",
                        mb: 3,
                        maxHeight: "30vh",
                      }}
                    >
                      <Table size='small' stickyHeader>
                        <TableHead sx={tableHeadSx}>
                          <TableRow>
                            <TableCell>Item No</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Procrument category </TableCell>
                            <TableCell align='right'>Quantity</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell align='right'>Unit Price</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                            <TableCell>Delivery Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={tableBodySx}>
                          {poData?.lines.map((row, i) => (
                            <TableRow key={i}>
                              <TableCell>{row.item}</TableCell>
                              <TableCell>{row.description}</TableCell>
                              <TableCell>{row.procurement_category}</TableCell>
                              <TableCell align='right'>
                                {row.quantity}
                              </TableCell>
                              <TableCell>
                                {row.uom == "" ? "-" : row.uom}
                              </TableCell>
                              <TableCell align='right'>
                                {row.unit_price}
                              </TableCell>
                              <TableCell align='right'>{row.amount}</TableCell>
                              <TableCell>{row.delivery_date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* Invoice Information */}
                  {poData?.invoice?.length > 0 ? (
                    <Grid sx={{ mt: 3 }}>
                      <SectionTitle>Invoice Information</SectionTitle>
                      <TableContainer sx={{ border: "1px solid #e8eaf0" }}>
                        <Table size='small'>
                          <TableHead sx={tableHeadSx}>
                            <TableRow>
                              <TableCell>Invoice Number</TableCell>
                              <TableCell>Invoice Date</TableCell>
                              <TableCell align='right'>
                                Invoice Amount in INR
                              </TableCell>
                              <TableCell align='right'>
                                Invoice Amount
                              </TableCell>
                              <TableCell>Currency</TableCell>
                              <TableCell>Due Date</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody sx={tableBodySx}>
                            {poData?.invoice?.length > 0 ? (
                              poData.invoice.map((row, i) => (
                                <TableRow
                                  key={i}
                                  onClick={() => {
                                    setModal(true);
                                    setModalHeaderValue(row.invoice_no);
                                    getInvoiceInformation(row.invoice_no);
                                  }}
                                  sx={{ cursor: "pointer" }}
                                >
                                  <TableCell sx={tableBodySx}>
                                    {row.invoice_no}
                                  </TableCell>
                                  <TableCell sx={tableBodySx}>
                                    {row.invoice_date}
                                  </TableCell>
                                  <TableCell align='right' sx={tableBodySx}>
                                    {row.invoice_amount_inr}
                                  </TableCell>
                                  <TableCell align='right' sx={tableBodySx}>
                                    {row.invoice_amount}
                                  </TableCell>
                                  <TableCell sx={tableBodySx}>
                                    {row.currency}
                                  </TableCell>
                                  <TableCell sx={tableBodySx}>
                                    {row.due_date}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={6}
                                  align='center'
                                  sx={{
                                    py: 1,
                                    fontFamily: "Poppins, sans-serif",
                                  }}
                                >
                                  No Data
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Paper>
              </Paper>
            </Box>
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
              <Grid sx={{ position: "absolute", top: 10, right: 10 }}>
                <CloseIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModal(false);
                  }}
                />
              </Grid>
              <Grid>
                <Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 550,
                        fontSize: "18px",
                        color: "#334",
                        borderBottom: "1px solid #eef0f8",
                      }}
                    >
                      {modalHeaderValue} - Invoice Information
                    </Typography>
                  </Grid>

                  <TableContainer
                    stickyHeader
                    elevation={0}
                    sx={{
                      border: "1px solid #eef0f8",
                      maxHeight: "70vh",
                      overflow: "auto",
                    }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow sx={{ background: "#f5f7fc" }}>
                          {[
                            "Purchase ID",
                            "Invoice ID",
                            "Line Number",
                            "Item ID",
                            "Procurement Category",
                            "Description",
                            "Quantity",
                            "Unit Price",
                            "Uom",
                            "Line Amount",
                            "Line Tax Amount",
                          ].map((h) => (
                            <TableCell
                              key={h}
                              sx={headerCellStyle}
                              // sx={{
                              //   fontFamily: "Poppins, sans-serif",
                              //   fontWeight: 700,
                              //   fontSize: "0.8rem",
                              //   color: "#334",
                              //   borderBottom: "1px solid #eef0f8",
                              //   py: 1.5,
                              // }}
                              align={
                                h == "Quantity" ||
                                h == "Unit Price" ||
                                h == "Line Amount" ||
                                h == "Line Tax Amount"
                                  ? "right"
                                  : ""
                              }
                            >
                              {h}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {linesData && linesData.length > 0 ? (
                          linesData.map((row, i) => (
                            <TableRow
                              key={i}
                              sx={
                                {
                                  // backgroundColor:
                                  //   i % 2 === 0 ? "#ffffff" : "#f4f6f8",
                                }
                              }
                            >
                              <TableCell sx={{ ...bodyCellStyle }}>
                                {row.purch_id}
                              </TableCell>

                              <TableCell sx={{ ...bodyCellStyle }}>
                                {row.invoice_id}
                              </TableCell>

                              <TableCell sx={{ ...bodyCellStyle }}>
                                {row.line_num}
                              </TableCell>

                              <TableCell sx={{ ...bodyCellStyle }}>
                                {row.item_id == "" ? "-" : row.item_id}
                              </TableCell>

                              <TableCell sx={{ ...bodyCellStyle }}>
                                {row.procurement_category}
                              </TableCell>
                              <TableCell
                                sx={{
                                  ...bodyCellStyle,
                                }}
                              >
                                {row.description}
                              </TableCell>
                              <TableCell
                                sx={{ ...bodyCellStyle }}
                                align='right'
                              >
                                {row.quantity}
                              </TableCell>

                              <TableCell
                                sx={{
                                  ...bodyCellStyle,
                                }}
                                align='right'
                              >
                                {row.unit_price}
                              </TableCell>
                              <TableCell sx={{ ...bodyCellStyle }}>
                                {row.uom}
                              </TableCell>
                              <TableCell
                                sx={{ ...bodyCellStyle }}
                                align='right'
                              >
                                {row.line_amount}
                              </TableCell>

                              <TableCell
                                sx={{ ...bodyCellStyle }}
                                align='right'
                              >
                                {row.tax_amount}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              align='center'
                              sx={{
                                py: 1,
                                fontFamily: "Poppins, sans-serif",
                              }}
                            >
                              No Data
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Navbar>
      )}
    </div>
  );
};

const bodyCellStyle = {
  fontSize: "12px",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "8px",
  paddingBottom: "8px",
  whiteSpace: "nowrap",
  // wordBreak: "break-word",
};

const headerCellStyle = {
  fontSize: "12px",
  backgroundColor: "#F0EFF7",
  color: "#1a1a2e",
  fontFamily: "Poppins, sans-serif",
  border: "1px solid #DDDEE0",
  paddingTop: "6px",
  paddingBottom: "6px",

  whiteSpace: "nowrap",
};

export default POsDetail;
