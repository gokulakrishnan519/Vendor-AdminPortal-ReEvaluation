import React, { useEffect, useState } from "react";
import Navbar from "../../Navbars/Navbar";
import ReactECharts from "echarts-for-react";
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
  Pagination,
  PaginationItem,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { Chip } from "@mui/material";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading/Loading";

import StorefrontIcon from "@mui/icons-material/Storefront";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ActionRequired from "./ActionRequired";
import RecendActivity from "./RecendActivity";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Home_1 from "../../Images/Home/Home_1.png";
import Home_2 from "../../Images/Home/Home_2.png";
import Home_3 from "../../Images/Home/Home_3.png";
import Home_4 from "../../Images/Home/Home_4.png";
import dayjs from "dayjs";

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

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("New");
  const [kpi, setKpi] = useState(null);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [kpiCounts, setKpiCounts] = useState(null);
  const [year, setYear] = React.useState(dayjs());

  const [allData, setAllData] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getHome = async () => {
    setLoading(true);
    const payload = {
      year: dayjs(year).format("YYYY"),
    };

    try {
      const res = await axios.post(
        "http://10.10.0.115:8095/kpi/dashboard",
        payload,
      );

      console.log(res.data);
      setAllData(res.data.data);
      setLoading(false);

      // setAllData(res.data);
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
    getHome();
  }, [year]);

  const filteredRows = tableData?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("selectnav1", "Home");
  }, []);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  console.log(allData);

  const stats = [
    {
      title: "Total Vendors",
      value: allData?.summary?.total_vendors,
      description: "Total vendors registered",
      icon: Home_1,
      gradient: "linear-gradient(to bottom, #E3DFFF, #FEEBCF)",
      borderGradient: "linear-gradient(to bottom, #AB9EFD, #FCC16C)",
      valueColor: "#1a1a2e",
      navigate_p: "Vendors",
      navigate_v: "",
    },
    {
      title: "Active Vendors",
      value: allData?.summary?.active_vendors,
      description: "Vendors who activated their portal accounts.",
      icon: Home_2,
      gradient: "linear-gradient(180deg, #E3DFFF 0%, #D3F3EE 100%)",
      borderGradient: "linear-gradient(to bottom, #AB9EFD, #7AD9CB)",
      valueColor: "#1a1a2e",
      navigate_p: "Vendors",
      navigate_v: "Active",
    },
    {
      title: "Open Cases",
      value: allData?.summary?.open_cases,
      description: "Cases currently open for vendor bidding.",
      icon: Home_3,
      gradient: "#E3DFFF",
      borderGradient: "#AB9EFD ",
      valueColor: "#725CFC",
      navigate_p: "RFQs",
      navigate_v: "On Bidding",
    },
    {
      title: "Open POs",
      value: allData?.summary?.open_pos,
      description: "Orders currently being fulfilled",
      icon: Home_4,
      gradient: "#D3F3EE",
      borderGradient: "#7AD9CB",
      valueColor: "#21BFA7",
      navigate_p: "POs",
      navigate_v: "Open",
    },
  ];

  const rfqsData = allData?.trend?.map((item) => item.rfq_created);
  const vendorData = allData?.trend?.map((item) => item.vendor_responses);
  const posData = allData?.trend?.map((item) => item.po_issued);
  const months = allData?.trend?.map((item) => item.month);

  const option = {
    grid: {
      top: 30,
      bottom: 60,
      left: 60,
      right: 30,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          formatter: (params) => {
            // Only format Y-axis label (axis: 1), leave X-axis as-is
            if (params.axisDimension === "y") {
              return Math.round(params.value);
            }
            return params.value;
          },
        },
      },
      backgroundColor: "#fff",
      borderColor: "#e0e0e0",
      borderWidth: 1,
      textStyle: {
        color: "#333",
        fontFamily: "Poppins, sans-serif",
        fontSize: 12,
      },
      valueFormatter: (value) => Math.round(value),
    },
    xAxis: {
      type: "category",
      data: months,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontFamily: "Poppins, sans-serif",
        fontSize: 11,
        color: "#888",
        margin: 25,
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      name: "Count",
      nameLocation: "middle",
      nameGap: 45,
      nameTextStyle: {
        fontFamily: "Poppins, sans-serif",
        fontSize: 12,
        color: "#888",
      },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontFamily: "Poppins, sans-serif",
        fontSize: 12,
        color: "#888",
        margin: 25,
      },
      splitLine: {
        lineStyle: { color: "#f0f0f0", width: 1 },
      },
    },
    series: [
      {
        name: "RFQs Created",
        type: "line",
        data: rfqsData,
        smooth: true,
        symbol: "circle",
        symbolSize: 7, // slightly bigger so it's visible
        showSymbol: true,
        showAllSymbol: "auto", // ✅ only show at actual data vertices
        itemStyle: {
          color: "#fff", // ✅ hollow circle
          borderColor: "#9b8fda",
          borderWidth: 2,
        },
        lineStyle: { color: "#9b8fda", width: 2 },

        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(155, 143, 218, 0.45)" },
              { offset: 1, color: "rgba(155, 143, 218, 0.05)" },
            ],
          },
        },
      },
      {
        name: "Vendor Responses",
        type: "line",
        data: vendorData,
        smooth: true,
        symbol: "circle",
        symbolSize: 7, // slightly bigger so it's visible
        showSymbol: true,
        showAllSymbol: "auto", // ✅ only show at actual data vertices
        itemStyle: {
          color: "#fff",
          borderColor: "#f5c06a",
          borderWidth: 2,
        },

        lineStyle: { color: "#f5c06a", width: 2 },

        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(245, 192, 106, 0.55)" },
              { offset: 1, color: "rgba(245, 192, 106, 0.05)" },
            ],
          },
        },
      },
      {
        name: "POs Issued",
        type: "line",
        data: posData,
        smooth: true,
        symbol: "circle",
        symbolSize: 7, // slightly bigger so it's visible
        showSymbol: true,
        showAllSymbol: "auto", // ✅ only show at actual data vertices
        itemStyle: {
          color: "#fff",
          borderColor: "#4ecdb4",
          borderWidth: 2,
        },
        lineStyle: { color: "#4ecdb4", width: 2 },

        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(78, 205, 180, 0.45)" },
              { offset: 1, color: "rgba(78, 205, 180, 0.05)" },
            ],
          },
        },
      },
    ],
  };

  const legendItems = [
    { label: "RFQs Created", color: "#9b8fda" },
    { label: "Vendor Responses", color: "#f5c06a" },
    { label: "POs Issued", color: "#4ecdb4" },
  ];

  return (
    <div>
      {loading == true ? (
        <Loading />
      ) : (
        <Navbar>
          <Grid>
            {/* First */}
            <Box
              sx={{
                background: "#fff",
                borderRadius: "16px",
                // border: "1.5px solid #e8e8e8",
                p: 2,
                fontFamily: "Poppins, sans-serif",
                mb: 2,
              }}
            >
              {/* size={{ lg: 3, xs: 12, md: 12, sm: 12 }} */}
              <Grid
                display='flex'
                gap={3}
                spacing={3}
                alignItems='stretch'
                sx={{
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {stats.map((stat, index) => (
                  <Grid key={index}>
                    <Tooltip
                      title={
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                          >
                            Click to view details
                          </Typography>
                        </Box>
                      }
                      arrow
                      placement='top'
                    >
                      <Card
                        elevation={0}
                        sx={{
                          width: "170px",
                          height: "170px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          background: stat.borderGradient
                            ? `${
                                stat.gradient.startsWith("#")
                                  ? `linear-gradient(${stat.gradient}, ${stat.gradient})`
                                  : stat.gradient
                              } padding-box, ${stat.borderGradient} border-box`
                            : stat.gradient,

                          border: stat.borderGradient
                            ? "1.5px solid transparent"
                            : "1px solid #e0e0e0",
                          borderRadius: "12px",
                          transition:
                            "transform 0.2s ease, box-shadow 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                          },
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (stat.title == "Total Vendors") {
                            navigate(`/${stat.navigate_p}`);
                            // sessionStorage.setItem(
                            //   "vendor_search",
                            //   stat.navigate_v,
                            // );
                          } else if (stat.title == "Active Vendors") {
                            navigate(`/${stat.navigate_p}`);
                            sessionStorage.setItem(
                              "vendor_status",
                              stat.navigate_v,
                            );
                            sessionStorage.setItem("vendorToggle", "Vendors");
                          } else if (stat.title == "Open Cases") {
                            navigate(`/${stat.navigate_p}`);
                            sessionStorage.setItem(
                              "rfqToggle",
                              stat.navigate_v,
                            );
                          } else if (stat.title == "Open POs") {
                            navigate(`/${stat.navigate_p}`);
                            sessionStorage.setItem(
                              "po_status",
                              stat.navigate_v,
                            );
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
                                fontFamily: "Poppins, sans-serif",
                                fontStyle: "italic",
                                fontSize: "0.6rem",
                                color: "#555",
                                lineHeight: 1.4,
                                display: "block",
                                minHeight: "25px",
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

            {/* second */}
            <Box
              sx={{
                background: "#fff",
                borderRadius: "16px",
                // border: "1.5px solid #e8e8e8",
                p: 2,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {/* Title + Filter */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    color: "#1a1a2e",
                  }}
                >
                  Procurement Activity Trend
                </Typography>
                {/* <Chip
                  label='2026'
                  // variant='outlined'
                  sx={{
                    background: "#F1EFFF",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    // borderColor: "#d0d0d0",
                    color: "#444",
                    borderRadius: "6px",
                  }}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ border: "none" }}
                    format='YYYY'
                    views={["year"]}
                    value={year}
                    // minDate={dayjs()}
                    onChange={(date) => {
                      setYear(date);
                    }}
                    slotProps={{
                      textField: {
                        variant: "standard",

                        inputProps: {
                          readOnly: true,
                        },
                        sx: {
                          border: "1px solid #AAAAAA",
                          backgroundColor: "#fff",
                          borderRadius: "4px",
                          width: 130,
                          "& input": {
                            cursor: "default", // ✅ No cursor on input
                            pointerEvents: "none", // ✅ Clicks on input are ignored
                          },
                          "& .MuiInputAdornment-root": {
                            cursor: "pointer", // ✅ Pointer only on icon
                            pointerEvents: "all", // ✅ Icon remains clickable
                          },
                        },
                        InputProps: {
                          disableUnderline: true,
                          border: "none",
                          sx: {
                            padding: "6px",
                            fontFamily: "Times New Roman",
                            fontSize: "0.8rem",
                            border: "none",
                            height: 25,
                            cursor: "not-allowed",
                            pointerEvents: "none",
                            "& .MuiInputBase-input": {
                              padding: "2px 6px",
                              fontSize: "0.5rem",
                              fontFamily: "Times New Roman !important",
                              border: "none",
                              cursor: "not-allowed !important",
                              pointerEvents: "none", // ✅ Input not clickable
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
              </Box>

              {/* Chart */}
              <ReactECharts option={option} style={{ height: 280 }} />

              {/* Custom Legend */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                {legendItems.map((item) => (
                  <Box
                    key={item.label}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: "3px",
                        background: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.78rem",
                        color: "#555",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Third */}

            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2.5}>
                <Grid size={{ lg: 6, xs: 12, md: 12, sm: 12 }}>
                  <ActionRequired allData={allData} />
                </Grid>
                <Grid size={{ lg: 6, xs: 12, md: 12, sm: 12 }}>
                  <RecendActivity allData={allData} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Navbar>
      )}
    </div>
  );
}
