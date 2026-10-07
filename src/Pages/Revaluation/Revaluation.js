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
  cursor: "pointer",
  // px: "4px",
};

const textFieldStyle = {
  backgroundColor: "#Ffff",
  borderRadius: "2px",
  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
    height: "30px",
    fontFamily: "Poppins, sans-serif",
    border: "0.5px solid #AAAAAA",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
};

const LabelText = ({ children }) => (
  <Typography
    sx={{
      fontSize: "13.5px",
      fontWeight: 550,
      color: "#222",
      mb: 0.8,
      fontFamily: "Poppins, sans-serif",
    }}
  >
    {children}
  </Typography>
);

const statusColors = {
  INVITED: {
    bg: "#E8EDFF",
    color: "#6788FF",
  },
  DRAFT: {
    bg: "#F5F5F5",
    color: "#616161",
  },
  IN_REVIEW: {
    bg: "#FEF0DA",
    color: "#F99709",
  },
  "Not Started": {
    bg: "#EAE7FF",
    color: "#725CFC",
  },
  //   RETURNED: {
  //     bg: "#EEF0F0",
  //     color: "#8E9696",
  //   },
  RETURNED: {
    bg: "#E8EDFF",
    color: "#6788FF",
  },
  COMPLETED: {
    bg: "#DEF6F2",
    color: "#21BFA7",
  },
  REJECTED: {
    bg: "#FBE3EA",
    color: "#E34472",
  },
  VENDOR_CREATED: {
    bg: "#E0F7FA",
    color: "#00838F",
  },
};

const statusLabels = {
  IN_REVIEW: "In Review",
  IN_APPROVAL: "In Approval",
  RETURNED: "Returned",
  RESUBMITTED: "Resubmitted",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
  "Not Started": "Not Started",
};

