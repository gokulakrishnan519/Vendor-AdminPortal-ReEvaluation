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
  Tooltip,
} from "@mui/material";
import { Chip } from "@mui/material";
import Navbar from "../../Navbars/Navbar";
import dropdown from "../../Images/Dropdown.png";
import CloseIcon from "@mui/icons-material/Close";

import RFQ_1 from "../../Images/RFQs/RFQ_1.png";
import total_active_cases from "../../Images/RFQs/Active Cases Icon.png";
import RFQ_2 from "../../Images/RFQs/RFQ_2.png";
import RFQ_3 from "../../Images/RFQs/RFQ_3.png";
import RFQ_4 from "../../Images/RFQs/RFQ_4.png";
import RFQ_5 from "../../Images/RFQs/RFQ_5.png";

import new_img from "../../Images/Toggle/New.png";
import inProgress from "../../Images/Toggle/inprogress.png";
import submitted from "../../Images/Toggle/submitted.png";
import completed from "../../Images/Toggle/completed.png";
import expired from "../../Images/Toggle/expired.png";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import new_img_active from "../../Images/Toggle/New_active.png";
import inProgress_active from "../../Images/Toggle/inprogress_active.png";
import submitted_active from "../../Images/Toggle/submitted_active.png";
import completed_active from "../../Images/Toggle/completed_active.png";
import expired_active from "../../Images/Toggle/expired_active.png";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading/Loading";
import search_icon from "../../Images/Search Icon.png";

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

