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

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import CloseIcon from "@mui/icons-material/Close";
import { FormControlLabel, Switch } from "@mui/material";

import { IconButton } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import dayjs from "dayjs";
import Loading from "../../Loading/Loading";
import Navbar from "../../Navbars/Navbar";
import { buttonStyle } from "../../style";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["User Creation", "Access Assigning"];

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

const style = {
  position: "absolute",
  borderRadius: "15px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  border: "none", // remove border
  outline: "none", // remove focus outline
};

const style2 = {
  position: "absolute",
  borderRadius: "15px",
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

// const vendorOptions = [
//   { label: "Elbit Systems Limited", accountNo: "1112" },
//   { label: "Tata Consultancy Services", accountNo: "2234" },
//   { label: "Infosys Limited", accountNo: "3345" },
//   { label: "Wipro Technologies", accountNo: "4456" },
//   { label: "HCL Technologies", accountNo: "5567" },
// ];

const autocompleteSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fff",
    padding: "2px 8px !important",
    fontFamily: "Poppins, sans-serif",
    "& fieldset": {
      borderColor: "#d0d0d0",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#aaa",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1a6fd4",
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    color: "#222",
    padding: "9px 6px !important",
  },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontFamily: "Poppins, sans-serif",
    fontSize: "14px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#d0d0d0",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#aaa",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1a6fd4",
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputBase-input": {
    padding: "11px 14px",
    fontSize: "14px",
    color: "#222",
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
    bg: "#E3F2FD",
    color: "#1565C0",
  },
  DRAFT: {
    bg: "#F5F5F5",
    color: "#616161",
  },
  TO_EVALUATE: {
    bg: "#FFF3E0",
    color: "#F57C00",
  },
  IN_APPROVAL: {
    bg: "#E8F5E9",
    color: "#2E7D32",
  },
  RETURNED: {
    bg: "#FCE4EC",
    color: "#C2185B",
  },
  RESUBMITTED: {
    bg: "#EDE7F6",
    color: "#5E35B1",
  },
  APPROVED: {
    bg: "#E8F5E9",
    color: "#388E3C",
  },
  REJECTED: {
    bg: "#FFEBEE",
    color: "#D32F2F",
  },
  VENDOR_CREATED: {
    bg: "#E0F7FA",
    color: "#00838F",
  },
};

const statusLabels = {
  INVITED: "Invited",
  DRAFT: "Draft",
  TO_EVALUATE: "To Evaluate",
  IN_APPROVAL: "In Approval",
  RETURNED: "Returned",
  RESUBMITTED: "Resubmitted",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  VENDOR_CREATED: "Vendor Created",
};