export default function Revaluation() {
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Vendors");
  const [anchorEl, setAnchorEl] = useState(null);
  const [kpi, setKpi] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modalTittle, setModalTittle] = useState("");
  const [modalDesc, setModalDesc] = useState(null);
  const [kpiCounts, setKpiCounts] = useState(null);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [mobileNumber, setMobileNumber] = useState("");
  const [expirationSub, setExpirationSub] = useState("");

  //------------------------------------------------
  // const [selectedTab, setSelectedTab] = useState("All Prospects");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [supplierGroup, setSupplierGroup] = useState([
    "Chemical",
    "CCL",
    "Prepreg",
  ]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [message, setMessage] = useState(null);
  const [companyError, setCompanyError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [supplierError, setSupplierError] = useState("");
  const [vendorList, setVendorList] = useState({});
  // const [vendorOptions, setVendorOption] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(
    sessionStorage.getItem("vendor_status") == null
      ? "All"
      : sessionStorage.getItem("vendor_status"),
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const sendInvitation = async () => {
    let isValid = true;

    // Clear previous errors
    setCompanyError("");
    setEmailError("");
    setSupplierError("");

    if (!(company ?? "").trim()) {
      setCompanyError("Company Name is required");
      isValid = false;
    }
    // Supplier Validation
    if (!selectedSupplier) {
      setSupplierError("Supplier Group is required");
      isValid = false;
    }

    if (!(email ?? "").trim()) {
      setEmailError("Email Address is required");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email address");
        isValid = false;
      }
    }
    if (!isValid) return;

    const payload = {
      CompanyName: company,
      SupplierCategory: selectedSupplier,
      Email: email,
      VendGroup: "",
    };
    setLoading(true);
    await axios
      .post(
        "http://10.50.20.89:9091/Createprospect/createprospect/send_invitation",
        payload,
      )
      .then((res) => {
        setLoading(false);

        if (res.data.status === true) {
          setMessage(res.data);
          setModal2(true);

          setCompany("");
          setSelectedSupplier("");
          setEmail("");

          // setSnackbar({
          //   open: true,
          //   message: res.data.message || "Invitation sent successfully.",
          //   severity: "success",
          // });
        } else {
          setSnackbar({
            open: true,
            message: res.data.message || "Failed to send invitation.",
            severity: "error",
          });
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || err.message || "Login failed";

        navigate("/ErrorHandling");
        sessionStorage.setItem("errormessge", errorMessage);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response?.data?.message || err.message;
        navigate("/ErrorHandling");
        sessionStorage.setItem("errormessge", errorMessage);
        setLoading(false);
      });
  };

  const fetchVendorlist = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        "http://10.10.0.115:8080/vendor-reevaluation/home",
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
      count: kpiCounts?.new,
    },

    {
      label: "In Review",
      img: Approvalsicon,
      activeimg: ApprovalsBlueicon,
      count: kpiCounts?.in_progress,
    },
    {
      label: "Returned",
      img: Returnedicon,
      activeimg: ReturnedBlueicon,
      count: kpiCounts?.in_progress,
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
  }, []);

  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) => {
        const searchMatch = Object.values(row ?? {}).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(search.toLowerCase().trim()),
        );

        const statusMatch = status === "All" || row?.status === status;

        return searchMatch && statusMatch;
      })
    : [];
  //   console.log(status);

  useEffect(() => {
    sessionStorage.setItem("selectnav1", "Revaluation");
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Revaluationtop vendordetails={vendorList?.summary} />

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
                  direction="column"
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
                                sessionStorage.setItem(
                                  "vendorToggle",
                                  tab.label,
                                );

                                setPage(0);
                                // setStatus("All");
                                setSearch("");
                                // setStatus2("All");

                                if (tab.label == "Materials") {
                                  sessionStorage.setItem(
                                    "vendor_status",
                                    "All",
                                  );
                                  setStatus("All");
                                } else {
                                  sessionStorage.setItem(
                                    "vendor_status",
                                    "All",
                                  );
                                  setStatus("All");
                                }
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
                                  component="img"
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
                      {/* Active Filter Chip */}
                      {status !== "All" && (
                        <Chip
                          label={status}
                          onDelete={() => {
                            setStatus("All");
                            sessionStorage.setItem("prospect_status", "All");
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

                      {/* Filter Button */}
                      <Button
                        variant="outlined"
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
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ gap: 1 }}
                        >
                          <img
                            src={search_icon}
                            alt="filter"
                            style={{
                              width: 15,
                              height: 15,
                              objectFit: "contain",
                            }}
                          />

                          <img
                            src={dropdown}
                            alt="dropdown"
                            style={{
                              height: 5,
                              objectFit: "contain",
                            }}
                          />
                        </Grid>
                      </Button>
                      <Button
                        variant="outlined"
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
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ gap: 1 }}
                        >
                          <img
                            src={Settingicon}
                            alt="filter"
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
                        variant="contained"
                        // startIcon={<AddIcon />}
                        sx={{
                          ...buttonStyle,
                          backgroundColor: "#1a6fd4",
                          color: "#fff",
                          width: 170,
                        }}
                        onClick={() => {
                          setModal(true);
                          setEmail(null);
                          setSelectedVendor(null);
                          setSelectedAccount(null);
                        }}
                      >
                        Request Revaluation
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid sx={{ mt: 1 }}>
                  {/* Table */}

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
                                paddingRight:
                                  header === "Vendors Mapped" ? 10 : "",
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
                              align="center"
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
                              const chipStyle = statusColors[row.status] || {
                                bg: "#ECEFF1",
                                color: "#455A64",
                              };

                              return (
                                <TableRow
                                  key={`${row.vendoraccount}-${row.prospectid}-${index}`}
                                  hover
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                      backgroundColor: "#F8FAFC",
                                    },
                                  }}
                                  onClick={() => {
                                    navigate("/ParentReevaluation");
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
                                    {row.risklevel || "-"}
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
                                  <TableCell align="center" sx={bodyCellStyle}>
                                    <Chip
                                      label={
                                        statusLabels[row.status] ||
                                        row.status ||
                                        "-"
                                      }
                                      size="small"
                                      sx={{
                                        backgroundColor: chipStyle.bg,
                                        color: chipStyle.color,
                                        fontWeight: 500,
                                        minWidth: "100px",
                                        fontFamily: "Poppins, sans-serif",
                                      }}
                                    />
                                  </TableCell>

                                  {/* Document Status */}
                                  <TableCell sx={bodyCellStyle}>
                                    {row.documentstatus || "-"}
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
                      {/* <Stack
                        direction="row"
                        justifyContent="center"
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
                      </Stack> */}
                      <TablePagination
                        component="div"
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
            <Box p={2} width={240}>
              {/* Search */}
              <TextField
                fullWidth
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                sx={textFieldStyle}
              />

              {/* Status */}
              {activeTab !== "All Prospects" ? (
                ""
              ) : (
                <Grid sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Poppins, sans-serif",
                      mb: 0.5,
                    }}
                  >
                    Select Status
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      sessionStorage.setItem("prospect_status", e.target.value);
                      setPage(0);
                    }}
                    sx={textFieldStyle}
                  >
                    <MenuItem
                      value="All"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      value="INVITED"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Invited
                    </MenuItem>
                    <MenuItem
                      value="DRAFT"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Draft
                    </MenuItem>
                    <MenuItem
                      value="TO_EVALUATE"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      To Evaluate
                    </MenuItem>
                    <MenuItem
                      value="IN_APPROVAL"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      In Approval
                    </MenuItem>
                    <MenuItem
                      value="RETURNED"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Returned
                    </MenuItem>
                    <MenuItem
                      value="RESUBMITTED"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Resubmitted
                    </MenuItem>
                    <MenuItem
                      value="VENDOR_CREATED"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Vendor Created
                    </MenuItem>
                    <MenuItem
                      value="REJECTED"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Rejected
                    </MenuItem>
                    <MenuItem
                      value="VENDOR_CREATED"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Vendor Created
                    </MenuItem>
                  </TextField>
                </Grid>
              )}
            </Box>
          </Popover>
          {/*MODEL*/}
          <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <RequestRevaluation
              onClose={() => {
                setModal(false);
              }}
            />
          </Modal>

          {modal2 && (
            <Modal
              open={modal2}
              onClose={() => {
                setModal2(false);
              }}
              aria-labelledby="vendor-revaluation-title"
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
