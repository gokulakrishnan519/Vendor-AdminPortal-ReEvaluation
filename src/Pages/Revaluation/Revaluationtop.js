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

import Vendors_1 from "../../Images/Prospects/Prospect KPI 1.png";
import Vendors_2 from "../../Images/Prospects/Prospect KPI 2.png";
import Vendors_3 from "../../Images/Prospects/Prospect KPI 3.png";
import Vendors_4 from "../../Images/Prospects/Prospect KPI 4.png";
import Vendors_5 from "../../Images/Prospects/Prospect KPI 5.png";
import duesoon from "../../Images/Revaluation/Due Soon.png";
import returned from "../../Images/Revaluation/Returned Icon.png";
import documentissue from "../../Images/Revaluation/Document Expired.png";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Revaluationtop(props) {
  const [kpi, setKpi] = useState(null);

  console.log(props?.vendordetails);

  const propsData = props?.vendordetails;

  const navigate = useNavigate();

  const statCards = [
    {
      title: "Total Vendors",
      value: propsData?.total_vendors,
      description: "All active vendors",
      icon: Vendors_1,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#e8820c",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
    {
      title: "In Review",
      value: propsData?.in_review,
      description: "Revaluation currently in progess",
      icon: Vendors_2,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#e8820c",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
    {
      title: "Returned",
      value: propsData?.returned,
      description: "Revaluation awaiting vendor resubmission",
      icon: returned,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#e8820c",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
    {
      title: "Due Soon",
      value: propsData?.due_soon,
      description: "Revaluation due within 30 days",
      icon: duesoon,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#21BFA7",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
    {
      title: "Document Issue",
      value: propsData?.document_issues,
      description: "Vendors with exoired or expiring documents",
      icon: documentissue,
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      border: "1.5px solid #DDDEE0",
      valueColor: "#725CFC",
      iconColor: "#e8820c",
      iconBg: "rgba(232, 130, 12, 0.12)",
    },
  ];

  return (
    <Box sx={{ p: 2, background: "#f5f6fa" }}>
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
        {statCards.map((stat, index) => {
          const isDocumentIssue = stat.title === "Document Issue";

          return (
            <Grid key={index}>
              <Card
                elevation={0}
                sx={{
                  width: "170px",
                  height: "170px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: stat.gradient,
                  border: stat.border,
                  borderRadius: "12px",

                  cursor: isDocumentIssue ? "pointer" : "default",

                  transition: isDocumentIssue
                    ? "transform 0.2s ease, box-shadow 0.2s ease"
                    : "none",

                  "&:hover": isDocumentIssue
                    ? {
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                      }
                    : {},

                  textDecoration: "none",
                }}
                onClick={() => {
                  if (isDocumentIssue) {
                    props.clickdocumentissue();
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
                        color:
                          stat.title === "Document Issue"
                            ? "#1976d2"
                            : "#1a1a2e",
                        textDecoration:
                          stat.title === "Document Issue"
                            ? "underline"
                            : "none",
                        cursor:
                          stat.title === "Document Issue"
                            ? "pointer"
                            : "default",
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

                  <Box>
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
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
