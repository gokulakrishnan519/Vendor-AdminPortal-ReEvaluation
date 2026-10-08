import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase,
  Collapse,
  Divider,
  Grid,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExpandedDetail({ bidsData, status }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#fafbfd", p: 3 }}>
      {/* Vendor Information */}
      {/* <Typography
        variant='subtitle1'
        fontWeight={500}
        sx={{ fontFamily: "Poppins, sans-serif", color: "#1a1a2e", mb: 1.5 }}
      >
        Vendor Information
      </Typography>
      <Box display='flex' flexWrap='nowrap' gap={7} mb={3}>
        {[
          {
            label: "Vendor Account",
            value: bidsData?.vendor_information?.vendor_account,
          },
          {
            label: "Mobile Phone",
            value: bidsData?.vendor_information?.phone,
          },
          {
            label: "Email",
            value: bidsData?.vendor_information?.email,
          },
          {
            label: "Location",
            value: bidsData?.vendor_information?.address,
          },
          {
            label: "Currency",
            value: bidsData?.currency ? bidsData?.currency : "-",
          },
        ].map((item) => (
          <Box key={item.label}>
            <Typography
              variant='body2'
              maxWidth={400}
              fontWeight={500}
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#2e2e2e",
                fontSize: "13px",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                fontFamily: "Poppins, sans-serif",
                display: "block",
                color: "#2e2e2e",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 2.5 }} /> */}

      {/* Vendor's Reply */}
      {/* <Typography
        variant='subtitle1'
        fontWeight={500}
        sx={{ fontFamily: "Poppins, sans-serif", color: "#2e2e2e", mb: 1.5 }}
      >
        Vendor's Reply
      </Typography>
      <Box display='flex' flexWrap='wrap' gap={8} mb={3}>
        {[
          {
            label: "Expected Delivery Date",
            value:
              bidsData?.reply_delivery_date &&
              dayjs(bidsData?.reply_delivery_date, "DD/MM/YYYY").year() > 2000
                ? dayjs(bidsData?.reply_delivery_date, "DD/MM/YYYY").format(
                    "DD/MM/YYYY",
                  )
                : "-",
          },
          {
            label: "Mode of Delivery",
            value:
              bidsData?.reply_delivery_mode == ""
                ? "-"
                : bidsData?.reply_delivery_mode,
          },
          {
            label: "Delivery Term",
            value:
              bidsData?.reply_delivery_term == ""
                ? "-"
                : bidsData?.reply_delivery_term,
          },
        ].map((item) => (
          <Box key={item.label}>
            <Typography
              variant='body2'
              maxWidth={400}
              fontWeight={500}
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#2e2e2e",
                fontSize: "13px",
              }}
            >
              {item.label}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                fontFamily: "Poppins, sans-serif",
                display: "block",
                fontSize: "13px",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 2.5 }} /> */}

      {/* RFQ Line Items */}
      <Typography
        variant='subtitle1'
        fontWeight={500}
        sx={{ fontFamily: "Poppins, sans-serif", color: "#1a1a2e", mb: 1.5 }}
      >
        RFQ Line Items
      </Typography>
      <TableContainer
        sx={{
          border: "1px solid #e8edf2",
          borderRadius: "4px",
          overflow: "auto",
        }}
      >
        <Table size='small'>
          <TableHead>
            {/* Grouped header row 1 */}
            <TableRow>
              <TableCell
                rowSpan={2}
                sx={{ ...headerCellStyle, lineHeight: "20px" }}
              >
                Sl. No.
              </TableCell>

              <TableCell
                rowSpan={2}
                sx={{ ...headerCellStyle, lineHeight: "20px" }}
              >
                Material Code
              </TableCell>
              <TableCell
                rowSpan={2}
                sx={{ ...headerCellStyle, lineHeight: "20px" }}
              >
                Material Description
              </TableCell>

              <TableCell
                colSpan={5}
                align='center'
                sx={{ ...headerCellStyle, lineHeight: "20px" }}
              >
                HiQ Requirement
              </TableCell>

              <TableCell align='center' colSpan={4} sx={headerCellStyle}>
                Vendor's Responce
              </TableCell>

              {status != "Expired" && (
                <>
                  <TableCell align='center' rowSpan={2} sx={headerCellStyle}>
                    Status
                  </TableCell>

                  <TableCell align='center' rowSpan={2} sx={headerCellStyle}>
                    PO Number
                  </TableCell>
                </>
              )}
            </TableRow>
            {/* Grouped header row 2 */}
            <TableRow>
              {[
                "Quantity",
                "UOM",
                "Target Price",
                "Requested Delivery Date",
                "Comments",
                "Unit Price",
                "Net Amount",
                "Confirmed Delivery Date",
                "Remarks",
              ]
                .filter(Boolean)
                .map((col, i) => (
                  <TableCell
                    key={col}
                    sx={{
                      ...headerCellStyle,
                      borderRight: i < 3 ? "1px solid #e8edf2" : undefined,
                    }}
                    align={
                      col == "Target Price" || col == "Quantity" ? "right" : ""
                    }
                  >
                    {col}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bidsData?.line_items &&
              bidsData?.line_items?.map((item, idx) => (
                <TableRow key={idx} sx={bodyCellStyle}>
                  <TableCell sx={bodyCellStyle}>{item.line_num}</TableCell>
                  <TableCell sx={bodyCellStyle}>{item.item_id}</TableCell>
                  <TableCell sx={bodyCellStyle}>{item.item_name}</TableCell>
                  <TableCell sx={bodyCellStyle} align='right'>
                    {item.quantity}
                  </TableCell>

                  <TableCell sx={bodyCellStyle}>{item.uom}</TableCell>
                  <TableCell sx={bodyCellStyle} align='right'>
                    {item.target_price == "" ? "-" : item.target_price}
                  </TableCell>

                  <TableCell sx={bodyCellStyle}>
                    {item.rfq_delivery_date == ""
                      ? "-"
                      : item.rfq_delivery_date}
                  </TableCell>

                  <TableCell sx={bodyCellStyle}>
                    {item.comments ? (
                      item.comments.length > 10 ? (
                        <Tooltip
                          title={item.comments}
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
                          <span>{item.comments.slice(0, 10)}...</span>
                        </Tooltip>
                      ) : (
                        item.comments
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>

                  <TableCell sx={bodyCellStyle} align='right'>
                    {item.unit_price == "" ? "-" : item.unit_price}
                  </TableCell>
                  <TableCell sx={bodyCellStyle} align='right'>
                    {item.net_amount == "" ? "-" : item.net_amount}
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    {dayjs(item.vendor_delivery_date, "DD/MM/YYYY").year() >
                    2000
                      ? dayjs(item.vendor_delivery_date, "DD/MM/YYYY").format(
                          "DD/MM/YYYY",
                        )
                      : "-"}
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    {item.vendor_comments ? (
                      item.vendor_comments.length > 10 ? (
                        <Tooltip
                          title={item.vendor_comments}
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
                          <span>{item.vendor_comments.slice(0, 10)}...</span>
                        </Tooltip>
                      ) : (
                        item.vendor_comments
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>

                  {status != "Expired" && (
                    <>
                      <TableCell sx={bodyCellStyle} align='right'>
                        <Chip
                          label={item.hiq_decision}
                          size='small'
                          sx={{
                            width: 100,
                            fontSize: "12px",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                            borderRadius: "10px",
                            backgroundColor:
                              DECISION_COLOR[item.hiq_decision]?.bg,
                            color: DECISION_COLOR[item.hiq_decision]?.text,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        // style={bodyCellStyle}
                        align='right'
                        sx={{
                          ...bodyCellStyle,
                          cursor: "pointer",
                          color: "#1976d2",

                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                        onClick={() => {
                          navigate("/POsDetail", {
                            state: {
                              tabName: "All POs",
                              purch_id: item.purchid,
                            },
                          });
                        }}

                        //   onClick={() => {
                        //           navigate("/POsDetail", {
                        //             state: {
                        //               tabName: activeTab,
                        //               purch_id: row.po_number,
                        //             },
                        //           });
                        //         }}
                      >
                        {item.purchid == "" ? "-" : item.purchid}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function ModalBidsDetails(props) {
  const [bidsData, setBidsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getTableHistoryOfRFQLines = async () => {
    setLoading(true);

    const payload = {
      vendor_account: props.vendorAccount,
      rfq_id: props.bidRFQid,
      status: props.bidsStatus,
    };

    try {
      const res = await axios.post(
        "http://10.10.0.115:8095/RFQ/rfqhistoryline",
        payload,
      );

      console.log(res.data);

      setBidsData(res.data.data.data);
      console.log(res.data.data.data);
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
    getTableHistoryOfRFQLines();
  }, []);

  return (
    <div>
      <Card
        elevation={0}
        sx={{
          borderRadius: "12px",
          background: "#f3f6fd",
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {/* Left - RFQ Title */}
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "1.2rem",
            color: "#1a1a2e",
          }}
        >
          RFQ - {bidsData?.rfq_id}
        </Typography>

        {/* Right - Vendor Name */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
              color: "#1a1a2e",
            }}
          >
            Vendor Name
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "0.85rem",
              color: "#1a1a2e",
            }}
          >
            {bidsData?.vendor_information?.vendor_name}
          </Typography>
        </Box>
      </Card>
      <ExpandedDetail bidsData={bidsData} status={props.bidsStatus} />
    </div>
  );
}

const bodyCellStyle = {
  fontSize: "12px",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "8px",
  paddingBottom: "8px",
  whiteSpace: "normal",
  wordBreak: "break-word",
};

const headerCellStyle = {
  fontSize: "12px",
  backgroundColor: "#ECF0F4",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  border: "1px solid #DDDEE0",
  paddingTop: "6px",
  paddingBottom: "6px",

  // whiteSpace: "nowrap",
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
