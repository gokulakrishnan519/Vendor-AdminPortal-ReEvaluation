import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../Navbars/Navbar";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Card,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../../Loading/Loading";
import search_icon from "../../../Images/Search Iconaaaa.png";
import VendorDetailsToopData from "./VendorDetailsToopData";
import ModalBidsDetails from "./ModalBidsDetails";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxHeight: "90vh", // limit height
  overflowY: "auto", // enable vertical scroll
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
};

export default function VendorDetailsPage() {
  const [topData, setTopData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [materilslist, setMaterilList] = useState(null);
  const [activeRFQList, setActiveRFQList] = useState(null);
  const [openPurchaseList, serOpenPurchaseOrderList] = useState(null);
  const [historyOfRFQ, setHistoryRFQ] = useState(null);

  const [linesData, setLinesData] = useState(null);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [bidsStatus, setBidsStatus] = useState(null);
  const [bidRFQid, setRFQId] = useState(null);

  const [modalName, setModalName] = useState("");
  const [modalHeaderValue, setModalHeaderValue] = useState("");

  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const location = useLocation();
  const vendorAccount = location.state?.vendor_account;

  console.log(vendorAccount);

  const getTableList = async () => {
    setLoading(true);

    const payload = {
      vendor_account: vendorAccount,
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/vendor/dashboard",
        payload,
      );

      console.log(res.data);

      setTopData(res.data);
      // setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const getTableMaterialList = async () => {
    setLoading(true);

    const payload = {
      vendor_account: vendorAccount,
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/vendor/bid-materials",
        payload,
      );

      console.log(res.data);

      setMaterilList(res.data.materials);
      // setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const getTableActiveRFQs = async () => {
    setLoading(true);

    const payload = {
      vendor_account: vendorAccount,
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/vendor/newrfqlist",
        payload,
      );

      console.log(res.data);

      setActiveRFQList(res.data.rfqs.rfqs);
      // setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const getTablePurchaseOrder = async () => {
    setLoading(true);

    const payload = {
      vendor_account: vendorAccount,
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/vendor/list",
        payload,
      );

      console.log(res.data);

      serOpenPurchaseOrderList(res.data.po_list);
      // setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const getTableHistoryOfRFQ = async () => {
    setLoading(true);

    const payload = {
      vendor_account: vendorAccount,
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/RFQ/rfqhistory",
        payload,
      );

      console.log(res.data);

      setHistoryRFQ(res.data.data.data);
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
    getTableHistoryOfRFQ();
  }, []);

  const getTableLines = async (po_id, v, s) => {
    // setLoading(true);

    const payload = {
      vendor_account: vendorAccount,
      purch_id: po_id,
    };

    const payload1 = {
      vendor_account: vendorAccount,
      rfq_id: po_id,
      status: s,
    };

    try {
      const url =
        v === "polist"
          ? "http://10.50.20.89:9091/vendor/details"
          : "http://10.50.20.89:9091/vendor/rfq-detail";

      const data = v == "polist" ? payload : payload1;

      const res = await axios.post(url, data);

      console.log(res.data);

      if (v == "polist") {
        setLinesData(res.data.data.lines);
      } else {
        setLinesData(res.data.data.items);
      }

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

  console.log(linesData);

  useEffect(() => {
    getTableList();
    getTableMaterialList();
    getTableActiveRFQs();
    getTablePurchaseOrder();
  }, []);

  const statCards = [
    { label: "Materials Supported", value: topData?.kpis?.materials_supported },
    { label: "Open RFQs", value: topData?.kpis?.open_rfqs },
    { label: "Open POs", value: topData?.kpis?.open_pos },
    { label: "Submitted RFQs", value: topData?.kpis?.submitted_rfqs },
  ];

  const navigate = useNavigate();

  const filteredMaterial = materilslist
    ?.filter((v) =>
      Object.values(v).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      ),
    )
    ?.sort((a, b) => b.expiry_status - a.expiry_status);

  const statusPriority = {
    New: 1,
    "In Progress": 2,
    Submitted: 3,
  };

  const filteredActiveRFQ = activeRFQList
    ?.filter((v) =>
      Object.values(v).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      ),
    )
    ?.sort(
      (a, b) =>
        (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99),
    );

  const filteredPurchaseOrder = openPurchaseList?.filter((v) =>
    Object.values(v).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const filteredHistoryOfRFQ = historyOfRFQ?.filter((v) =>
    Object.values(v).some((value) =>
      String(value).toLowerCase().includes(search2.toLowerCase()),
    ),
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Grid>
            <Grid sx={{ position: "absolute", top: 80, cursor: "pointer" }}>
              <ArrowBackIcon
                onClick={() => {
                  navigate("/Vendors");
                }}
              />
            </Grid>
            <Grid sx={{ px: 10 }}>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1.5px solid #e8e8e8",
                  p: 2,
                  fontFamily: "Poppins, sans-serif",
                  mb: 2,
                }}
              >
                {/* Top Row */}

                <VendorDetailsToopData
                  topData={topData}
                  statCards={statCards}
                />

                <Grid
                  sx={{
                    background: "#F2F6FC",
                    padding: 2,
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      px: 2,
                    }}
                  >
                    <Grid
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        color: "#1a1a2e",
                        mb: 2,
                      }}
                    >
                      Vendor Details
                    </Grid>
                    <TextField
                      placeholder='Search'
                      sx={inputSx}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <img
                              src={search_icon}
                              alt='search'
                              style={{ width: 12, height: 12 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Materials List */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: "6px",
                      background: "#Ffff",

                      p: 3,
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#1a1a2e",
                        mb: 2,
                      }}
                    >
                      Materials List
                    </Typography>

                    <TableContainer
                      stickyHeader
                      elevation={0}
                      sx={{
                        border: "1px solid #eef0f8",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow sx={{ background: "#f5f7fc" }}>
                            {[
                              "Material Code",
                              "Material Description",
                              "Added On",
                              "Item expiry Date",
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
                              >
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {materilslist && filteredMaterial?.length > 0 ? (
                            filteredMaterial?.map((row, i) => (
                              <TableRow
                                key={i}
                                // sx={
                                //   {
                                //     // backgroundColor:
                                //     //   i % 2 === 0 ? "#ffffff" : "#f4f6f8",
                                //   }
                                // }
                                sx={{
                                  backgroundColor: row.expiry_status
                                    ? "#FFE9EC"
                                    : "inherit",
                                }}
                              >
                                <TableCell
                                  sx={{
                                    ...bodyCellStyle1,
                                    cursor: "pointer",
                                    color: "#1976d2",

                                    "&:hover": {
                                      textDecoration: "underline",
                                    },
                                  }}
                                  onClick={() => {
                                    navigate("/MaterialDetailsPage", {
                                      state: {
                                        material_id: row.material_id,
                                      },
                                    });
                                  }}
                                >
                                  {row.material_id}
                                </TableCell>
                                <TableCell sx={bodyCellStyle1}>
                                  {row.material_description}
                                </TableCell>

                                <TableCell sx={bodyCellStyle1}>
                                  {row.valid_from}
                                </TableCell>
                                <TableCell sx={bodyCellStyle1}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1.5,
                                    }}
                                  >
                                    {row.expiry_date}
                                    {row.expiry_status ? (
                                      <Chip
                                        label={
                                          row.expiry_status == true
                                            ? "Expiry Soon"
                                            : ""
                                        }
                                        size='small'
                                        sx={{
                                          fontSize: "12px",
                                          width: 100,
                                          px: 0.5,
                                          ml: 2,
                                          fontFamily: "Poppins, sans-serif",
                                          fontWeight: 500,
                                          borderRadius: "15px",
                                          backgroundColor: "#FFE0E5",
                                          color: "#E53A6B",
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Box>
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
                  </Card>

                  {/* Active RFQs */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: "6px",
                      background: "#Ffff",
                      p: 3,
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#1a1a2e",
                        mb: 2,
                      }}
                    >
                      Active RFQs
                    </Typography>

                    <TableContainer
                      stickyHeader
                      elevation={0}
                      sx={{
                        border: "1px solid #eef0f8",
                        maxHeight: "50vh",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow sx={{ background: "#f5f7fc" }}>
                            {[
                              "RFQ No",
                              "RFQ Case ID",
                              "RFQ Title",
                              "Expiration Date",
                              "Mode of Delivery",
                              "Delivery Term",
                              "Payment Term",
                              "Status",
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
                                align={h == "Status" ? "center" : ""}
                              >
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredActiveRFQ &&
                          filteredActiveRFQ?.length > 0 ? (
                            filteredActiveRFQ?.map((row, i) => (
                              <TableRow
                                key={i}
                                sx={
                                  {
                                    // backgroundColor:
                                    //   i % 2 === 0 ? "#ffffff" : "#f4f6f8",
                                  }
                                }
                                onClick={() => {
                                  setModal(true);
                                  setModalName("activeRFQs");
                                  getTableLines(
                                    row.rfq_id,
                                    "activeRFQs",
                                    row.status,
                                  );
                                  setModalHeaderValue(row.rfq_id);
                                }}
                              >
                                <TableCell sx={bodyCellStyle}>
                                  {row.rfq_id}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.rfq_case_id}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.rfq_name}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.expiry_date}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.delivery_mode}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.delivery_term}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.payment_mode}
                                </TableCell>

                                <TableCell sx={bodyCellStyle} align='center'>
                                  <Chip
                                    label={row.status}
                                    size='small'
                                    sx={{
                                      height: "25px",
                                      width: 120,
                                      backgroundColor:
                                        PURCH_STATUS_COLOR[row.status]?.bg,
                                      color:
                                        PURCH_STATUS_COLOR[row.status]?.text,
                                      fontWeight: 500,
                                      fontFamily: "Poppins, sans-serif",
                                      borderRadius: "12px",
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={7}
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
                  </Card>

                  {/* Open Purchase Orders */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: "6px",
                      background: "#Ffff",
                      p: 3,
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#1a1a2e",
                        mb: 2,
                      }}
                    >
                      Purchase Orders
                    </Typography>

                    <TableContainer
                      stickyHeader
                      elevation={0}
                      sx={{
                        border: "1px solid #eef0f8",
                        maxHeight: "50vh",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow sx={{ background: "#f5f7fc" }}>
                            {[
                              "PO No",
                              "RFQ ID",
                              "Total Amount",
                              "Currency",
                              "Created Date",
                              "Status",
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
                                align={h == "Status" ? "center" : ""}
                              >
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredPurchaseOrder &&
                          filteredPurchaseOrder?.length > 0 ? (
                            filteredPurchaseOrder?.map((row, i) => (
                              <TableRow
                                key={i}
                                sx={
                                  {
                                    // backgroundColor:
                                    //   i % 2 === 0 ? "#ffffff" : "#f4f6f8",
                                  }
                                }
                                onClick={() => {
                                  setModal(true);
                                  setModalName("polist");
                                  getTableLines(row.po_id, "polist");
                                  setModalHeaderValue(row.po_id);
                                }}
                              >
                                <TableCell sx={bodyCellStyle}>
                                  {row.po_id}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.rfq_id}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.total_amount}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.currency}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.created_date}
                                </TableCell>

                                <TableCell sx={bodyCellStyle} align='center'>
                                  <Chip
                                    label={row.purch_state}
                                    size='small'
                                    sx={{
                                      height: "25px",
                                      width: 120,
                                      backgroundColor:
                                        PURCH_STATUS_COLOR[row.purch_state]?.bg,
                                      color:
                                        PURCH_STATUS_COLOR[row.purch_state]
                                          ?.text,
                                      fontWeight: 500,
                                      fontFamily: "Poppins, sans-serif",
                                      borderRadius: "12px",
                                    }}
                                  />
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
                  </Card>

                  {/* History Of Bids */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: "6px",
                      background: "#Ffff",
                      p: 3,
                      mb: 2,
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                      }}
                    >
                      <Grid
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                          fontSize: "1.1rem",
                          color: "#1a1a2e",
                          mb: 2,
                        }}
                      >
                        History of Bids
                      </Grid>
                      <TextField
                        placeholder='Search'
                        sx={inputSx}
                        value={search2}
                        onChange={(e) => {
                          setSearch2(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <img
                                src={search_icon}
                                alt='search'
                                style={{ width: 12, height: 12 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <TableContainer
                      stickyHeader
                      elevation={0}
                      sx={{
                        border: "1px solid #eef0f8",
                        maxHeight: "50vh",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow sx={{ background: "#f5f7fc" }}>
                            {[
                              "RFQ No",
                              "Case ID",
                              "Created Date",
                              "Expiry Date",
                              "Mode Of Delivery",
                              "Delivery Terms",
                              "Payment Terms",
                              "Status",
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
                                align={h == "Status" ? "center" : ""}
                              >
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredHistoryOfRFQ &&
                          filteredHistoryOfRFQ?.length > 0 ? (
                            filteredHistoryOfRFQ?.map((row, i) => (
                              <TableRow
                                key={i}
                                sx={
                                  {
                                    // backgroundColor:
                                    //   i % 2 === 0 ? "#ffffff" : "#f4f6f8",
                                  }
                                }
                                onClick={() => {
                                  setModal2(true);
                                  setBidsStatus(row.status);
                                  setRFQId(row.rfq_no);
                                }}
                              >
                                <TableCell sx={bodyCellStyle}>
                                  {row.rfq_no}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.case_id}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.created_date}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.expiry_date}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.mode_of_delivery}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.delivery_term}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.payment_term}
                                </TableCell>
                                <TableCell sx={bodyCellStyle} align='center'>
                                  <Chip
                                    label={row.status}
                                    size='small'
                                    sx={{
                                      height: "25px",
                                      width: 120,
                                      backgroundColor:
                                        DECISION_COLOR[row.status]?.bg,
                                      color: DECISION_COLOR[row.status]?.text,
                                      fontWeight: 500,
                                      fontFamily: "Poppins, sans-serif",
                                      borderRadius: "12px",
                                    }}
                                  />
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
                                onClick={() => {
                                  setModal2(true);
                                }}
                              >
                                No Data
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
              </Box>
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
                {modalName == "polist" ? (
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
                        {modalHeaderValue} - Purchase Orders Lines
                      </Typography>
                    </Grid>

                    <TableContainer
                      stickyHeader
                      elevation={0}
                      sx={{ border: "1px solid #eef0f8" }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow sx={{ background: "#f5f7fc" }}>
                            {[
                              "Item No",
                              "Product Name",
                              "Procrument category",
                              "Quantity",
                              "Unit",
                              "Unit Price",
                              "Amount",
                              "Currency",
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
                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.item}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.description}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.procurement_category}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.quantity}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.uom}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.unit_price}
                                </TableCell>
                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.net_amount}
                                </TableCell>
                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {row.currency}
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
                ) : (
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
                        {modalHeaderValue} - Active RFQs Lines
                      </Typography>
                    </Grid>

                    <TableContainer>
                      <Table>
                        {/* Top Header */}
                        <TableHead>
                          <TableRow sx={headerCellStyle}>
                            <TableCell rowSpan={2} sx={headerCellStyle}>
                              Sl No
                            </TableCell>
                            <TableCell rowSpan={2} sx={headerCellStyle}>
                              Material Description
                            </TableCell>
                            <TableCell
                              rowSpan={2}
                              sx={headerCellStyle}
                              align='center'
                            >
                              Material Code
                            </TableCell>

                            <TableCell
                              rowSpan={2}
                              sx={headerCellStyle}
                              align='center'
                            >
                              Status
                            </TableCell>

                            <TableCell rowSpan={2} sx={headerCellStyle}>
                              Currency
                            </TableCell>

                            <TableCell
                              align='center'
                              colSpan={5}
                              sx={headerCellStyle}
                            >
                              HiQ Requirement
                            </TableCell>

                            {linesData?.some(
                              (item) =>
                                item.line_status != "New" &&
                                item.line_status != "In Progress",
                            ) ? (
                              <TableCell
                                align='center'
                                colSpan={4}
                                sx={headerCellStyle}
                              >
                                Vendor's Responce
                              </TableCell>
                            ) : (
                              ""
                            )}
                          </TableRow>

                          <TableRow>
                            <TableCell sx={headerCellStyle}>Quantity</TableCell>
                            <TableCell sx={headerCellStyle}>UOM</TableCell>
                            <TableCell sx={headerCellStyle}>
                              Target Price
                            </TableCell>
                            <TableCell sx={headerCellStyle}>
                              Requested Delivery Date
                            </TableCell>
                            <TableCell sx={headerCellStyle}>Comments</TableCell>

                            {linesData?.some(
                              (item) =>
                                item.line_status != "New" &&
                                item.line_status != "In Progress",
                            ) ? (
                              <>
                                <TableCell sx={headerCellStyle}>
                                  Unit Price
                                </TableCell>
                                <TableCell sx={headerCellStyle}>
                                  Net Amount
                                </TableCell>
                                <TableCell sx={headerCellStyle}>
                                  Confirmed Delivery Date
                                </TableCell>
                                <TableCell sx={headerCellStyle}>
                                  Remarks
                                </TableCell>
                              </>
                            ) : (
                              ""
                            )}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {linesData?.length > 0 ? (
                            linesData.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {index + 1}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {item.item_name}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {item.item_id}
                                </TableCell>

                                <TableCell
                                  sx={{ ...bodyCellStyle1 }}
                                  style={{ py: "3px" }}
                                  align='center'
                                >
                                  <Chip
                                    label={item.line_status}
                                    size='small'
                                    sx={{
                                      width: 100,
                                      fontSize: "12px",
                                      fontFamily: "Poppins, sans-serif",
                                      fontWeight: 500,
                                      borderRadius: "10px",
                                      backgroundColor:
                                        DECISION_COLOR[item.line_status]?.bg,
                                      color:
                                        DECISION_COLOR[item.line_status]?.text,
                                    }}
                                  />
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {item.currency}
                                </TableCell>

                                <TableCell
                                  sx={{ ...bodyCellStyle1 }}
                                  align='right'
                                >
                                  {item.quantity}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {item.uom == "" ? "-" : item.uom}
                                </TableCell>

                                <TableCell
                                  sx={{ ...bodyCellStyle1 }}
                                  align='right'
                                >
                                  {item.target_price === 0.0 ||
                                  item.target_price === "" ||
                                  item.target_price === null ||
                                  item.target_price === undefined
                                    ? "-"
                                    : Number(item.target_price).toFixed(2)}
                                </TableCell>

                                <TableCell sx={{ ...bodyCellStyle1 }}>
                                  {item.line_delivery_date &&
                                  dayjs(item.line_delivery_date).year() > 2000
                                    ? dayjs(item.line_delivery_date).format(
                                        "DD/MM/YYYY",
                                      )
                                    : "-"}
                                </TableCell>

                                <TableCell sx={bodyCellStyle1}>
                                  {item.remarks ? (
                                    item.remarks.length > 10 ? (
                                      <Tooltip
                                        title={item.remarks}
                                        placement='top'
                                        arrow
                                        slotProps={{
                                          tooltip: {
                                            sx: {
                                              fontFamily: "Poppins, sans-serif",
                                              fontSize: "12px",
                                              padding: 2,
                                            },
                                          },
                                        }}
                                      >
                                        <span>
                                          {item.remarks.slice(0, 10)}...
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      item.remarks
                                    )
                                  ) : (
                                    ""
                                  )}
                                </TableCell>

                                {linesData?.some(
                                  (item) =>
                                    item.line_status != "New" &&
                                    item.line_status != "In Progress",
                                ) ? (
                                  <>
                                    {/* Unit Price */}
                                    <TableCell
                                      sx={{ ...bodyCellStyle1 }}
                                      style={{
                                        backgroundColor: "#fff",
                                        width: "40%",
                                      }}
                                      align='right'
                                    >
                                      {item.unit_price === 0 ||
                                      item.unit_price === "" ||
                                      item.unit_price === null ||
                                      item.unit_price === undefined
                                        ? "-"
                                        : item.unit_price.toFixed(2)}
                                    </TableCell>

                                    {/* Net Amount */}
                                    <TableCell
                                      sx={{ ...bodyCellStyle1 }}
                                      align='right'
                                    >
                                      {item.net_amount === 0 ||
                                      item.net_amount === "" ||
                                      item.net_amount === null ||
                                      item.net_amount === undefined
                                        ? "-"
                                        : item.net_amount.toFixed(2)}
                                    </TableCell>

                                    <TableCell sx={{ ...bodyCellStyle1 }}>
                                      {dayjs(
                                        item.vendorreply_delivery_date,
                                        "DD/MM/YYYY",
                                      ).year() > 2000
                                        ? dayjs(
                                            item.vendorreply_delivery_date,
                                            "DD/MM/YYYY",
                                          ).format("DD/MM/YYYY")
                                        : "-"}
                                    </TableCell>

                                    <TableCell sx={bodyCellStyle1}>
                                      {item.vendor_comments ? (
                                        item.vendor_comments.length > 10 ? (
                                          <Tooltip
                                            title={item.vendor_comments}
                                            placement='top'
                                            arrow
                                            slotProps={{
                                              tooltip: {
                                                sx: {
                                                  fontFamily:
                                                    "Poppins, sans-serif",
                                                  fontSize: "12px",
                                                  padding: 2,
                                                },
                                              },
                                            }}
                                          >
                                            <span>
                                              {item.vendor_comments.slice(
                                                0,
                                                10,
                                              )}
                                              ...
                                            </span>
                                          </Tooltip>
                                        ) : (
                                          item.vendor_comments
                                        )
                                      ) : (
                                        ""
                                      )}
                                    </TableCell>
                                  </>
                                ) : (
                                  ""
                                )}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={11}
                                align='center'
                                sx={{
                                  py: 1,
                                  fontFamily: "Poppins, sans-serif",
                                }}
                              >
                                No Data Available
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Modal>

          <Modal
            open={modal2}
            onClose={() => {
              setModal2(false);
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
                    setModal2(false);
                  }}
                />
              </Grid>
              <Grid>
                <ModalBidsDetails
                  bidsStatus={bidsStatus}
                  vendorAccount={vendorAccount}
                  bidRFQid={bidRFQid}
                />
              </Grid>
            </Box>
          </Modal>
        </Navbar>
      )}
    </div>
  );
}

const PURCH_STATUS_COLOR = {
  New: {
    bg: "#FEF2E0",
    text: "#F99709",
  },
  Open: {
    bg: "#FEF2E0",
    text: "#F99709",
  },
  Received: {
    bg: "#E3F7F4",
    text: "#21BFA7",
  },
  Invoiced: {
    bg: "#F2F0FF",
    text: "#725CFC",
  },
  Cancelled: {
    bg: "#FFE0E5",
    text: "#E53A6B",
  },
  Confirmed: {
    bg: "#E3F7F4",
    text: "#21BFA7",
  },
  "In Progress": {
    bg: "#F2F0FF",
    text: "#725CFC",
  },
  Submitted: {
    bg: "#E3F7F4",
    text: "#21BFA7",
  },
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

const bodyCellStyle = {
  fontSize: "12px",
  color: "#1a1a2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "6px",
  paddingBottom: "6px",
  whiteSpace: "nowrap",
  cursor: "pointer",
  // px: "4px",
};

const bodyCellStyle1 = {
  fontSize: "12px",
  color: "#1a1a2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "8px",
  paddingBottom: "8px",
  whiteSpace: "nowrap",

  // px: "4px",
};

const DECISION_COLOR = {
  New: {
    bg: "#FEF2E0",
    text: "#F99709",
  },
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
  Completed: {
    bg: "#E3F7F4",
    text: "#21BFA7",
    border: "#6EE7B7",
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
  "In Progress": {
    bg: "#F2F0FF",
    text: "#725CFC",
  },
};

const inputSx = {
  borderRadius: "2px",
  "& .MuiOutlinedInput-root": {
    width: 150,
    fontSize: "12px",
    height: "25px",
    fontFamily: "Poppins, sans-serif",
    border: "1px solid #AAAAAA",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
};
