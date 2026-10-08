import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";

import Vendors_1 from "../../Images/Home/Home_1.png";
import Vendors_2 from "../../Images/Vendors/Vendors_2.png";
import Vendors_3 from "../../Images/Vendors/Vendors_3.png";
import Vendors_4 from "../../Images/Vendors/Vendors_4.png";
import Vendors_5 from "../../Images/Vendors/Vendors_5.png";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VendorTop(props) {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  console.log(props.tableData);

  const activeCount = props.tableData?.filter(
    (vendor) => vendor.status === "Active",
  ).length;

  const inactiveCount = props.tableData?.filter(
    (vendor) => vendor.status === "Inactive",
  ).length;

  const navigate = useNavigate();

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.dispose();

    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption({
      backgroundColor: "transparent",
      grid: { top: 10, bottom: 30, left: 90, right: 20 },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: "#fff",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        textStyle: { fontSize: 12, fontFamily: "Poppins, sans-serif" },
      },
      xAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { fontSize: 11, color: "#888" },
        splitLine: { lineStyle: { color: "#f0f0f0" } },
      },
      yAxis: {
        type: "category",
        data: ["Rogers 4350", "Copper Foil", "ENIG", "FR4"],
        name: "Raw Materials",
        nameLocation: "middle",
        nameGap: 75,
        nameTextStyle: {
          fontSize: 11,
          color: "#888",
          fontFamily: "Poppins, sans-serif",
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontSize: 11,
          color: "#555",
          fontFamily: "Poppins, sans-serif",
        },
      },
      series: [
        {
          type: "bar",
          data: [1.5, 5, 9.5, 8],
          barMaxWidth: 22,
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: "#a78bfa" },
              { offset: 1, color: "#c4b5fd" },
            ]),
          },
        },
      ],
    });

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  const getTablePurchaseOrder = async () => {
    try {
      const res = await axios.post(
        "http://10.10.0.115:8095/vendorkpi/vendordashkpi",
      );

      console.log(res.data);
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

  useEffect(() => {
    getTablePurchaseOrder();
  }, []);

  const statCards = [
    {
      title: "Total Vendors",
      value: kpi?.total_vendors,
      description: "Total Vendors Registered",
      icon: Vendors_1,
      gradient: "#E3DFFF",
      border: "1.5px solid #AB9EFD",
      valueColor: "#725CFC",
      iconColor: "#7c5cbf",
      iconBg: "rgba(124, 92, 191, 0.12)",
    },
    {
      title: "Total Materials Mapped",
      value: kpi?.total_materials_mapped,
      description: "Across all vendors.",
      icon: Vendors_2,
      gradient: "#D3F3EE",
      border: "1.5px solid #7AD9CB",
      valueColor: "#21BFA7",
      iconColor: "#0d8a72",
      iconBg: "rgba(13, 138, 114, 0.12)",
    },
    {
      title: "Upcoming Expirations",
      value: kpi?.upcoming_expiry,
      description: "Item expiring in the next 30 days",
      icon: Vendors_3,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#e8820c",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
    {
      title: "Active Vendors",
      value: activeCount,
      description: "Vendors with active portal access",
      icon: Vendors_4,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#21BFA7",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
    {
      title: "Inactive Vendors",
      value: inactiveCount,
      description: "Vendors yet to activate portal access",
      icon: Vendors_5,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#725CFC",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
  ];

  return (
    <Box sx={{ p: 2, background: "#f5f6fa" }}>
      {/* <Grid container spacing={2} alignItems='stretch'>
        {statCards.map((stat, index) => (
          <Grid size={{ lg: 3, xs: 12, md: 12, sm: 12 }} key={index}>
            <Card
              elevation={0}
              sx={{
                background: stat.gradient,
                border: stat.border || "none",
                borderRadius: "12px", // reduced from 16px
                height: "100%",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  height: "100%",
                  boxSizing: "border-box",
                  "&:last-child": { pb: 1.5 },
                }}
              >
                {/* Header */}
      {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1, // reduced from mb: 2
                  }}
                >
                  <Typography
                    variant='subtitle2' // reduced from subtitle1
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontSize: "0.95rem", // reduced from 0.95rem
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
                </Box> */}

      {/* Value */}
      {/* <Typography
                  variant='h4' // reduced from h3
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "1.8rem", // reduced from 2.6rem
                    color: stat.valueColor,
                    lineHeight: 1,
                    mb: 0.8, // reduced from 1.5
                  }}
                >
                  {stat.value}
                </Typography> */}

      {/* Description */}
      {/* <Typography
                  variant='caption' // reduced from body2
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontStyle: "italic",
                    fontSize: "0.7rem", // reduced from 0.78rem
                    color: "#555",
                    lineHeight: 1.4,
                    display: "block",
                  }}
                >
                  {stat.description}
                </Typography>
              </CardContent> */}
      {/* </Card>
          </Grid>
        ))} */}

      {/* Bar Chart Card */}
      {/* <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              background: "#fff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "16px",
              height: "100%",
              p: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#1a1a2e",
                mb: 1,
              }}
            >
              Any other Graph?
            </Typography>
            <div ref={chartRef} style={{ width: "100%", height: "180px" }} />
          </Card>
        </Grid> */}
      {/* </Grid> */}

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
        {statCards.map((stat, index) => (
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
                  if (stat.title == "Total Vendors") {
                    props.topFunction(stat.title, "Vendors", "All");
                  } else if (stat.title == "Total Materials Mapped") {
                    props.topFunction(stat.title, "Materials", "Active");
                  } else if (stat.title == "Active Vendors") {
                    props.topFunction(stat.title, "Vendors", "Active");
                  } else if (stat.title == "Inactive Vendors") {
                    props.topFunction(stat.title, "Vendors", "Inactive");
                  } else if (stat.title == "Upcoming Expirations") {
                    props.topFunction(stat.title, stat.description, true);
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
  );
}
