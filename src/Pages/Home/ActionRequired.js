import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import dayjs from "dayjs";

export default function ActionRequired(props) {
  const actionItems = props?.allData?.action_required?.map((item) => ({
    bold: item.type,
    text: item.message,
  }));

  // {
  //   bold: "Apex Electronics",
  //   text: "– Vendor activation pending (5 days)",
  //   time: "10:45 AM",
  // },
  // {
  //   bold: "RFQ-2478",
  //   text: "– Bidding closes today",
  //   time: "10:45 AM",
  // },

  return (
    <div>
      <Box
        sx={{
          background: "#fff",
          borderRadius: "16px",
          // border: "1.5px solid #e8e8e8",
          p: 2,
          height: "100%",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "1.1rem",
            color: "#1a1a2e",
            mb: 2,
          }}
        >
          Action Required
        </Typography>

        {actionItems &&
          actionItems?.map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                >
                  <Box component='span' sx={{ fontWeight: 500 }}>
                    {item.bold}
                  </Box>{" "}
                  {item.text}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.78rem",
                    color: "#999",
                    fontStyle: "italic",
                    whiteSpace: "nowrap",
                    ml: 2,
                  }}
                >
                  {item.time}
                </Typography>
              </Box>
              {index < actionItems.length - 1 && (
                <Divider sx={{ borderColor: "#f0f0f0" }} />
              )}
            </Box>
          ))}
      </Box>
    </div>
  );
}
