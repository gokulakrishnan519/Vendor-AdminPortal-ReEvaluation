import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";

export default function RecendActivity(props) {
  const recentItems = props?.allData?.recent_activity
    ?.slice(0, 3)
    ?.map((item) => ({
      bold: item.type,
      text: item.message,
      suffix: "  ",
    }));

  const recentItems1 = [
    {
      text: "Vendor invitation sent to ",
      bold: "Apex Electronics",
      suffix: ".",
      time: "10:45 AM",
      timeItalic: false,
    },
    {
      text: "PO ",
      bold: "PO-10234",
      suffix: " issued to Tech Knowledge Ltd.",
      time: "10:45 AM",
      timeItalic: false,
    },
    {
      text: "",
      bold: "Nova Circuits Pvt Ltd",
      suffix: " activated their vendor portal account.",
      time: "Yesterday",
      timeItalic: true,
    },
  ];

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
          Recent Activity
        </Typography>

        {recentItems &&
          recentItems.map((item, index) => (
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
                  {item.text}
                  <Box
                    component='span'
                    sx={{ paddingLeft: 2, fontWeight: 530 }}
                  >
                    {item.bold}
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.78rem",
                    color: "#999",
                    fontStyle: item.timeItalic ? "italic" : "normal",
                    whiteSpace: "nowrap",
                    ml: 2,
                  }}
                >
                  {item.time}
                </Typography>
              </Box>
              {index < recentItems.length - 1 && (
                <Divider sx={{ borderColor: "#f0f0f0" }} />
              )}
            </Box>
          ))}
      </Box>
    </div>
  );
}