export default function UserModule() {
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Prospects");
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
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    console.log("Next clicked");
    setActiveStep(1);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [mobileNumber, setMobileNumber] = useState("");
  const [expirationSub, setExpirationSub] = useState("");

  //------------------------------------------------
  // const [selectedTab, setSelectedTab] = useState("All Prospects");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [supplierGroup, setSupplierGroup] = useState([
    "IT Services",
    "Manufacturing",
    "Professional Services",
    "Logistics & Transportation",
    "Office Supplies",
  ]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [message, setMessage] = useState(null);
  const [companyError, setCompanyError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [supplierError, setSupplierError] = useState("");
  const [prospectlist, setProspectlist] = useState({});
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
        "http://10.10.0.115:8095/Createprospect/createprospect/send_invitation",
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

  const fetchProspectlist = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://10.10.0.115:8095/prospect/list");

      console.log(res.data);
      setProspectlist(res.data);
    } catch (err) {
      console.log(err);

      const errorMessage = err.response?.data?.message || err.message;
      sessionStorage.setItem("errormessge", errorMessage);
      navigate("/ErrorHandling");
    } finally {
      setLoading(false);
    }
  };

  // const tabs = [
  //   {
  //     label: "All Prospects",
  //     img: vendors_nactive,
  //     activeimg: vendors_active,
  //     count: kpiCounts?.new,
  //   },
  //   {
  //     label: "To Evaluate",
  //     img: Evaluateicon,
  //     activeimg: ToevaluateBlueicon,
  //     count: kpiCounts?.in_progress,
  //   },
  //   {
  //     label: "In Approvals",
  //     img: Approvalsicon,
  //     activeimg: ApprovalsBlueicon,
  //     count: kpiCounts?.in_progress,
  //   },
  //   {
  //     label: "Returned",
  //     img: Returnedicon,
  //     activeimg: ReturnedBlueicon,
  //     count: kpiCounts?.in_progress,
  //   },
  //   {
  //     label: "Vendor Created",
  //     img: Approved,
  //     activeimg: ApprovedBlueicon,
  //     count: kpiCounts?.in_progress,
  //   },
  //   {
  //     label: "Rejected",
  //     img: Rejectedicon,
  //     activeimg: RejectedBlueicon,
  //     count: kpiCounts?.in_progress,
  //   },
  // ];

  const rows =
    activeTab === "All Prospects"
      ? prospectlist?.all_prospects || []
      : activeTab === "To Evaluate"
        ? prospectlist?.TO_EVALUATE || []
        : activeTab === "In Approvals"
          ? prospectlist?.IN_APPROVAL || []
          : activeTab === "Returned"
            ? prospectlist?.RETURNED || []
            : activeTab === "Vendor Created"
              ? prospectlist?.VENDOR_CREATED || []
              : activeTab === "Rejected"
                ? prospectlist?.REJECTED || []
                : activeTab === "Resubmitted"
                  ? prospectlist?.RESUBMITTED
                  : "No data" || [];

  const handleVendorChange = (_, newValue) => {
    setSelectedVendor(newValue);
    setSelectedAccount(newValue ?? null);
    setEmail(newValue?.email || "");
    setMobileNumber(newValue?.phone || "");
  };

  // Selecting account no auto-fills vendor name
  const handleAccountChange = (_, newValue) => {
    setSelectedAccount(newValue);
    setSelectedVendor(newValue ?? null);
    setEmail(newValue?.email || "");
    setMobileNumber(newValue?.phone || "");
  };

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
    fetchProspectlist();
  }, []);

  // const filteredRows = tableData?.filter((row) => {
  //   const searchMatch = Object.values(row).some((value) =>
  //     String(value).toLowerCase().includes(search.toLowerCase()),
  //   );

  //   let statusMatch = true;
  //   let expiryMatch = true;

  //   if (activeTab === "Vendors") {
  //     // Vendors tab → status filter
  //     statusMatch = status === "All" || row.status === status;
  //   } else {
  //     // Materials tab → vendors_mapped filter
  //     if (status2 === "Inactive") {
  //       statusMatch = row.vendors_mapped == 0;
  //     } else if (status2 === "Active") {
  //       statusMatch = row.vendors_mapped != 0;
  //     }
  //   }

  //   // expiry_status filter
  //   if (status3 === true) {
  //     expiryMatch = row.expiry_status === true;
  //   } else if (status3 === false) {
  //     expiryMatch = row.expiry_status === false;
  //   }

  //   return searchMatch && statusMatch && expiryMatch;
  // });

  const filteredRows = rows.filter((row) => {
    const searchMatch = Object.values(row).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
    );

    const statusMatch = status === "All" || row.status === status;

    return searchMatch && statusMatch;
  });
  console.log(status);

  useEffect(() => {
    sessionStorage.setItem("selectnav1", "Prospects");
  }, []);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // const topFunction = (topname, input2, input3) => {
  //   if (topname == "Total Vendors") {
  //     setActiveTab("Vendors");
  //     setStatus("All");
  //     // setStatus3("All");
  //     sessionStorage.setItem("vendor_status", "All");
  //     sessionStorage.setItem("vendorToggle", "Vendors");
  //   } else if (topname == "Total Materials Mapped") {
  //     setActiveTab("Materials");

  //     setStatus("Vendor Mapped Material");

  //     sessionStorage.setItem("vendor_status", "Vendor Mapped Material");
  //     sessionStorage.setItem("vendorToggle", "Materials");
  //   } else if (topname == "Active Vendors") {
  //     setActiveTab("Vendors");
  //     setStatus("Active");

  //     sessionStorage.setItem("vendor_status", "Active");
  //     sessionStorage.setItem("vendorToggle", "Vendors");
  //   } else if (topname == "Inactive Vendors") {
  //     setActiveTab("Vendors");
  //     setStatus("Inactive");

  //     sessionStorage.setItem("vendor_status", "Inactive");
  //     sessionStorage.setItem("vendorToggle", "Vendors");
  //   } else if (topname == "Upcoming Expirations") {
  //     // setActiveTab("Vendors");
  //     setStatus("true");
  //     sessionStorage.setItem("vendor_status", "true");
  //     setExpirationSub(input2);
  //   }
  // };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
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
                      Access Management
                    </Typography>
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

                      {/* New Prospect */}
                      <Button
                        variant='contained'
                        startIcon={<AddIcon />}
                        sx={{
                          ...buttonStyle,
                          backgroundColor: "#1a6fd4",
                          color: "#fff",
                        }}
                        onClick={() => {
                          setModal(true);
                          setEmail(null);
                          setSelectedVendor(null);
                          setSelectedAccount(null);
                        }}
                      >
                        New User
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
                          {["User ID", "User Name ", "Email", "Role"].map(
                            (header) => (
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
                            ),
                          )}
                        </TableRow>
                      </TableHead>

                      {/* Body */}
                      <TableBody>
                        {filteredRows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((row) => {
                            const chipStyle = statusColors[row.status] || {
                              bg: "#ECEFF1",
                              color: "#455A64",
                            };

                            return (
                              <TableRow
                                key={`${row.prospectid}-${row.emailaddress}`}
                                onClick={() => {
                                  if (
                                    row.status !== "INVITED" &&
                                    row.status !== "RESUBMITTED"
                                  ) {
                                    navigate("/ProspectDetails");
                                  }
                                  sessionStorage.setItem(
                                    "Prospect_id",
                                    row.prospectid,
                                  );
                                  sessionStorage.setItem("To_Email", row.email);
                                }}
                              >
                                <TableCell sx={bodyCellStyle}>
                                  {row.prospectid}
                                </TableCell>

                                <TableCell sx={bodyCellStyle}>
                                  {row.companyname}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.email}
                                </TableCell>
                                {/* <TableCell sx={bodyCellStyle}>
                                  {row.state}
                                </TableCell>
                                <TableCell sx={bodyCellStyle}>
                                  {row.dateofsubmission != null
                                    ? dayjs(row.dateofsubmission).format(
                                        "DD-MMM-YYYY",
                                      )
                                    : ""}
                                </TableCell>*/}
                                <TableCell sx={bodyCellStyle}>
                                  {row.state}
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                size='small'
                placeholder='Search'
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
                    size='small'
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      sessionStorage.setItem("prospect_status", e.target.value);
                      setPage(0);
                    }}
                    sx={textFieldStyle}
                  >
                    <MenuItem
                      value='All'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      value='INVITED'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Invited
                    </MenuItem>
                    <MenuItem
                      value='DRAFT'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Draft
                    </MenuItem>
                    <MenuItem
                      value='TO_EVALUATE'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      To Evaluate
                    </MenuItem>
                    <MenuItem
                      value='IN_APPROVAL'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      In Approval
                    </MenuItem>
                    <MenuItem
                      value='RETURNED'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Returned
                    </MenuItem>
                    <MenuItem
                      value='RESUBMITTED'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Resubmitted
                    </MenuItem>
                    <MenuItem
                      value='VENDOR_CREATED'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Vendor Created
                    </MenuItem>
                    <MenuItem
                      value='REJECTED'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Rejected
                    </MenuItem>
                    <MenuItem
                      value='VENDOR_CREATED'
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
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box
              sx={{ ...style, p: 0, borderRadius: "16px", overflow: "hidden" }}
            >
              <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() =>
                  setSnackbar((prev) => ({
                    ...prev,
                    open: false,
                  }))
                }
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  severity={snackbar.severity}
                  onClose={() =>
                    setSnackbar((prev) => ({
                      ...prev,
                      open: false,
                    }))
                  }
                  variant='filled'
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
              {/* Header */}
              <Box
                sx={{
                  position: "relative",
                  px: 4,
                  pt: 4,
                  pb: 3,
                  backgroundColor: "#fff",
                  // borderBottom: "1px solid #EDEFF3",
                }}
              >
                <IconButton
                  onClick={() => {
                    setModal(false);
                    setCompany("");
                    setSelectedSupplier(null);
                    setEmail("");
                    setCompanyError("");
                    setSupplierError("");
                    setEmailError("");
                    handleBack();
                  }}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "#8a8a8a",
                    "&:hover": { backgroundColor: "#F3F6FC", color: "#1a1a1a" },
                  }}
                  size='small'
                >
                  <CloseIcon fontSize='small' />
                </IconButton>

                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                    letterSpacing: "-0.3px",
                    textAlign: "center",
                  }}
                >
                  Create a New User
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#8a8a8a",
                    mt: 0.5,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  Create a new user account and assign roles
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    py: 1,
                  }}
                >
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                      width: "fit-content",

                      "& .MuiStep-root": {
                        flex: "0 0 auto",
                        px: 1.5, // Increase/decrease for icon spacing
                      },

                      "& .MuiStepLabel-label": {
                        fontSize: "0.75rem",
                        mt: 0.5,
                      },

                      "& .MuiStepIcon-root": {
                        fontSize: 20,
                      },

                      "& .MuiStepConnector-line": {
                        minWidth: 22, // Shorter connector line
                        ml: 1.5,
                      },
                    }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>

              {/* Body */}
              <Box
                sx={{
                  backgroundColor: "#F8F9FB",
                  px: 4,
                  py: 3.5,
                  // border: "1px solid red",
                  mx: 4,
                  borderRadius: "10px",
                }}
              >
                {activeStep == 1 ? (
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: "12px",
                      border: "1px solid #EDEFF3",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        fontWeight: 500,
                        // color: "#5a5a5a",
                        letterSpacing: "0.4px",
                        // textTransform: "uppercase",
                        mb: 2.5,
                      }}
                    >
                      User Informations
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "12px",
                          }}
                        >
                          User ID
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                          }}
                        >
                          USR012
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "12px",
                          }}
                        >
                          User name
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                          }}
                        >
                          Arjun Tendulkar
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ) : (
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: "12px",
                      border: "1px solid #EDEFF3",
                    }}
                    elevation={0}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        fontWeight: 500,
                        // color: "#5a5a5a",
                        letterSpacing: "0.4px",
                        // textTransform: "uppercase",
                        mb: 2.5,
                      }}
                    >
                      User Informations
                    </Typography>
                    <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
                      <Grid size={{ lg: 6, xs: 12, md: 6, sm: 12 }}>
                        <LabelText> User Name</LabelText>
                        <TextField
                          fullWidth
                          placeholder='Enter User Name '
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          error={!!emailError}
                          helperText={emailError}
                          sx={{ ...textFieldStyle, fontWeight: 500 }}
                        />
                      </Grid>

                      <Grid size={{ lg: 6, xs: 12, md: 6, sm: 12 }}>
                        <LabelText>User ID </LabelText>
                        <TextField
                          fullWidth
                          placeholder='User ID'
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          error={!!emailError}
                          helperText={emailError}
                          sx={{ ...textFieldStyle, fontWeight: 500 }}
                        />
                      </Grid>
                    </Grid>

                    {/* Company Name - full width */}
                    <Box sx={{ mb: 2.5 }}>
                      <LabelText>Password </LabelText>
                      <TextField
                        fullWidth
                        placeholder='Password is required'
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (companyError) setCompanyError("");
                        }}
                        error={!!companyError}
                        helperText={companyError}
                        sx={{ ...textFieldStyle, fontWeight: 500 }}
                      />
                    </Box>
                  </Paper>
                )}
              </Box>

              {/* Footer actions */}
              <Box
                sx={{
                  px: 4,
                  py: 2.5,
                  display: "flex",
                  gap: 1.5,
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  // borderTop: "1px solid #EDEFF3",
                }}
              >
                <Button
                  variant='contained'
                  onClick={() => handleNext()}
                  sx={{
                    ...buttonStyle,
                    backgroundColor: "#f0344a",
                    color: "#fff",

                    "&:hover": {
                      backgroundColor: "#d62b3f",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "#c0253a",
                      boxShadow: "none",
                    },
                    "&:disabled": { backgroundColor: "#FF97A9", color: "#fff" },
                  }}
                >
                  {activeStep == 0 ? "Next" : "Create User"}
                </Button>
                <Button
                  onClick={() => {
                    setModal(false);
                    handleBack();
                  }}
                  sx={{
                    ...buttonStyle,
                    border: "1.5px solid #f0344a",
                    color: "#f0344a",

                    "&:hover": {
                      backgroundColor: "#F8F9FB",
                      border: "1.5px solid #D0D2D8",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>

          {modal2 ? (
            <Modal
              open={modal2}
              // onClose={() => {
              //   setModal2(false);
              //   setModal(false);
              // }}
              aria-labelledby='success-modal-title'
              aria-describedby='success-modal-description'
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 420,
                  bgcolor: "background.paper",
                  borderRadius: 3,
                  boxShadow: 24,
                  p: 4,
                  outline: "none",
                  textAlign: "center",
                }}
              >
                <CheckCircleRoundedIcon
                  sx={{
                    fontSize: 60,
                    color: "#2E7D32",
                    mb: 2,
                  }}
                />

                <Typography
                  id='success-modal-title'
                  variant='h6'
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    color: "#1F2937",
                  }}
                >
                  Prospect Created Successfully
                </Typography>

                {message?.Registration?.PROSPECT_ID && (
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#FF2E53",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Prospect ID: {message.Registration.PROSPECT_ID}
                  </Typography>
                )}

                <Typography
                  id='success-modal-description'
                  sx={{
                    mt: 2,
                    color: "#6B7280",
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {message?.message}
                </Typography>

                <Button
                  variant='contained'
                  onClick={() => {
                    setModal2(false);
                    setModal(false);
                    fetchProspectlist();
                  }}
                  sx={{
                    mt: 4,
                    minWidth: 140,
                    height: 42,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "#FF2E53",
                    boxShadow: "0 8px 20px rgba(255,46,83,0.25)",
                    "&:hover": {
                      backgroundColor: "#E6294A",
                      boxShadow: "0 10px 24px rgba(255,46,83,0.35)",
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Modal>
          ) : (
            ""
          )}
        </Navbar>
      )}
    </div>
  );
}
