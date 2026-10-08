import { useState, useEffect } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Navbar from "../../../Navbars/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Loading from "../../../Loading/Loading";
import search_icon from "../../../Images/Search Iconaaaa.png";

// ─── Countdown Hook ───────────────────────────────────────────────────────────

dayjs.extend(customParseFormat);

function useCountdown(targetDate) {
  const getRemainingSeconds = () => {
    const now = dayjs();
    const target = dayjs(targetDate, "DD/MM/YYYY");

    // if target date = today -> end of today
    const finalTarget = target.isSame(now, "day")
      ? target.endOf("day")
      : target;

    const diff = finalTarget.diff(now, "second");

    return diff > 0 ? diff : -1;
  };

  const [timeLeft, setTimeLeft] = useState(getRemainingSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft <= 0) return "-";

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

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

// ─── Expanded Detail Panel ────────────────────────────────────────────────────

function ExpandedDetail({ row, status }) {
  const cellSx = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.82rem",
    color: "#2d2d2d",
    borderBottom: "1px solid #f0f2f5",
    py: 1.6,
    whiteSpace: "normal",
    wordBreak: "break-word",
  };
  const headSx = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: "0.78rem",
    color: "#5a6172",
    backgroundColor: "#f4f6fa",
    py: 1.2,
    borderBottom: "1px solid #e8edf2",
  };

  return (
    <Box
      sx={{ backgroundColor: "#fafbfd", p: 3, borderTop: "1px solid #dee6ed" }}
    >
      {/* Vendor Information */}
      <Typography
        variant='subtitle1'
        fontWeight={500}
        sx={{ fontFamily: "Poppins, sans-serif", color: "#1a1a2e", mb: 1.5 }}
      >
        Vendor Information
      </Typography>
      <Box display='flex' flexWrap='nowrap' gap={7} mb={3}>
        {[
          { label: "Vendor Account", value: row?.vendor_account },
          { label: "Mobile Phone", value: row?.vendor_info?.mobile },
          { label: "Email", value: row?.vendor_info?.email },
          { label: "Location", value: row?.location },
          { label: "Currency", value: row?.vendor_reply?.currency },
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

      <Divider sx={{ mb: 2.5 }} />

      {/* Vendor's Reply */}
      <Typography
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
              row?.vendor_reply?.expected_delivery_date &&
              dayjs(
                row?.vendor_reply?.expected_delivery_date,
                "DD/MM/YYYY",
              ).year() > 2000
                ? dayjs(
                    row?.vendor_reply?.expected_delivery_date,
                    "DD/MM/YYYY",
                  ).format("DD/MM/YYYY")
                : "-",
          },
          {
            label: "Mode of Delivery",
            value:
              row?.vendor_reply?.mode_of_delivery == ""
                ? "-"
                : row?.vendor_reply?.mode_of_delivery,
          },
          {
            label: "Delivery Term",
            value:
              row?.vendor_reply?.delivery_term == ""
                ? "-"
                : row?.vendor_reply?.delivery_term,
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

      <Divider sx={{ mb: 2.5 }} />

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
          overflow: "hidden",
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
              {/* <TableCell
                rowSpan={2}
                sx={{ ...headerCellStyle, lineHeight: "20px" }}
              >
                Vendor's Remarks
              </TableCell> */}

              {status != "On Bidding" ? (
                <TableCell align='center' colSpan={4} sx={headerCellStyle}>
                  Vendor's Responce
                </TableCell>
              ) : (
                ""
              )}

              {status == "Closed" ? (
                <TableCell
                  rowSpan={2}
                  sx={{ ...headerCellStyle, lineHeight: "20px" }}
                >
                  Line Status
                </TableCell>
              ) : (
                ""
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
                status != "On Bidding" && "Unit Price",
                status != "On Bidding" && "Net Amount",
                status != "On Bidding" && "Confirmed Delivery Date",
                status != "On Bidding" && "Remarks",
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
            {row.hiq_requirement &&
              row.hiq_requirement.map((item, idx) => (
                <TableRow key={idx} sx={bodyCellStyle}>
                  <TableCell sx={bodyCellStyle}>{item.line_no}</TableCell>
                  <TableCell sx={bodyCellStyle}>{item.material_code}</TableCell>
                  <TableCell sx={bodyCellStyle}>
                    {item.material_description}
                  </TableCell>

                  <TableCell sx={bodyCellStyle} align='right'>
                    {item.quantity}
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    {item.uom == "" ? "-" : item.uom}
                  </TableCell>
                  <TableCell sx={bodyCellStyle} align='right'>
                    {item.target_price}
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    {item.line_delivery_date}
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    {item.comments ? (
                      item.comments.length > 10 ? (
                        <Tooltip
                          title={String(item.comments)
                            .split(/\\n|\//) // split by \n or /
                            .filter(Boolean) // remove empty values
                            .map((line, i) => (
                              <Grid
                                key={i}
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "0.8rem",
                                  mt: "2px",
                                }}
                              >
                                {line}
                              </Grid>
                            ))}
                          placement='top'
                          arrow
                          slotProps={{
                            tooltip: {
                              sx: {
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "12px",
                                padding: 2,
                                maxHeight: "250px", // total tooltip height
                                overflowY: "auto", // scroll if content exceeds
                              },
                            },
                          }}
                        >
                          <span>{`${item.comments.slice(0, 10)}...`}</span>
                        </Tooltip>
                      ) : (
                        item.comments
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>

                  {status != "On Bidding" && (
                    <>
                      <TableCell sx={bodyCellStyle} align='right'>
                        {item.unit_price}
                      </TableCell>
                      <TableCell sx={bodyCellStyle} align='right'>
                        {item.net_amount}
                      </TableCell>
                      <TableCell sx={bodyCellStyle}>
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

                      <TableCell sx={bodyCellStyle}>
                        {item.vendor_remarks ? (
                          item.vendor_remarks.length > 10 ? (
                            <Tooltip
                              title={String(item.vendor_remarks)
                                .split(/\\n|\//) // split by \n or /
                                .filter(Boolean) // remove empty values
                                .map((line, i) => (
                                  <Grid
                                    key={i}
                                    sx={{
                                      fontFamily: "Poppins, sans-serif",
                                      fontSize: "0.8rem",
                                      mt: "2px",
                                    }}
                                  >
                                    {line}
                                  </Grid>
                                ))}
                              placement='top'
                              arrow
                              slotProps={{
                                tooltip: {
                                  sx: {
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "12px",
                                    padding: 2,
                                    maxHeight: "250px", // total tooltip height
                                    overflowY: "auto", // scroll if content exceeds
                                  },
                                },
                              }}
                            >
                              <span>{`${item.vendor_remarks.slice(0, 10)}...`}</span>
                            </Tooltip>
                          ) : (
                            item.vendor_remarks
                          )
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </>
                  )}

                  {status == "Closed" && (
                    <TableCell sx={bodyCellStyle} align='right'>
                      <Chip
                        label={item.status}
                        size='small'
                        sx={{
                          height: "25px",
                          width: 120,
                          backgroundColor: DECISION_COLOR[item.status]?.bg,
                          color: DECISION_COLOR[item.status]?.text,
                          fontWeight: 500,
                          fontFamily: "Poppins, sans-serif",
                          borderRadius: "12px",
                        }}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RFQDetails() {
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [vendorDetailsData, setVendorDetailsData] = useState(null);

  const location = useLocation();

  const tabName = location.state?.tabName;

  const case_id = location.state?.case_id;

  const status = location.state?.status;

  const toggleRow = (rfq_id) =>
    setExpandedRow((prev) => (prev === rfq_id ? null : rfq_id));

  const navigate = useNavigate();

  const RFDetails = async () => {
    setLoading(true);

    const payload = {
      rfq_case_id: case_id,
      status: status,
    };

    try {
      const res = await axios.post(
        tabName == "All"
          ? "http://10.10.0.115:8095/rfq/case"
          : tabName == "On Bidding"
            ? "http://10.10.0.115:8095/RFQ/rfq/Vendoronbid"
            : tabName == "Under Review"
              ? "http://10.10.0.115:8095/RFQ/rfq/vendorunderreview"
              : tabName == "Closed"
                ? "http://10.10.0.115:8095/RFQ/rfq/vendorexpired"
                : tabName == "Expired"
                  ? "http://10.10.0.115:8095/RFQ/rfq/vendorexpired"
                  : "",
        payload,
      );

      console.log(res.data);

      setDetailsData(res.data.data);
      setVendorDetailsData(res.data.data.vendors);
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

  const filtered = vendorDetailsData?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  useEffect(() => {
    RFDetails();
  }, []);

  const countdown = useCountdown(detailsData?.case?.expiry_date);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <div>
            <Grid sx={{ position: "absolute", top: 80, cursor: "pointer" }}>
              <ArrowBackIcon
                onClick={() => {
                  navigate("/RFQs");
                }}
              />
            </Grid>

            <Grid sx={{ px: 4 }}>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1.5px solid #e8e8e8",
                  p: 2,
                }}
              >
                {/* ── Header Card ── */}
                <Card
                  elevation={0}
                  sx={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",

                    mb: 2.5,
                    background:
                      "linear-gradient(to bottom, #c8ddf0 0%, #ddeaf8 60%, #eef4fc 100%)",
                    border: "1px solid #dbe4f0",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='flex-start'
                      flexWrap='wrap'
                      gap={2}
                    >
                      <Box flex={1}>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
                          gap={2}
                          mb={2}
                        >
                          <Typography
                            variant='h5'
                            fontWeight={500}
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              color: "#1a1a2e",
                            }}
                          >
                            Case Details - {detailsData?.case?.rfq_case_id}
                          </Typography>
                          <Box display='flex' alignItems='center' gap={1}>
                            <Typography
                              variant='body2'
                              fontWeight={500}
                              fontFamily='Poppins, sans-serif'
                            >
                              Status
                            </Typography>
                            <Chip
                              label={detailsData?.case?.status}
                              size='small'
                              sx={{
                                height: "25px",
                                width: 120,
                                backgroundColor:
                                  PURCH_STATUS_COLOR[
                                    detailsData?.case?.status == "Under Review"
                                      ? "Under_Review"
                                      : detailsData?.case?.status ==
                                          "On Bidding"
                                        ? "On_Bidding"
                                        : detailsData?.case?.status
                                  ]?.bg,
                                color:
                                  PURCH_STATUS_COLOR[
                                    detailsData?.case?.status === "Under Review"
                                      ? "Under_Review"
                                      : detailsData?.case?.status ==
                                          "On Bidding"
                                        ? "On_Bidding"
                                        : detailsData?.case?.status
                                  ]?.text,
                                fontWeight: 500,
                                fontFamily: "Poppins, sans-serif",
                                borderRadius: "12px",
                              }}
                            />
                          </Box>
                        </Box>
                        <Box display='flex' flexWrap='wrap' gap={4}>
                          {[
                            {
                              label: "Expected Delivery Date",
                              value: dayjs(
                                detailsData?.case?.delivery_date,
                                "DD/MM/YYYY",
                              ).format("DD/MM/YYYY"),
                            },
                            {
                              label: "Expiration Date & Time",
                              value: dayjs(
                                detailsData?.case?.expiry_date,
                                "DD/MM/YYYY",
                              ).format("DD/MM/YYYY"),
                            },
                            {
                              label: "Created Date & Time",
                              value: dayjs(
                                detailsData?.case?.created_date,
                                "DD/MM/YYYY",
                              ).format("DD/MM/YYYY"),
                            },
                          ].map((item) => (
                            <Box key={item.label}>
                              <Typography
                                variant='body2'
                                maxWidth={400}
                                fontWeight={500}
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  color: "#2d2d2d",
                                  fontSize: "12px",
                                }}
                              >
                                {item.label}{" "}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  color: "#2e2e2e",
                                  fontSize: "12px",
                                  mt: "2px",
                                }}
                              >
                                {item.value}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      {countdown == "-" || countdown == "Today" ? (
                        ""
                      ) : (
                        <Card
                          elevation={2}
                          sx={{
                            borderRadius: "12px",
                            px: 3,
                            py: 2,
                            minWidth: 180,
                            textAlign: "center",
                            backgroundColor: "rgba(255,255,255,0.20)",
                            border: "1px solid #fff",
                            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                          }}
                        >
                          <Typography
                            variant='body2'
                            fontWeight={500}
                            sx={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            Time remaining
                          </Typography>
                          <Typography
                            variant='h5'
                            fontWeight={550}
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              color: "#1a1a2e",
                              letterSpacing: 1,
                              mt: 0.5,
                            }}
                          >
                            {countdown}
                          </Typography>
                        </Card>
                      )}
                    </Box>
                  </CardContent>
                </Card>

                {/* ── Vendor RFQs Table Card ── */}
                <Card
                  elevation={0}
                  sx={{
                    // border: "1px solid #e8edf2",
                    backgroundColor: "#F2F6FC",
                    overflow: "hidden",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2, pb: 1 }}>
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
                        Vendor RFQs
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
                  </CardContent>

                  <TableContainer
                    stickyHeader
                    elevation={0}
                    sx={{ border: "1px solid #eef0f8", boxShadow: "none" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          {[
                            "RFQ No",
                            "Vendor Name",
                            "Vendor Account",
                            // "Location",
                            "Mode of Delivery",
                            "Delivery Term",
                            "Payment Term",
                            "Action",
                          ].map((col) => (
                            <TableCell
                              key={col}
                              sx={{ ...headerCellStyle }}
                              align={col == "Action" ? "center" : ""}
                            >
                              {col}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filtered && filtered?.length == 0 ? (
                          <TableRow>
                            <TableCell
                              sx={{ py: 1, fontFamily: "Poppins, sans-serif" }}
                              colSpan={9}
                              align='center'
                            >
                              No Data
                            </TableCell>
                          </TableRow>
                        ) : (
                          filtered?.map((row) => {
                            const isOpen = expandedRow === row.rfq_id;

                            return (
                              <>
                                {/* Main Row */}
                                <TableRow
                                  key={row.rfq_id}
                                  onClick={() => toggleRow(row.rfq_id)}
                                  sx={{
                                    cursor: "pointer",
                                    backgroundColor: isOpen
                                      ? "#fafbfd"
                                      : "#ffffff",
                                    borderBottom: "none",
                                    "&:hover": {
                                      backgroundColor: isOpen
                                        ? "#fafbfd"
                                        : "#ffffff",
                                    },
                                    // transition: "background-color 0.15s ease",
                                  }}
                                >
                                  {[
                                    row.rfq_id,
                                    row.vendor_name,
                                    row.vendor_account,
                                    // row.location || "—",
                                    row?.mode_of_delivery,
                                    row?.delivery_term,
                                    row?.payment_term,
                                  ].map((val, i) => (
                                    <TableCell key={i} sx={bodyCellStyle}>
                                      {val}
                                    </TableCell>
                                  ))}
                                  <TableCell
                                    sx={{
                                      // borderBottom: isOpen
                                      //   ? "none"
                                      //   : "1px solid #f0f2f5",
                                      py: 1,
                                    }}
                                  >
                                    <Box
                                      display='flex'
                                      alignItems='center'
                                      gap={0.3}
                                      sx={{
                                        color: "#3b6fe0",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        fontFamily: "Poppins, sans-serif",
                                        userSelect: "none",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {isOpen ? (
                                        <KeyboardArrowUpIcon fontSize='small' />
                                      ) : (
                                        <KeyboardArrowDownIcon fontSize='small' />
                                      )}
                                      {isOpen ? "Hide Details" : "View Details"}
                                    </Box>
                                  </TableCell>
                                </TableRow>

                                {/* Expanded Panel Row */}
                                <TableRow key={`${row.rfq_id}-detail`}>
                                  <TableCell
                                    colSpan={8}
                                    sx={{
                                      border: "none",
                                      p: 0,
                                      // borderBottom: isOpen
                                      //   ? "2px solid #dbe4f0"
                                      //   : "none",
                                    }}
                                  >
                                    <Collapse
                                      in={isOpen}
                                      timeout={300}
                                      unmountOnExit
                                      sx={{ border: "none" }}
                                    >
                                      <ExpandedDetail
                                        row={row}
                                        status={detailsData?.case?.status}
                                      />
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            </Grid>
          </div>
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
    bg: "#F2F0FF",
    text: "#725CFC",
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
    bg: "rgba(227, 247, 244, 0.15)",
    text: "#21BFA7",
  },
  Under_Review: {
    bg: "#C8CFF6",
    text: "#725CFC",
  },
  On_Bidding: {
    bg: "rgba(249, 151, 9, 0.15)",
    text: "#FF8800",
  },
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

const bodyCellStyle = {
  fontSize: "12px",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "8px",
  paddingBottom: "8px",
  whiteSpace: "normal",
  wordBreak: "break-word",
};

const DECISION_COLOR = {
  "Under Review": {
    bg: "#FEF2E0",
    text: "#F99709",
    border: "#C7D2FE",
  },
  Rejected: {
    bg: "#FFE0E5",
    text: "#E53A6B",
  },
  Accepted: {
    bg: "#E3F7F4",
    text: "#21BFA7",
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
};