const bodyCellStylen = {
  fontSize: "12px",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "6px",
  paddingBottom: "6px",
  whiteSpace: "nowrap",

  // cursor: "pointer",
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

export default function RFQs() {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("rfqToggle") == null
      ? "All"
      : sessionStorage.getItem("rfqToggle"),
  );
  const [filterName, setFilterName] = useState(
    sessionStorage.getItem("filter_name") == null
      ? "All"
      : sessionStorage.getItem("filter_name"),
  );

  const [filterNameEx, setFilterNameEx] = useState(
    sessionStorage.getItem("filter_nameEx") == null
      ? "All"
      : sessionStorage.getItem("filter_nameEx"),
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
          mb={1}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
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

  const getKPICounts = async () => {
    //setLoading(true);
    const payload = {
      vendor_account: sessionStorage.getItem("vend_account"),
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/vendorkpi/vendorrfqkpi",
        payload,
      );

      console.log(res.data);

      setKpiCounts(res.data.data);
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

  useEffect(() => {
    getKPICounts();
  }, []);

  const statsData = [
    {
      title: "All Cases",
      value: kpiCounts?.total_rfq_cases,
      description: "Cases across all statuses and stages",
      icon: RFQ_1,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      valueColor: "#725CFC",

      border: "1.5px solid #DDDEE0",
    },
    {
      title: "Total Active Cases",
      value: kpiCounts?.total_active_cases,
      description: "Cases currently in progress",
      icon: total_active_cases,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      valueColor: "#10b981",

      border: "1.5px solid #DDDEE0",
    },
    {
      title: "On Bidding",
      value: kpiCounts?.on_bidding,
      description: "Vendors are submitting bids",
      icon: RFQ_2,
      iconBg: "#fff7ed",
      iconColor: "#f59e0b",
      valueColor: "#f59e0b",
      border: "1.5px solid #DDDEE0",
    },
    {
      title: "Under Review",
      value: kpiCounts?.under_review,
      description: "Vendor bids being evaluated",
      icon: RFQ_4,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      valueColor: "#725CFC",
      border: "1.5px solid #DDDEE0",
    },
    {
      title: "Expiring Soon",
      value: kpiCounts?.expiring_soon,
      description: "Expiry Date within next 3 days.",
      icon: RFQ_3,
      iconBg: "#ecfdf5",
      iconColor: "#10b981",
      valueColor: "#f59e0b",

      border: "1.5px solid #DDDEE0",
    },

    {
      title: "Closed",
      value: kpiCounts?.closed_cases,
      description: "Cases that have been completed and closed",
      icon: RFQ_5,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      valueColor: "#10b981",
      border: "1.5px solid #DDDEE0",
    },
  ];

  const tabs = [
    {
      label: "All",
      img: new_img,
      activeimg: new_img_active,
      // count: kpiCounts?.new,
    },
    {
      label: "On Bidding",
      img: inProgress,
      activeimg: inProgress_active,
      // count: kpiCounts?.in_progress,
    },
    {
      label: "Under Review",
      img: submitted,
      activeimg: submitted_active,
      // count: kpiCounts?.submitted,
    },
    {
      label: "Closed",
      img: completed,
      activeimg: completed_active,
      // count: kpiCounts?.completed,
    },
    {
      label: "Expired",
      img: completed,
      activeimg: completed_active,
      // count: kpiCounts?.completed,
    },
  ];

  const getRFQs = async () => {
    setLoading(true);

    const payload = {
      status: "all",
    };

    try {
      const res = await axios.post(
        activeTab === "All"
          ? "http://10.50.20.89:9091/rfq/cases"
          : activeTab === "On Bidding"
            ? "http://10.50.20.89:9091/RFQ/rfq/casesonbid"
            : activeTab === "Under Review"
              ? "http://10.50.20.89:9091/RFQ/rfq/casesunderreview"
              : activeTab === "Closed"
                ? "http://10.50.20.89:9091/RFQ/rfq/casesclosed"
                : activeTab === "Expired"
                  ? "http://10.50.20.89:9091/RFQ/rfq/casesexpired"
                  : "",
        payload,
      );

      console.log(res.data);

      setTableData(res.data.data);
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

  const filteredRows = tableData?.filter((row) => {
    // Search condition
    const matchesSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    );

    // Extra filters
    let matchesFilter = true;

    if (filterNameEx === true) {
      matchesFilter = row.expiry_status === true;
    } else if (filterNameEx === "Total Active Cases") {
      matchesFilter = row.status !== "Closed";
    }

    return matchesSearch && matchesFilter;
  });

  console.log(tableData);

  useEffect(() => {
    getRFQs();
  }, [activeTab]);

  useEffect(() => {
    sessionStorage.setItem("selectnav1", "RFQs");
  }, []);

  const totalPages = Math.ceil(filteredRows?.length / rowsPerPage);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Box sx={{ mb: 2 }}>
            {/* <Grid container spacing={2.5}>
              {statsData.map((stat, index) => (
                <Grid size={{ lg: 2.5, xs: 12, md: 12, sm: 12 }} key={index}>
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
                        if (stat.title == "All Cases") {
                          if (activeTab == "All") {
                            getRFQs();
                          }
                          setActiveTab("All");
                          sessionStorage.setItem("rfqToggle", "All");
                          setPage(0);

                          setFilterName("All");
                          sessionStorage.setItem("filter_name", "All");

                          setFilterNameEx(false);
                          sessionStorage.setItem("filter_nameEx", false);
                        } else if (stat.title == "Total Active Cases") {
                          setActiveTab("All");
                          sessionStorage.setItem("rfqToggle", "All");
                          // const activeCases = tableData
                          //   ?.filter((item) => item.status !== "Closed") // Closed remove
                          //   .map((item) => ({
                          //     ...item,
                          //   }));

                          // setTableData(activeCases);
                          setPage(0);
                          setFilterName("Total Active Cases");
                          sessionStorage.setItem(
                            "filter_name",
                            "Total Active Cases",
                          );

                          setFilterNameEx("Total Active Cases");
                          sessionStorage.setItem(
                            "filter_nameEx",
                            "Total Active Cases",
                          );
                        } else if (stat.title == "On Bidding") {
                          setActiveTab("On Bidding");
                          sessionStorage.setItem("rfqToggle", "On Bidding");
                          setPage(0);
                          setFilterName("All");
                          sessionStorage.setItem("filter_name", "All");

                          setFilterNameEx(false);
                          sessionStorage.setItem("filter_nameEx", false);

                          getRFQs();
                        } else if (stat.title == "Expiring Soon") {
                          setActiveTab("On Bidding");
                          sessionStorage.setItem("rfqToggle", "On Bidding");

                          // const activeCases = tableData
                          //   ?.filter((item) => item.expiry_status == true) // Closed remove
                          //   .map((item) => ({
                          //     ...item,
                          //   }));

                          // setTableData(activeCases);
                          setPage(0);
                          setFilterName(stat.description);
                          sessionStorage.setItem(
                            "filter_name",
                            stat.description,
                          );

                          setFilterNameEx(true);
                          sessionStorage.setItem("filter_nameEx", true);
                        } else if (stat.title == "Under Review") {
                          setActiveTab("Under Review");
                          sessionStorage.setItem("rfqToggle", "Under Review");
                          setPage(0);
                          setFilterName("All");
                          sessionStorage.setItem("filter_name", "All");

                          setFilterNameEx(false);
                          sessionStorage.setItem("filter_nameEx", false);
                        } else if (stat.title == "Closed") {
                          setActiveTab("Closed");
                          sessionStorage.setItem("rfqToggle", "Closed");
                          setPage(0);
                          setFilterName("All");
                          sessionStorage.setItem("filter_name", "All");

                          setFilterNameEx(false);
                          sessionStorage.setItem("filter_nameEx", false);
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

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ lg: 12, xs: 12, md: 12, sm: 12 }}>
              <Grid
                container
                sx={{
                  py: 3,
                  px: 2,
                  bgcolor: "#fff",
                  alignItems: "center",
                }}
              >
                {/* Title */}
                <Grid size={{ lg: 2, xs: 12 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    Cases Overview
                  </Typography>
                </Grid>

                {/* Tabs */}
                <Grid
                  size={{ lg: 8, xs: 12 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: 2, lg: 0 },
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      bgcolor: "#F2F3F4",
                      borderRadius: 2,
                      gap: 0.75,
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
                            sessionStorage.setItem("rfqToggle", tab.label);
                            setSearch("");
                            setPage(0);
                            setFilterName("All");
                            sessionStorage.setItem("filter_name", "All");
                          }}
                          sx={{
                            minWidth: { xs: "100%", sm: 130 },
                            px: 2,
                            py: 1,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: isActive ? "#DBE5F5" : "transparent",
                            color: isActive ? "#0C52BC" : "#2e2e2e",
                            borderRadius: isActive
                              ? isFirst
                                ? "7px 0 0 7px"
                                : isLast
                                  ? "0 7px 7px 0"
                                  : 0
                              : 0,
                          }}
                        >
                          <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'
                          >
                            <Box
                              component='img'
                              src={isActive ? tab.activeimg : tab.img}
                              alt={tab.label}
                              sx={{ height: 10 }}
                            />

                            <Typography
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {tab.label}
                            </Typography>

                            <Box
                              sx={{
                                px: 0.75,
                                borderRadius: "10px",
                                fontSize: 10,
                                fontWeight: 500,
                                lineHeight: 1.5,
                                fontFamily: "Poppins, sans-serif",
                                bgcolor: isActive ? "#0C52BC" : "#E0E0E0",
                                color: isActive ? "#fff" : "#333",
                              }}
                            >
                              {tab.count}
                            </Box>
                          </Stack>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>

                {/* Actions */}
                <Grid
                  size={{ lg: 2, xs: 12 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", lg: "flex-end" },
                    alignItems: "center",
                    gap: 1,
                    mt: { xs: 2, lg: 0 },
                  }}
                >
                  {filterName !== "All" && (
                    <Chip
                      label={filterName}
                      onDelete={() => {
                        setFilterName("All");
                        sessionStorage.setItem("filter_name", "All");
                        getRFQs();
                      }}
                      deleteIcon={<CloseIcon />}
                      sx={{
                        bgcolor: "#EEF0F3",
                        color: "#5B6472",
                        fontSize: 12,
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "20px",
                        height: 34,
                        "& .MuiChip-deleteIcon": {
                          color: "#7A8391",
                          fontSize: 18,
                        },
                      }}
                    />
                  )}

                  <Button
                    variant='outlined'
                    onClick={handleClick}
                    sx={{
                      minWidth: "auto",
                      px: 1.5,
                      py: 0.8,
                      borderRadius: "6px",
                      textTransform: "none",
                      bgcolor: "#f5f5f5",
                      borderColor: "#ddd",
                      color: "#555",
                      "&:hover": {
                        bgcolor: "#eee",
                        borderColor: "#ccc",
                      },
                    }}
                  >
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <img
                        src={search_icon}
                        alt='search'
                        width={15}
                        height={15}
                      />
                      <img
                        src={dropdown}
                        alt='dropdown'
                        style={{ height: 5 }}
                      />
                    </Stack>
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
                        {headers.map((header) => (
                          <TableCell
                            key={header}
                            sx={headerCellStyle}
                            align={
                              header === "Status"
                                ? "center"
                                : header == "Vendor Count"
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
                      {filteredRows && filteredRows?.length === 0 ? (
                        <TableRow>
                          <TableCell
                            sx={{ py: 1, fontFamily: "Poppins, sans-serif" }}
                            colSpan={10}
                            align='center'
                          >
                            No Data
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRows
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((row, index) => (
                            <Tooltip
                              title={
                                <Box>
                                  <Typography
                                    sx={{
                                      fontFamily: "Poppins",
                                      fontSize: "8px",
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
                              <TableRow
                                key={index}
                                sx={{
                                  // backgroundColor:
                                  //   index % 2 === 0 ? "#fff" : "#fafafa",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate("/RFQDetails", {
                                    state: {
                                      tabName: activeTab,
                                      case_id: row.rfq_case_id,
                                      status: row.status,
                                    },
                                  });
                                }}
                              >
                                <TableCell sx={bodyCellStyle}>
                                  {row.rfq_case_id}
                                </TableCell>

                                <TableCell sx={bodyCellStyle}>
                                  {row.case_name}
                                </TableCell>

                                <TableCell sx={bodyCellStyle} align='right'>
                                  {row.vendor_count}
                                </TableCell>

                                <TableCell sx={bodyCellStyle}>
                                  {row.created_date}
                                </TableCell>

                                <TableCell sx={bodyCellStyle}>
                                  {row.expiry_date}
                                </TableCell>

                                {/* <TableCell sx={bodyCellStyle}>
                                  {row.created_date}
                                </TableCell> */}

                                <TableCell align='center' sx={{ py: "4px" }}>
                                  <Chip
                                    label={row.status}
                                    size='small'
                                    sx={{
                                      height: "25px",
                                      width: 120,
                                      backgroundColor:
                                        PURCH_STATUS_COLOR[
                                          row.status === "Under Review"
                                            ? "Under_Review"
                                            : row.status === "On Bidding"
                                              ? "On_Bidding"
                                              : row.status === "Expired"
                                                ? "Expired"
                                                : row.status
                                        ]?.bg,
                                      color:
                                        PURCH_STATUS_COLOR[
                                          row.status === "Under Review"
                                            ? "Under_Review"
                                            : row.status === "On Bidding"
                                              ? "On_Bidding"
                                              : row.status === "Expired"
                                                ? "Expired"
                                                : row.status
                                        ]?.text,
                                      fontWeight: 500,
                                      fontFamily: "Poppins, sans-serif",
                                      borderRadius: "12px",
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            </Tooltip>
                          ))
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
                placeholder='Search...'
                sx={textFieldStyle}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
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

const getStatusChip = (status) => {
  if (status === "Under Review") {
    return {
      bg: "#E8E7FB",
      color: "#5B5BD6",
    };
  }

  if (status === "On Bidding") {
    return {
      bg: "#F5E6D3",
      color: "#E88A00",
    };
  }

  if (status === "Closed") {
    return {
      bg: "#FADADD",
      color: "#E54862",
    };
  }

  return {
    bg: "#eee",
    color: "#333",
  };
};

const headers = [
  "Case ID",
  "Case Title",
  "Vendor Count",
  "Created Date",
  "Expiration Date",
  // "Created by",
  "Status",
];

const PURCH_STATUS_COLOR = {
  Open: {
    bg: "#FEF2E0",
    text: "#F99709",
  },
  Received: {
    bg: "#F2F0FF",
    text: "#725CFC",
  },
  On_Bidding: {
    bg: "#FEF2E0",
    text: "#F99709",
  },
  Invoiced: {
    bg: "#FFEDD9",
    text: "#FF8800",
  },
  Cancelled: {
    bg: "#FFE0E5",
    text: "#E53A6B",
  },
  Confirmed: {
    bg: "#E3F7F4",
    text: "#21BFA7",
  },
  Closed: {
    bg: "#E3F7F4",
    text: "#21BFA7",
  },
  Under_Review: {
    bg: "#F2F0FF",
    text: "#725CFC",
  },
  Expired: {
    bg: "#FEE2E2",
    text: "#DC2626",
  },
};
