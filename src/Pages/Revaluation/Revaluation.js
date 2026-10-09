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
  Autocomplete,
  Select,
  MenuItem,
  Tooltip,
  Snackbar,
  Alert,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Chip } from "@mui/material";
import Navbar from "../../Navbars/Navbar";
import AddIcon from "@mui/icons-material/Add";
import vendors_active from "../../Images/Vendors/vendors_active.png";
import vendors_nactive from "../../Images/Vendors/vendors_nactive.png";
import material_active from "../../Images/Vendors/material_active.png";
import material_nactive from "../../Images/Vendors/material_nactive.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading/Loading";
import search_icon from "../../Images/Search Iconaaaa.png";
import dropdown from "../../Images/Dropdown.png";
// import VendorTop from "./VendorTop";
// import ProspectsTop from "./ProspectsTop";
import CloseIcon from "@mui/icons-material/Close";
import { FormControlLabel, Switch } from "@mui/material";
import Approvalsicon from "../../Images/Prospects/Approvals Icon.png";
import Evaluateicon from "../../Images/Prospects/RiskAssesment.png";
import Returnedicon from "../../Images/Prospects/Returned.png";
import { IconButton } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Rejectedicon from "../../Images/Prospects/Rejected.png";
import ApprovalsBlueicon from "../../Images/Prospects/Approvals Blue.png";
import ApprovedBlueicon from "../../Images/Prospects/Approved Blue.png";
import RejectedBlueicon from "../../Images/Prospects/Rejected Blue.png";
import ReturnedBlueicon from "../../Images/Prospects/Returned Blue.png";
import ToevaluateBlueicon from "../../Images/Prospects/To Evaluate Blue.png";
import Approved from "../../Images/Prospects/Approved.png";
import dayjs from "dayjs";
import { buttonStyle } from "../../style";
import Revaluationtop from "./Revaluationtop";
import RevaluationSetting from "./RevaluationDetails/RevaluationSetting";
import RequestRevaluation from "./RevaluationDetails/RequestRevaluation";
import Settingicon from "../../Images/Revaluation/Revaluation Set up 1.png";

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
  paddingTop: "8px",
  paddingBottom: "8px",
  whiteSpace: "nowrap",

  // px: "4px",
};

const textFieldStyle = {
  backgroundColor: "#fff",
  borderRadius: "2px",

  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
    height: "34px",
    fontFamily: "Poppins, sans-serif",
    border: "0.5px solid #AAAAAA",

    "& fieldset": {
      border: "none",
    },

    "&:hover fieldset": {
      border: "none",
    },

    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
};

const selectFieldStyle = {
  ...textFieldStyle,

  "& .MuiSelect-select": {
    fontSize: "12px",
    fontFamily: "Poppins, sans-serif",
    padding: "6px 10px",
    borderRadius: "10px",
  },
};

const filterLabelStyle = {
  fontSize: "12px",
  fontFamily: "Poppins, sans-serif",
  mb: 0.5,
};

// const statusColors = {
//   INVITED: {
//     bg: "#E8EDFF",
//     color: "#6788FF",
//   },
//   DRAFT: {
//     bg: "#F5F5F5",
//     color: "#616161",
//   },
//   IN_REVIEW: {
//     bg: "#FEF0DA",
//     color: "#F99709",
//   },
//   "Not Started": {
//     bg: "#EAE7FF",
//     color: "#725CFC",
//   },
//   //   RETURNED: {
//   //     bg: "#EEF0F0",
//   //     color: "#8E9696",
//   //   },
//   RETURNED: {
//     bg: "#E8EDFF",
//     color: "#6788FF",
//   },
//   COMPLETED: {
//     bg: "#DEF6F2",
//     color: "#21BFA7",
//   },
//   REJECTED: {
//     bg: "#FBE3EA",
//     color: "#E34472",
//   },
//   VENDOR_CREATED: {
//     bg: "#E0F7FA",
//     color: "#00838F",
//   },
// };

// const statusLabels = {
//   "In Review": "In Review",
//   "In Approval": "In Approval",
//   Returned: "Returned",
//   Resubmitted: "Resubmitted",
//   Completed: "Completed",
//   Rejected: "Rejected",
//   "Not Started": "Not Started",
// };

