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
import search_icon from "../../Images/Search Icon.png";
import dropdown from "../../Images/Dropdown.png";
import VendorTop from "./VendorTop";
import CloseIcon from "@mui/icons-material/Close";

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

const bodyCellStylen = {
  fontSize: "12px",
  color: "#2e2e2e",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "8px",
  paddingBottom: "8px",
  whiteSpace: "nowrap",

  // px: "4px",
};

const textFieldStyle = {
  backgroundColor: "#Ffff",
  borderRadius: "2px",
  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
    height: "25px",
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
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

export default function Vendors() {
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("vendorToggle") == null
      ? "Vendors"
      : sessionStorage.getItem("vendorToggle"),
  );
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
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [expirationSub, setExpirationSub] = useState("");

  const [vendorOptions, setVendorOption] = useState([]);

  const [status, setStatus] = useState(
    sessionStorage.getItem("vendor_status") == null
      ? "All"
      : sessionStorage.getItem("vendor_status"),
  );

  console.log(activeTab);

  // Selecting vendor name auto-fills account no
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

  const getVendorList = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://10.50.20.89:9091/vendorlist/invite");

      setVendorOption(
        res?.data?.data
          ?.sort((a, b) => a.accountnum.localeCompare(b.accountnum))
          ?.map((item) => ({
            label: item.name,
            accountNo: item.accountnum,
            email: item.email == null ? "" : item.email,
            phone: item.phone == null ? "" : item.phone,
          })),
      );

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
    if (modal == true) {
      getVendorList();
    }
  }, [modal]);

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

  const tabs = [
    {
      label: "Vendors",
      img: vendors_nactive,
      activeimg: vendors_active,
      count: kpiCounts?.new,
    },
    {
      label: "Materials",
      img: material_nactive,
      activeimg: material_active,
      count: kpiCounts?.in_progress,
    },
  ];

  const getTableList = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        activeTab === "Vendors"
          ? "http://10.50.20.89:9091/vendorlist/list"
          : activeTab === "Materials"
            ? "http://10.50.20.89:9091/materilslist/materials"
            : "",
      );

      console.log(res.data);

      setTableData(res.data.data);

      setLoading(false);
    } catch (err) {
      alert(err);
      // const errorMessage =
      //   err.response?.data?.message || err.message || "Login failed";

      // console.log(err);
      // navigate("/ErrorHandling");
      // sessionStorage.setItem("errormessge", errorMessage);
      // setLoading(false);
    }
  };

  const VendorList = async () => {
    // setLoading(true);

    try {
      const res = await axios.post("http://10.50.20.89:9091/vendorlist/list");

      console.log(res.data);

      setTableData2(res.data.data);
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
    VendorList();
  }, []);

  useEffect(() => {
    getTableList();
  }, [activeTab]);

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

  const filteredRows = tableData?.filter((row) => {
    const searchMatch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    );

    let match = true;

    if (activeTab === "Vendors") {
      if (status === "All") {
        match = true;
      } else if (status === "Inactive") {
        match = row.status === "Inactive";
      } else if (status === "Active") {
        match = row.status === "Active";
      } else if (status === "true") {
        match = row.expiry_status == true;
      } else if (status === "false") {
        match = row.expiry_status == false;
      }
    } else if (activeTab === "Materials") {
      if (status === "true") {
        match = row.expiry_status === true;
      }
      // else if (status === "false") {
      //   match = row.expiry_status === false;
      // }
      else if (status === "Vendor Mapped Material") {
        match = row.vendors_mapped != 0;
      } else if (status === "Vendor Unmapped Material") {
        match = row.vendors_mapped == 0;
      }
    }

    return searchMatch && match;
  });

  console.log(status);

  useEffect(() => {
    sessionStorage.setItem("selectnav1", "Vendors");
  }, []);

  const sendInvitation = async () => {
    setLoading(true);

    const payload = {
      identifier: email,
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/auth/send-set-password-link",
        payload,
      );

      console.log(res.data);
      if (res.data.ok == true) {
        setModal2(true);
        getTableList();
        setLoading(false);
      } else {
        alert(res.data.message);
        setLoading(false);
      }

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

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const topFunction = (topname, input2, input3) => {
    if (topname == "Total Vendors") {
      setActiveTab("Vendors");
      setStatus("All");
      // setStatus3("All");
      sessionStorage.setItem("vendor_status", "All");
      sessionStorage.setItem("vendorToggle", "Vendors");
    } else if (topname == "Total Materials Mapped") {
      setActiveTab("Materials");

      setStatus("Vendor Mapped Material");

      sessionStorage.setItem("vendor_status", "Vendor Mapped Material");
      sessionStorage.setItem("vendorToggle", "Materials");
    } else if (topname == "Active Vendors") {
      setActiveTab("Vendors");
      setStatus("Active");

      sessionStorage.setItem("vendor_status", "Active");
      sessionStorage.setItem("vendorToggle", "Vendors");
    } else if (topname == "Inactive Vendors") {
      setActiveTab("Vendors");
      setStatus("Inactive");

      sessionStorage.setItem("vendor_status", "Inactive");
      sessionStorage.setItem("vendorToggle", "Vendors");
    } else if (topname == "Upcoming Expirations") {
      // setActiveTab("Vendors");
      setStatus("true");
      sessionStorage.setItem("vendor_status", "true");
      setExpirationSub(input2);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <VendorTop tableData={tableData2} topFunction={topFunction} />

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
                  sx={{
                    py: 2.5,
                    px: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: "18px",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Vendor Materials Capabilities
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                              sessionStorage.setItem("vendorToggle", tab.label);

                              setPage(0);
                              // setStatus("All");
                              setSearch("");
                              // setStatus2("All");

                              if (tab.label == "Materials") {
                                sessionStorage.setItem("vendor_status", "All");
                                setStatus("All");
                              } else {
                                sessionStorage.setItem("vendor_status", "All");
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
                              background: isActive ? "#DBE5F5" : "transparent",
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
                                  background: isActive ? "#0C52BC" : "#E0E0E0",
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
                      justifyContent: "right",
                      gap: 1,
                    }}
                  >
                    {status != "All" && (
                      <Chip
                        label={
                          status == "true"
                            ? expirationSub
                            : status == "Active"
                              ? "Active Vendors"
                              : status == "Inactive"
                                ? "Inactive Vendors"
                                : status
                        }
                        onDelete={() => {
                          // setActiveTab(activeTab);
                          // sessionStorage.setItem("vendorToggle", "All");
                          setStatus("All");
                          sessionStorage.setItem("vendor_status", "All");
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

                    <Button
                      variant='outlined'
                      onClick={handleClick}
                      sx={{
                        borderRadius: "6px",
                        textTransform: "none",
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
                        <Grid
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
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
                        </Grid>

                        <Grid
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <img
                            src={dropdown}
                            alt='filter'
                            style={{
                              // width: 15,
                              height: 5,
                              objectFit: "contain",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Button>
                    <Button
                      variant='contained'
                      startIcon={<AddIcon />}
                      sx={{
                        minWidth: 100,
                        height: 28,
                        backgroundColor: "#1a6fd4",
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "11px",
                        borderRadius: "6px",
                        padding: "2px 10px",
                        boxShadow: "none",
                        fontFamily: "Poppins, sans-serif",

                        "& .MuiButton-startIcon": {
                          marginRight: "2px",
                          "& svg": {
                            fontSize: "14px",
                          },
                        },

                        "&:hover": {
                          backgroundColor: "#1560bb",
                          boxShadow: "none",
                        },
                      }}
                      onClick={() => {
                        setModal(true);
                        setEmail(null);
                        setSelectedVendor(null);
                        setSelectedAccount(null);
                      }}
                    >
                      Invite Vendor
                    </Button>
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
                          {(activeTab === "Vendors"
                            ? [
                                "Vendor Name",
                                "Vendor Account No",
                                "Contact Person",
                                "Location",
                                "Portal Status",
                              ]
                            : activeTab === "Materials"
                              ? [
                                  "Material ID",
                                  "Material Description",
                                  "Vendors Mapped",
                                ]
                              : []
                          )
                            .filter(Boolean)
                            .map((header) => (
                              <TableCell
                                key={header}
                                sx={{
                                  ...headerCellStyle,
                                  paddingRight:
                                    header == "Vendors Mapped" ? 10 : "",
                                }}
                                align={
                                  header === "Portal Status"
                                    ? "center"
                                    : header == "Vendors Mapped"
                                      ? "right"
                                      : ""
                                }
                              >
                                {header}
                              </TableCell>
                            ))}
                        </TableRow>
                      </TableHead>

                      {/* Body */}
                      <TableBody>
                        {filteredRows && filteredRows.length > 0 ? (
                          filteredRows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                            )
                            .map((row, index) => {
                              return (
                                <Tooltip
                                  title={
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontFamily: "Poppins",
                                          fontSize: "8px",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Click to view details
                                      </Typography>
                                    </Box>
                                  }
                                  arrow
                                  placement='top'
                                  key={index}
                                >
                                  <TableRow
                                    key={index}
                                    onClick={() => {
                                      if (activeTab == "Vendors") {
                                        navigate("/VendorDetailsPage", {
                                          state: {
                                            vendor_account: row.vendor_account,
                                          },
                                        });
                                      } else {
                                        navigate("/MaterialDetailsPage", {
                                          state: {
                                            material_id: row.material_id,
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    {activeTab === "Vendors" ? (
                                      <>
                                        <TableCell sx={bodyCellStyle}>
                                          {row.vendor_name}
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                          {row.vendor_account}
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                          {row.contact_person == null
                                            ? "-"
                                            : row.contact_person}
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                          {row.location}
                                        </TableCell>
                                        <TableCell
                                          sx={{ py: 0 }}
                                          align='center'
                                        >
                                          <Chip
                                            label={row.status}
                                            size='small'
                                            sx={{
                                              width: 100,
                                              fontFamily: "Poppins, sans-serif",
                                              fontWeight: 500,
                                              backgroundColor:
                                                row.status === "Active"
                                                  ? "#E3F7F4"
                                                  : "#FEF2E0",
                                              color:
                                                row.status === "Active"
                                                  ? "#21BFA7"
                                                  : "#F99709",
                                            }}
                                          />
                                        </TableCell>
                                      </>
                                    ) : (
                                      <>
                                        <TableCell sx={bodyCellStyle}>
                                          {row.material_id}
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                          {row.material_name}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            ...bodyCellStyle,
                                            paddingRight: 10,
                                          }}
                                          align='right'
                                        >
                                          {row.vendors_mapped}
                                        </TableCell>
                                      </>
                                    )}
                                  </TableRow>
                                </Tooltip>
                              );
                            })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              align='center'
                              sx={{ py: 1, fontFamily: "Poppins, sans-serif" }}
                            >
                              No Data Found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                        px: 2,
                      }}
                    >
                      <Stack
                        direction='row'
                        justifyContent='center'
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
                      </Stack>
                      <TablePagination
                        component='div'
                        count={filteredRows && filteredRows.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 20]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ fontFamily: "Poppins, sans-serif" }}
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
            <Box p={2} width={220}>
              <TextField
                fullWidth
                size='small'
                placeholder='Search'
                sx={textFieldStyle}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />

              {activeTab == "Vendors" ? (
                <Grid sx={{ mt: 1 }}>
                  <Grid
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                  >
                    Select Status
                  </Grid>
                  <TextField
                    select
                    fullWidth
                    size='small'
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      sessionStorage.setItem("vendor_status", e.target.value);
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
                      value='Active'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Active
                    </MenuItem>
                    <MenuItem
                      value='Inactive'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Inactive
                    </MenuItem>
                  </TextField>
                </Grid>
              ) : (
                <Grid sx={{ mt: 1 }}>
                  <Grid
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                  >
                    Select
                  </Grid>
                  <TextField
                    select
                    fullWidth
                    size='small'
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      sessionStorage.setItem("vendor_status", e.target.value);
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
                      value='Vendor Mapped Material'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Vendor Mapped Material
                    </MenuItem>
                    <MenuItem
                      value='Vendor Unmapped Material'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      Vendor Unmapped Material
                    </MenuItem>
                  </TextField>
                </Grid>
              )}
            </Box>
          </Popover>

          <Modal
            open={modal}
            onClose={() => {
              setModal(false);
            }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Grid
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  cursor: "pointer",
                }}
              >
                <CloseIcon
                  onClick={() => {
                    setModal(false);
                  }}
                />
              </Grid>
              <Box sx={{ maxWidth: 660, backgroundColor: "#fff" }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "28px",
                    fontWeight: 500,
                    color: "#1a1a1a",
                    mb: 3.5,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Invite Vendor
                </Typography>

                <Grid container spacing={2.5}>
                  {/* Vendor Name - Autocomplete */}
                  <Grid size={{ lg: 6, xs: 12, md: 12, sm: 12 }}>
                    <LabelText>Vendor Name</LabelText>
                    <Autocomplete
                      options={vendorOptions}
                      getOptionLabel={(option) => option.label}
                      value={selectedVendor}
                      onChange={handleVendorChange}
                      isOptionEqualToValue={(option, value) =>
                        option.label === value.label
                      }
                      ListboxProps={{
                        sx: {
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder='Search vendor name'
                          sx={textFieldStyle}
                        />
                      )}
                    />
                    <Typography
                      sx={{
                        color: "#9e9e9e",
                        fontSize: "0.7rem",
                        mt: 0.5,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Only Vendor Collaboration enabled vendors are shown
                    </Typography>
                  </Grid>

                  {/* Vendor Account No - Autocomplete */}
                  <Grid size={{ lg: 6, xs: 12, md: 12, sm: 12 }}>
                    <LabelText>Vendor Account No</LabelText>
                    <Autocomplete
                      options={vendorOptions}
                      getOptionLabel={(option) => option.accountNo}
                      value={selectedAccount}
                      onChange={handleAccountChange}
                      isOptionEqualToValue={(option, value) =>
                        option.accountNo === value.accountNo
                      }
                      ListboxProps={{
                        sx: {
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder='Search account no'
                          sx={textFieldStyle}
                        />
                      )}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid size={{ lg: 12, xs: 12, md: 12, sm: 12 }}>
                    <LabelText>Email</LabelText>
                    <TextField
                      disabled
                      fullWidth
                      placeholder='Email'
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      sx={textFieldStyle}
                    />
                    <Typography
                      sx={{
                        color: "#9e9e9e",
                        fontSize: "0.7rem",
                        mt: 0.5,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      If no email is found, please update the primary contact
                      details in Dynamics.
                    </Typography>
                  </Grid>

                  {/* Mobile Number */}
                  {/* <Grid size={{ lg: 6, xs: 12, md: 12, sm: 12 }}>
                    <LabelText>Mobile Number</LabelText>
                    <TextField
                      fullWidth
                      placeholder='Mobile Number'
                      value={mobileNumber}
                      // onChange={(e) => setMobileNumber(e.target.value)}
                      sx={inputSx}
                    />
                    <Typography
                      sx={{
                        color: "#9e9e9e",
                        fontSize: "0.8rem",
                        mt: 0.5,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Mobile Number will be fetched from D365 based on the
                      selected vendor.
                    </Typography>
                  </Grid> */}
                </Grid>

                {/* Send Invitation Button */}
                <Box sx={{ mt: 4 }}>
                  <Button
                    disabled={email == null || email == ""}
                    variant='contained'
                    // onClick={handleSubmit}
                    sx={{
                      backgroundColor: "#f0344a",
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "12px",
                      borderRadius: "4px",
                      padding: "6px 20px",
                      boxShadow: "none",
                      fontFamily: "Poppins, sans-serif",
                      "&:hover": {
                        backgroundColor: "#d62b3f",
                        boxShadow: "none",
                      },
                      "&:active": {
                        backgroundColor: "#c0253a",
                        boxShadow: "none",
                      },
                      "&:disabled": {
                        backgroundColor: "#FF97A9",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      sendInvitation();
                    }}
                  >
                    Send Invitation
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>

          <Modal
            open={modal2}
            onClose={() => {
              setModal2(false);
            }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography
                id='modal-modal-title'
                variant='h6'
                component='h2'
                sx={{
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                }}
              >
                Invitation Sent Successfully
              </Typography>

              <Typography
                id='modal-modal-description'
                sx={{
                  mt: 1,
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                  color: "#555",
                  fontSize: "14px",
                }}
              >
                The invitation email has been successfully sent to the vendor.
                Please check with the vendor for further action.
              </Typography>

              <Grid>
                <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "#FF2E53",
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "12px",
                      borderRadius: "4px",
                      padding: "3px 10px",
                      fontFamily: "Poppins, sans-serif",
                      "&:hover": {
                        backgroundColor: "#FF2E53",
                      },
                    }}
                    onClick={() => {
                      setModal2(false);
                      setModal(false);
                    }}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Navbar>
      )}
    </div>
  );
}
