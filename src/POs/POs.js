import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Stack,
  TableCell,
  TablePagination,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  TableHead,
  Popover,
  TextField,
  Modal,
  Pagination,
  PaginationItem,
  CardContent,
  Card,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Chip } from "@mui/material";
import Navbar from "../../src/Navbars/Navbar";

import dropdown from "../../src/Images/Dropdown.png";

import new_img from "../../src/Images/Toggle/New.png";
import inProgress from "../../src/Images/Toggle/inprogress.png";
import submitted from "../../src/Images/Toggle/submitted.png";
import completed from "../../src/Images/Toggle/completed.png";
import expired from "../../src/Images/Toggle/expired.png";
import CloseIcon from "@mui/icons-material/Close";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import new_img_active from "../../src/Images/Toggle/New_active.png";
import inProgress_active from "../../src/Images/Toggle/inprogress_active.png";
import submitted_active from "../../src/Images/Toggle/submitted_active.png";
import completed_active from "../../src/Images/Toggle/completed_active.png";
import expired_active from "../../src/Images/Toggle/expired_active.png";

import po_1 from "../../src/Images/POs/PO_1.png";
import po_2 from "../../src/Images/POs/PO_2.png";
import po_3 from "../../src/Images/POs/PO_3.png";
import po_4 from "../../src/Images/POs/PO_4.png";

import cancelled_icon from "../../src/Images/POs/Cancelled POs.png";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../src/Loading/Loading";
import search_icon from "../../src/Images/Search Icon.png";

const headerCellStyle = {
  fontSize: "12px",
  backgroundColor: "#F0EFF7",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  border: "1px solid #DDDEE0",
  paddingTop: "6px",
  paddingBottom: "6px",

  whiteSpace: "nowrap",
};

const bodyCellStyle = {
  fontSize: "12px",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "6px",
  paddingBottom: "6px",
  whiteSpace: "nowrap",
  cursor: "pointer",
  // px: "4px",
};