const statusColors = {
  "Not Started": {
    bg: "#EAE7FF",
    color: "#725CFC",
  },
  "Awaiting Response": {
    bg: "#FEF0DA",
    color: "#F99709",
  },
  "Validation In Progress": {
    bg: "#E8EDFF",
    color: "#6788FF",
  },
  Returned: {
    bg: "#E8EDFF",
    color: "#6788FF",
  },
  Completed: {
    bg: "#DEF6F2",
    color: "#21BFA7",
  },
  Cancelled: {
    bg: "#FBE3EA",
    color: "#E34472",
  },
};

const statusLabels = {
  "Not Started": "Not Started",
  "Awaiting Response": "Awaiting Response",
  "Validation In Progress": "Validation In Progress",
  Returned: "Returned",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

const riskColors = {
  Critical: {
    bg: "#FBE3EA",
    color: "#D32F5B",
  },
  High: {
    bg: "#FDE7E7",
    color: "#E53935",
  },
  Elevated: {
    bg: "#FEF0DA",
    color: "#F99709",
  },
  Medium: {
    bg: "#FFF8E1",
    color: "#C79A00",
  },
  Low: {
    bg: "#DEF6F2",
    color: "#21BFA7",
  },
};

const riskLabels = {
  Critical: "Critical",
  High: "High",
  Elevated: "Elevated",
  Medium: "Medium",
  Low: "Low",
};

const documentStatusColors = {
  Valid: {
    bg: "#DEF6F2",
    color: "#21BFA7",
  },
  "Expiring Soon": {
    bg: "#FEF0DA",
    color: "#F99709",
  },
  Expired: {
    bg: "#FBE3EA",
    color: "#E34472",
  },
  "No Documents": {
    bg: "#F5F5F5",
    color: "#616161",
  },
  "-": {
    bg: "#F5F5F5",
    color: "#616161",
  },
};

const documentStatusLabels = {
  Valid: "Valid",
  "Expiring Soon": "Expiring Soon",
  Expired: "Expired",
  "No Documents": "No Documents",
  "-": "-",
};

const chipStyle = {
  height: "22px",
  fontSize: "11px",
  minWidth: "75px",
  fontWeight: 500,
  fontFamily: "Poppins, sans-serif",
  "& .MuiChip-label": {
    px: "6px",
  },
};

export default function Revaluation() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Vendors");
  const [anchorEl, setAnchorEl] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [vendorList, setVendorList] = useState({});

  // Filter

  const [riskLevel, setRiskLevel] = useState([]);
  const [status, setStatus] = useState([]);
  const [documentStatus, setDocumentStatus] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    riskLevel: [],
    status: [],
    documentStatus: [],
  });

  const fetchVendorlist = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        "http://10.10.0.115:8095/vendor-reevaluation/home",
      );

      console.log(res.data.all_vendors);
      setVendorList(res.data.data);
    } catch (err) {
      console.log(err);

      const errorMessage = err.response?.data?.message || err.message;
      sessionStorage.setItem("errormessge", errorMessage);
      navigate("/ErrorHandling");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      label: "All Vendors",
      img: vendors_nactive,
      activeimg: vendors_active,
      // count: kpiCounts?.new,
    },

    {
      label: "In Review",
      img: Approvalsicon,
      activeimg: ApprovalsBlueicon,
      // count: kpiCounts?.in_progress,
    },
    {
      label: "Returned",
      img: Returnedicon,
      activeimg: ReturnedBlueicon,
      // count: kpiCounts?.in_progress,
    },
  ];

  const rows =
    activeTab === "All Vendors"
      ? vendorList?.all_vendors
      : activeTab === "In Review"
        ? vendorList?.in_review_vendors
        : activeTab === "Returned"
          ? vendorList?.returned_vendors
          : [];

  console.log(rows);

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchVendorlist();
  }, [modal]);

  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) => {
        const { search, riskLevel, status, documentStatus } = appliedFilters;

        /* Search */

        const searchMatch =
          !search ||
          Object.values(row ?? {}).some((value) =>
            String(value ?? "")
              .toLowerCase()
              .includes(search.toLowerCase()),
          );

        /* Risk Level */

        const riskMatch =
          riskLevel.length === 0 ||
          riskLevel.includes(String(row?.riskLevel ?? ""));

        /* Status */

        const statusMatch =
          status.length === 0 || status.includes(String(row?.status ?? ""));

        /* Document Status */

        const documentStatusMatch =
          documentStatus.length === 0 ||
          documentStatus.includes(String(row?.documentstatus ?? ""));

        return searchMatch && riskMatch && statusMatch && documentStatusMatch;
      })
    : [];

  useEffect(() => {
    sessionStorage.setItem("selectnav1", "Revaluation");
  }, []);

  console.log(documentStatus);
  console.log(appliedFilters);

  const clickdocumentissue = () => {
    setAppliedFilters({
      search: "",
      riskLevel: [],
      status: [],
      documentStatus: ["Expired", "Expiring Soon"],
    });

    setDocumentStatus(["Expired", "Expiring Soon"]);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Revaluationtop
            vendordetails={vendorList?.summary}
            clickdocumentissue={clickdocumentissue}
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ lg: 12, xs: 12, md: 12, sm: 12 }}>
              <Grid
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                }}
              >
                <Grid
                  container
                  direction='column'
                  sx={{
                    py: 2.5,
                    px: 2,
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: "18px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Vendors Queue
                    </Typography>
                    {/* Tabs */}
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
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

                                setPage(0);
                                setSearch("");
                              }}
                              sx={{
                                minWidth: { xs: "100%", sm: "130px" },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                px: 2,
                                py: 0.9,
                                cursor: "pointer",
                                background: isActive
                                  ? "#DBE5F5"
                                  : "transparent",
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
                                    background: isActive
                                      ? "#0C52BC"
                                      : "#E0E0E0",
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {/* Filter Button */}
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
                          <img
                            src={search_icon}
                            alt='filter'
                            style={{
                              width: 15,
                              height: 15,
                              objectFit: "contain",
                            }}
                          />

                          <img
                            src={dropdown}
                            alt='dropdown'
                            style={{
                              height: 5,
                              objectFit: "contain",
                            }}
                          />
                        </Grid>
                      </Button>
                      <Button
                        variant='outlined'
                        onClick={() => {
                          setModal2(true);
                        }}
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
                          <img
                            src={Settingicon}
                            alt='filter'
                            style={{
                              width: 15,
                              height: 15,
                              objectFit: "contain",
                            }}
                          />
                        </Grid>
                      </Button>

                      {/* New Prospect */}
                      <Button
                        variant='contained'
                        // startIcon={<AddIcon />}
                        sx={{
                          ...buttonStyle,
                          backgroundColor: "#1a6fd4",
                          color: "#fff",
                          width: 170,
                        }}
                        onClick={() => {
                          setModal(true);
                        }}
                      >
                        Request Revaluation
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid sx={{ mt: 1 }}>
                  {/* Table */}

                  {documentStatus == [] && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          flexWrap: "wrap",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {/* Filter Results Label */}
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#242424",
                            fontFamily: "Poppins, sans-serif",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Filter Results
                        </Typography>

                        {/* Selected Filter Chip */}

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            backgroundColor: "#E5EEFD",
                            borderRadius: "30px",
                            px: 2.5,
                            py: 0.8,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#0754CD",
                              fontFamily: "Poppins, sans-serif",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Document Status
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#0754CD",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            {documentStatus}
                          </Typography>

                          <IconButton
                            size='small'
                            onClick={() => {
                              setAppliedFilters({
                                ...appliedFilters,
                                documentStatus: [],
                              });
                              setDocumentStatus([]);
                            }}
                            aria-label='Remove document status filter'
                            sx={{
                              p: 0,
                              ml: 0.5,
                              color: "#0754CD",
                              "&:hover": {
                                backgroundColor: "transparent",
                                color: "#003A9B",
                              },
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>

                        {/* Clear All Button */}

                        <Button
                          onClick={() => {
                            setAppliedFilters({
                              ...appliedFilters,
                              documentStatus: [],
                            });
                            setDocumentStatus([]);
                          }}
                          sx={{
                            textTransform: "none",
                            color: "#0754CD",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Poppins, sans-serif",
                            textDecoration: "underline",
                            p: 0,
                            minWidth: "auto",
                            whiteSpace: "nowrap",
                            "&:hover": {
                              backgroundColor: "transparent",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Clear all
                        </Button>
                      </Box>
                      <br />
                    </>
                  )}

                  <TableContainer>
                    <Table
                      stickyHeader
                      sx={{ width: "100%", background: "#ffff" }}
                    >
                      {/* Header */}
                      <TableHead>
                        <TableRow>
                          {[
                            "Vendor Account No",
                            "Prospect ID",
                            "Vendor Name ",
                            "Risk Level",
                            "Last Revaluation",
                            "Next Revaluation",
                            "Status",
                            "Document Status",
                          ].map((header) => (
                            <TableCell
                              key={header}
                              sx={{
                                ...headerCellStyle,
                              }}
                              align={header === "Status" ? "center" : "left"}
                            >
                              {header}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      {/* Body */}
                      <TableBody>
                        {filteredRows.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={8}
                              align='center'
                              sx={{
                                py: 4,
                                fontFamily: "Poppins, sans-serif",
                                color: "#64748B",
                                fontSize: "14px",
                              }}
                            >
                              No Data Available
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredRows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                            )
                            .map((row, index) => {
                              return (
                                <TableRow
                                  key={`${row.vendoraccount}-${row.prospectid}-${index}`}
                                  hover
                                  sx={{
                                    cursor:
                                      row.status != "Not Started"
                                        ? "pointer"
                                        : "",
                                    "&:hover": {
                                      backgroundColor: "#F8FAFC",
                                    },
                                  }}
                                  onClick={() => {
                                    if (row.status != "Not Started") {
                                      navigate("/ParentReevaluation", {
                                        state: {
                                          riskLevel: row.risklevel,
                                          lastreevaluation:
                                            row.lastreevaluation,
                                          nextreevaluationdate:
                                            row.nextreevaluationdate,
                                          status: row.status,
                                          revaluation_id: row.reevaluationid,
                                          email: row.email,
                                        },
                                      });
                                      sessionStorage.setItem(
                                        "Prospect_id",
                                        row.prospectid,
                                      );
                                    }
                                  }}
                                >
                                  {/* Vendor Account No */}
                                  <TableCell sx={bodyCellStyle}>
                                    {row.vendoraccount || "-"}
                                  </TableCell>

                                  {/* Prospect ID */}
                                  <TableCell sx={bodyCellStyle}>
                                    {row.prospectid || "-"}
                                  </TableCell>

                                  {/* Vendor Name */}
                                  <TableCell sx={bodyCellStyle}>
                                    {row.vendorname || "-"}
                                  </TableCell>

                                  {/* Risk Level */}
                                  <TableCell sx={bodyCellStyle}>
                                    {/* {row.risklevel || "-"} */}
                                    {row.risklevel == null ? (
                                      "-"
                                    ) : (
                                      <Chip
                                        label={
                                          riskLabels[row.risklevel] ||
                                          row.risklevel ||
                                          "-"
                                        }
                                        size='small'
                                        sx={{
                                          backgroundColor:
                                            riskColors[row.risklevel]?.bg,
                                          color:
                                            riskColors[row.risklevel]?.color,
                                          ...chipStyle,
                                        }}
                                      />
                                    )}
                                  </TableCell>

                                  {/* Last Revaluation */}
                                  <TableCell sx={bodyCellStyle}>
                                    {row.lastreevaluation
                                      ? dayjs(row.lastreevaluation).format(
                                          "DD-MMM-YYYY",
                                        )
                                      : "-"}
                                  </TableCell>

                                  {/* Next Revaluation */}
                                  <TableCell sx={bodyCellStyle}>
                                    {row.nextreevaluationdate
                                      ? dayjs(row.nextreevaluationdate).format(
                                          "DD-MMM-YYYY",
                                        )
                                      : "-"}
                                  </TableCell>

                                  {/* Status */}
                                  <TableCell align='center' sx={bodyCellStyle}>
                                    {row.status == null ? (
                                      "-"
                                    ) : (
                                      <Chip
                                        label={
                                          statusLabels[row.status] ||
                                          row.status ||
                                          "-"
                                        }
                                        size='small'
                                        sx={{
                                          backgroundColor:
                                            statusColors[row.status]?.bg,
                                          color:
                                            statusColors[row.status]?.color,
                                          ...chipStyle,
                                        }}
                                      />
                                    )}
                                  </TableCell>

                                  {/* Document Status */}
                                  <TableCell sx={bodyCellStyle} align='center'>
                                    {row.documentstatus == null ||
                                    row.documentstatus == "-" ? (
                                      "-"
                                    ) : (
                                      <Chip
                                        label={
                                          documentStatusLabels[
                                            row.documentstatus
                                          ] ||
                                          row.documentstatus ||
                                          "-"
                                        }
                                        size='small'
                                        sx={{
                                          backgroundColor:
                                            documentStatusColors[
                                              row.documentstatus
                                            ]?.bg,
                                          color:
                                            documentStatusColors[
                                              row.documentstatus
                                            ]?.color,
                                          ...chipStyle,
                                        }}
                                      />
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                        )}
                      </TableBody>
                    </Table>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        py: 1,
                        px: 2,
                      }}
                    >
                      <TablePagination
                        component='div'
                        count={filteredRows.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 20]}
                      />
                    </Grid>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                mt: 0.5,
                borderRadius: "4px",
              },
            }}
          >
            <Box
              p={1.5}
              width={275}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.25,
              }}
            >
              {/* Search */}
              <TextField
                fullWidth
                size='small'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={textFieldStyle}
              />

              {/* Risk Level */}
              <Box>
                <Typography sx={filterLabelStyle}>Risk Level</Typography>

                <FormControl fullWidth size='small'>
                  <Select
                    multiple
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(e.target.value)}
                    renderValue={(selected) =>
                      selected.length === 0 ? "All" : selected.join(", ")
                    }
                    sx={selectFieldStyle}
                  >
                    {Object.entries(riskLabels).map(([value, label]) => (
                      <MenuItem
                        key={value}
                        value={value}
                        sx={{
                          minHeight: "30px",
                          py: 0,
                          fontSize: "12px",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        <Checkbox
                          checked={riskLevel.includes(value)}
                          size='small'
                          sx={{ p: 0.5 }}
                        />

                        <ListItemText
                          primary={label}
                          primaryTypographyProps={{
                            fontSize: "12px",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Status */}
              <Box>
                <Typography sx={filterLabelStyle}>Status</Typography>

                <FormControl fullWidth size='small'>
                  <Select
                    multiple
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    renderValue={(selected) =>
                      selected.length === 0 ? "All" : selected.join(", ")
                    }
                    sx={selectFieldStyle}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <MenuItem
                        key={value}
                        value={value}
                        sx={{
                          minHeight: "30px",
                          py: 0,
                          fontSize: "12px",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        <Checkbox
                          checked={status.includes(value)}
                          size='small'
                          sx={{ p: 0.5 }}
                        />

                        <ListItemText
                          primary={label}
                          primaryTypographyProps={{
                            fontSize: "12px",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Document Status */}
              <Box>
                <Typography sx={filterLabelStyle}>Document Status</Typography>

                <FormControl fullWidth size='small'>
                  <Select
                    multiple
                    value={documentStatus}
                    onChange={(e) => setDocumentStatus(e.target.value)}
                    renderValue={(selected) =>
                      selected.length === 0 ? "All" : selected.join(", ")
                    }
                    sx={selectFieldStyle}
                  >
                    {Object.entries(documentStatusLabels).map(
                      ([value, label]) => (
                        <MenuItem
                          key={value}
                          value={value}
                          sx={{
                            minHeight: "30px",
                            py: 0,
                            fontSize: "12px",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          <Checkbox
                            checked={documentStatus.includes(value)}
                            size='small'
                            sx={{ p: 0.5 }}
                          />

                          <ListItemText
                            primary={label}
                            primaryTypographyProps={{
                              fontSize: "12px",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          />
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </Box>

              {/* Apply */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 0.25,
                }}
              >
                {/* Cancel */}
                <Button
                  variant='outlined'
                  onClick={() => {
                    setSearch("");
                    setRiskLevel([]);
                    setStatus([]);
                    setDocumentStatus([]);

                    setAppliedFilters({
                      search: "",
                      riskLevel: [],
                      status: [],
                      documentStatus: [],
                    });

                    setPage(0);
                    handleClose();
                  }}
                  sx={{
                    minHeight: "30px",
                    px: 2,
                    py: 0.5,
                    fontSize: "12px",
                    fontFamily: "Poppins, sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "2px",
                  }}
                >
                  Cancel
                </Button>

                {/* Apply */}
                <Button
                  variant='contained'
                  onClick={() => {
                    setAppliedFilters({
                      search,
                      riskLevel,
                      status,
                      documentStatus,
                    });

                    setPage(0);
                    handleClose();
                  }}
                  sx={{
                    minHeight: "30px",
                    px: 2,
                    py: 0.5,
                    fontSize: "12px",
                    fontFamily: "Poppins, sans-serif",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "2px",
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Popover>

          {/*MODEL*/}
          <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <RequestRevaluation
              onClose={() => {
                setModal(false);
              }}
              data={filteredRows}
            />
          </Modal>

          {modal2 && (
            <Modal
              open={modal2}
              onClose={() => {
                setModal2(false);
              }}
              aria-labelledby='vendor-revaluation-title'
            >
              <RevaluationSetting
                onClose={() => {
                  setModal2(false);
                }}
              />
            </Modal>
          )}
        </Navbar>
      )}
    </div>
  );
}