const textFieldStyle = {
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

export default function POs() {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("po_tab") == null
      ? "All POs"
      : sessionStorage.getItem("po_tab"),
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [kpi, setKpi] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalTittle, setModalTittle] = useState("");
  const [modalDesc, setModalDesc] = useState(null);
  const [kpiCounts, setKpiCounts] = useState(null);

  const [status, setStatus] = useState(
    sessionStorage.getItem("po_status") == null
      ? "All"
      : sessionStorage.getItem("po_status"),
  );

  const navigate = useNavigate();

  const StatCard = ({
    title,
    value,
    description,
    icon,
    iconBg,
    iconColor,
    valueColor,
  }) => (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1.5px solid #e5e7eb", // light grey border
        height: "100%",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header Row */}
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              borderRadius: "8px",
              p: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={icon}
              alt='icon'
              style={{
                width: "30px",
                height: "30px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* Value */}
        <Typography
          sx={{
            color: valueColor,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "1.6rem",
            lineHeight: 1,
            mb: 1,
          }}
        >
          {value}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontStyle: "italic",
            fontSize: "0.75rem",
            color: "text.secondary",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  // useEffect(() => {
  //   sessionStorage.removeItem("po_status");
  // }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const tabs = [
    {
      label: "All POs",
      img: new_img,
      activeimg: new_img_active,
      count: kpiCounts?.new,
    },
    {
      label: "Bidding Orders",
      img: inProgress,
      activeimg: inProgress_active,
      count: kpiCounts?.in_progress,
    },
    {
      label: "Direct Orders",
      img: submitted,
      activeimg: submitted_active,
      count: kpiCounts?.submitted,
    },
  ];

  const statsData = [
    {
      title: "Total POs",
      value: kpi?.total_pos,
      description: "All purchase orders created",
      icon: po_1,
      iconBg: "#ede9fe",
      iconColor: "#6366f1",
      valueColor: "#6366f1",
      border: "1.5px solid #DDDEE0",
    },
    {
      title: "Open POs",
      value: kpi?.open_pos,
      description: "POs waiting for approval",
      icon: po_2,
      iconBg: "#fff7ed",
      iconColor: "#f59e0b",
      valueColor: "#f59e0b",
      border: "1.5px solid #DDDEE0",
    },
    {
      title: "Received POs",
      value: kpi?.received_pos,
      description: "POs with completed deliveries",
      icon: po_3,
      iconBg: "#ecfdf5",
      iconColor: "#14b8a6",
      valueColor: "#14b8a6",
      border: "1.5px solid #DDDEE0",
    },
    {
      title: "Invoiced POs",
      value: kpi?.invoiced_pos,
      description: "POs with completed invoicing",
      icon: po_4,
      iconBg: "#ede9fe",
      iconColor: "#6366f1",
      valueColor: "#6366f1",
      border: "1.5px solid #DDDEE0",
    },
    {
      title: "Cancelled POs",
      value: kpi?.cancelled_pos,
      description: "POs that have been cancelled",
      icon: cancelled_icon,
      iconBg: "#ede9fe",
      iconColor: "#6366f1",
      valueColor: "#f59e0b",
      border: "1.5px solid #DDDEE0",
    },
  ];

  useEffect(() => {
    getKPI();
  }, []);

  const getKPI = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://10.10.0.115:8095/po/kpi");

      console.log(res.data.data);

      setKpi(res.data.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const getPoList = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        activeTab === "All POs"
          ? "http://10.10.0.115:8095/po/list"
          : activeTab === "Bidding Orders"
            ? "http://10.10.0.115:8095/po/bidlist"
            : activeTab === "Direct Orders"
              ? "http://10.10.0.115:8095/po/directlist "
              : "",
      );

      console.log(res.data);

      setTableData(res.data.po_list);
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
    getPoList();
  }, [activeTab]);

  const filteredRows = tableData?.filter((row) => {
    const matchesSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    );

    const matchesStatus = status === "All" || row.status === status;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    sessionStorage.setItem("selectnav1", "POs");
  }, []);

  const totalPages = Math.ceil(filteredRows?.length / rowsPerPage);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Box>
            {/* <Grid container spacing={2.5}>
              {statsData.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StatCard {...stat} />
                </Grid>
              ))}
            </Grid> */}

            <Grid
              display='flex'
              gap={2}
              spacing={1.5}
              alignItems='stretch'
              sx={{
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              {statsData.map((stat, index) => (
                <Grid key={index}>
                  <Tooltip
                    title={
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "10px",
                            fontWeight: 500,
                          }}
                        >
                          Click to view details
                        </Typography>
                      </Box>
                    }
                    arrow
                    placement='top'
                    key={index}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        width: "170px",
                        height: "170px", // same height for all cards
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: stat.gradient,
                        border: stat.border,
                        borderRadius: "12px",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                        },
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (stat.title == "Total POs") {
                          if (activeTab == "All POs") {
                            getPoList();
                          }
                          setActiveTab("All POs");
                          setStatus("All");
                          sessionStorage.setItem("po_status", "All");
                          sessionStorage.setItem("po_tab", "All POs");
                        } else if (stat.title == "Open POs") {
                          setActiveTab("All POs");
                          sessionStorage.setItem("po_tab", "All POs");
                          setStatus("Open");
                          sessionStorage.setItem("po_status", "Open");
                        } else if (stat.title == "Received POs") {
                          setActiveTab("All POs");
                          setStatus("Received");
                          sessionStorage.setItem("po_tab", "All POs");
                          sessionStorage.setItem("po_status", "Received");
                        } else if (stat.title == "Invoiced POs") {
                          setActiveTab("All POs");
                          setStatus("Invoiced");
                          sessionStorage.setItem("po_tab", "All POs");
                          sessionStorage.setItem("po_status", "Invoiced");
                        } else if (stat.title == "Cancelled POs") {
                          setActiveTab("All POs");
                          setStatus("Cancelled");
                          sessionStorage.setItem("po_tab", "All POs");
                          sessionStorage.setItem("po_status", "Cancelled");
                        }
                      }}
                    >
                      <Grid
                        sx={{
                          p: 2,
                          height: "100%",
                          boxSizing: "border-box",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Header - Top */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant='subtitle2'
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 500,
                              fontSize: "0.95rem",
                              color: "#1a1a2e",
                              lineHeight: 1.3,
                              maxWidth: "75%",
                            }}
                          >
                            {stat.title}
                          </Typography>

                          <Box
                            sx={{
                              borderRadius: "8px",
                              p: 0.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={stat.icon}
                              alt='icon'
                              style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "contain",
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Bottom Section */}
                        <Box>
                          {/* Value */}
                          <Typography
                            variant='h4'
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 500,
                              fontSize: "1.8rem",
                              color: stat.valueColor,
                              lineHeight: 1,
                              mb: 0.8,
                            }}
                          >
                            {stat.value}
                          </Typography>

                          {/* Description */}
                          <Typography
                            variant='caption'
                            sx={{
                              minHeight: "30px",
                              fontFamily: "Poppins, sans-serif",
                              fontStyle: "italic",
                              fontSize: "0.6rem",
                              color: "#555",
                              lineHeight: 1.4,
                              display: "block",
                            }}
                          >
                            {stat.description}
                          </Typography>
                        </Box>
                      </Grid>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={{ lg: 12, xs: 12, md: 12, sm: 12 }}>
              <Grid
                container
                sx={{
                  py: 3,
                  px: 2,
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              >
                <Grid
                  size={{ lg: 2, xs: 12, md: 12, sm: 12 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "18px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    POs Overview
                  </Typography>
                </Grid>
                <Grid
                  size={{ lg: 8, xs: 12, md: 12, sm: 12 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      background: "#F2F3F4",
                      borderRadius: "7px",
                      gap: "6px",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {tabs.map((tab, index) => {
                      const isActive = activeTab === tab.label;
                      const isFirst = index === 0;
                      const isLast = index === tabs.length - 1;

                      return (
                        <Box
                          key={tab.label}
                          onClick={() => {
                            setActiveTab(tab.label);
                            sessionStorage.setItem("po_tab", tab.label);
                            setPage(0);
                            setSearch("");
                            setStatus("All");

                            // sessionStorage.setItem("vendorToggle", tab.label);
                          }}
                          sx={{
                            minWidth: { xs: "100%", sm: "130px" },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 2,
                            py: 0.9,
                            cursor: "pointer",
                            background: isActive ? "#DBE5F5" : "transparent",
                            color: isActive ? "#0C52BC" : "#2e2e2e",
                            borderRadius: isActive
                              ? isFirst
                                ? "7px 0 0 7px"
                                : isLast
                                  ? "0 7px 7px 0"
                                  : "0"
                              : "0",
                          }}
                        >
                          {/* Center container */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              width: "100%",
                            }}
                          >
                            <Box
                              component='img'
                              src={isActive ? tab.activeimg : tab.img}
                              alt={tab.label}
                              sx={{ height: 10, objectFit: "contain" }}
                            />

                            <Typography
                              fontWeight={500}
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {tab.label}
                            </Typography>

                            <Box
                              sx={{
                                background: isActive ? "#0C52BC" : "#E0E0E0",
                                color: isActive ? "#fff" : "#333",
                                borderRadius: "10px",
                                px: "6px",
                                fontSize: "10px",
                                fontWeight: 500,
                                lineHeight: 1.5,
                                fontFamily: "Poppins, sans-serif",
                              }}
                            >
                              {tab.count}
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
                <Grid
                  size={{ lg: 2, xs: 12, md: 12, sm: 12 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    gap: 2,
                  }}
                >
                  {status != "All" && (
                    <Chip
                      label={status}
                      onDelete={() => {
                        setStatus("All");
                        sessionStorage.setItem("po_status", "All");
                      }}
                      deleteIcon={<CloseIcon />}
                      sx={{
                        background: "#EEF0F3",
                        color: "#5B6472",
                        fontSize: "12px",
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "20px",
                        height: "34px",
                        "& .MuiChip-deleteIcon": {
                          color: "#7A8391",
                          fontSize: "18px",
                        },
                      }}
                    />
                  )}
                  <Button
                    variant='outlined'
                    onClick={handleClick}
                    sx={{
                      borderRadius: "6px",
                      textTransform: "none",
                      minWidth: "auto",
                      padding: "7px 12px",
                      backgroundColor: "#f5f5f5",
                      borderColor: "#ddd",
                      color: "#555",
                      "&:hover": {
                        backgroundColor: "#eee",
                        borderColor: "#ccc",
                      },
                    }}
                  >
                    <Grid
                      display='flex'
                      alignItems='center'
                      justifyContent='space-between'
                      sx={{ gap: 1 }}
                    >
                      <Grid
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <img
                          src={search_icon}
                          alt='filter'
                          style={{
                            width: 15,
                            height: 15,
                            objectFit: "contain",
                          }}
                        />
                      </Grid>

                      <Grid
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <img
                          src={dropdown}
                          alt='filter'
                          style={{
                            // width: 15,
                            height: 5,
                            objectFit: "contain",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>

              <Grid>
                {/* Table */}

                <TableContainer sx={{ backgroundColor: "#fff" }}>
                  <Table stickyHeader sx={{ width: "100%" }}>
                    {/* Header */}
                    <TableHead>
                      <TableRow>
                        {[
                          "Purchase ID",
                          activeTab != "Direct Orders" && "RFQ ID",
                          "Vendor Name",
                          "Total Amount",
                          "Currency",
                          "Created Date",
                          "Status",
                        ]
                          .filter(Boolean)
                          .map((header) => (
                            <TableCell
                              key={header}
                              sx={headerCellStyle}
                              align={
                                header === "Status"
                                  ? "center"
                                  : header == "Total Amount"
                                    ? "right"
                                    : "left"
                              }
                            >
                              {header}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>

                    {/* Body */}
                    <TableBody>
                      {filteredRows && filteredRows.length > 0 ? (
                        filteredRows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((row, index) => {
                            return (
                              <TableRow
                                key={index}
                                onClick={() => {
                                  navigate("/POsDetail", {
                                    state: {
                                      tabName: activeTab,
                                      purch_id: row.po_number,
                                    },
                                  });
                                }}
                              >
                                <TableCell sx={bodyCellStyle}>
                                  {row.po_number}
                                </TableCell>

                                {activeTab != "Direct Orders" && (
                                  <TableCell sx={bodyCellStyle}>
                                    {row.rfq_id}
                                  </TableCell>
                                )}

                                <TableCell sx={bodyCellStyle}>
                                  {row.vendor_name}
                                </TableCell>

                                <TableCell sx={bodyCellStyle} align='right'>
                                  {row.total_amount}
                                </TableCell>

                                <TableCell sx={bodyCellStyle}>
                                  {row.currency}
                                </TableCell>

                                <TableCell sx={bodyCellStyle}>
                                  {row.created_date}
                                </TableCell>

                                <TableCell align='center' sx={{ py: "4px" }}>
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
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            align='center'
                            sx={{ py: 1, fontFamily: "Poppins, sans-serif" }}
                          >
                            No Data Found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Stack
                      direction='row'
                      justifyContent='center'
                      sx={{ mt: 1 }}
                    >
                      <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={(event, value) => setPage(value - 1)}
                        siblingCount={2}
                        boundaryCount={1}
                        renderItem={(item) => (
                          <PaginationItem
                            {...item}
                            slots={{
                              previous: () => <span>Previous</span>,
                              next: () => <span>Next</span>,
                            }}
                            sx={{
                              border: "1px solid #d9d9d9",
                              borderRadius: "4px",
                              mx: 0.3,
                              fontFamily: "Poppins, sans-serif",
                              "&.Mui-selected": {
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                // border: "1px solid #1976d2",
                                fontFamily: "Poppins, sans-serif",
                              },
                            }}
                          />
                        )}
                      />
                    </Stack>
                    <TablePagination
                      component='div'
                      count={filteredRows && filteredRows?.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[5, 10, 20]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{ fontFamily: "Poppins, sans-serif" }}
                    />
                  </Grid>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>

          {/* POPOVER */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box p={2} width={220}>
              <TextField
                fullWidth
                size='small'
                placeholder='Search'
                sx={textFieldStyle}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />

              <Grid sx={{ mt: 1 }}>
                <Grid
                  sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                >
                  Select Status
                </Grid>

                <TextField
                  select
                  fullWidth
                  size='small'
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(0);
                  }}
                  sx={textFieldStyle}
                >
                  <MenuItem
                    value='All'
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                  >
                    All
                  </MenuItem>

                  <MenuItem
                    value='Open'
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                  >
                    Open
                  </MenuItem>

                  <MenuItem
                    value='Received'
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                  >
                    Received
                  </MenuItem>

                  <MenuItem
                    value='Invoiced'
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                  >
                    Invoiced
                  </MenuItem>

                  <MenuItem
                    value='Cancelled'
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                  >
                    Cancelled
                  </MenuItem>
                </TextField>
              </Grid>
            </Box>
          </Popover>

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
        </Navbar>
      )}
    </div>
  );
}

const PURCH_STATUS_COLOR = {
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
};
