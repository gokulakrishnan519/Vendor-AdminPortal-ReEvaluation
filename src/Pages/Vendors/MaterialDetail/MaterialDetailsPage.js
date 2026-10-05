import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Navbars/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Loading from "../../../Loading/Loading";
import search_icon from "../../../Images/Search Iconaaaa.png";

export default function MaterialDetailsPage() {
  const [search, setSearch] = useState("");

  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const material_id = location.state?.material_id;

  const getTableMaterialDetails = async () => {
    const payload = {
      item_id: material_id,
    };

    try {
      const res = await axios.post(
        "http://10.50.20.89:9091/materilslist/materialsdetails",
        payload,
      );

      console.log(res.data);
      setAllData(res.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      console.log(err);
      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  console.log(allData);

  useEffect(() => {
    getTableMaterialDetails();
  }, []);

  const filtered = allData?.vendors?.filter((v) =>
    Object.values(v).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Grid>
            <Grid sx={{ position: "absolute", top: 80, cursor: "pointer" }}>
              <ArrowBackIcon
                onClick={() => {
                  navigate("/Vendors");
                }}
              />
            </Grid>

            <Grid sx={{ px: 10 }}>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1.5px solid #e8e8e8",
                  p: 3,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {/* Top Stats Row */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    mb: 5,
                    alignItems: "flex-end", // Align all cards to bottom
                  }}
                >
                  {/* Material Card */}
                  <Card
                    sx={{
                      width: { xs: "100%", sm: "48%", md: 330 },
                      borderRadius: 3,
                      boxShadow: "none",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top Section */}
                    <Box
                      sx={{
                        background:
                          "linear-gradient(to bottom, #93B2E1, #C9D8F0)",
                        py: 2,
                        px: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant='h6'
                        fontWeight={500}
                        color='#1a2e4a'
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          textAlign: "center",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "normal",
                          maxWidth: "80%",
                        }}
                      >
                        {allData?.material_name}
                      </Typography>
                    </Box>

                    {/* Bottom Section */}
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #f3f6fd 0%, #eaf1fc 100%)",
                        px: 2,
                        py: 1.5,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography
                          fontWeight={600}
                          fontSize='0.82rem'
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Material ID:
                        </Typography>
                        <Typography
                          fontSize='0.82rem'
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {allData?.material_id}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Total Vendors */}
                  <Card
                    sx={{
                      width: { xs: "100%", sm: "48%", md: 180 },
                      borderRadius: 3,
                      boxShadow: "none",
                      p: 2,
                      background:
                        "linear-gradient(135deg, #c8ddf0 0%, #ddeaf8 60%, #eef4fc 100%)",
                      height: "20vh",
                    }}
                  >
                    <Grid sx={{ height: "8vh" }}>
                      <Typography
                        variant='body2'
                        color='#2e2e2e'
                        fontWeight={500}
                        mb={1}
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Total Vendors
                      </Typography>
                    </Grid>

                    <Grid sx={{ height: "10vh" }}>
                      <Typography
                        variant='h4'
                        fontWeight={500}
                        color='#1a4f9c'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {allData?.total_vendors}
                      </Typography>
                    </Grid>
                  </Card>

                  {/* Active Vendors */}
                  <Card
                    sx={{
                      width: { xs: "100%", sm: "48%", md: 180 },
                      borderRadius: 3,
                      boxShadow: "none",
                      p: 2,
                      background:
                        "linear-gradient(135deg, #c8ddf0 0%, #ddeaf8 60%, #eef4fc 100%)",
                      height: "20vh",
                    }}
                  >
                    <Grid sx={{ height: "8vh" }}>
                      <Typography
                        variant='body2'
                        color='#2e2e2e'
                        fontWeight={500}
                        mb={1}
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Active Vendors
                      </Typography>
                    </Grid>

                    <Grid sx={{ height: "10vh" }}>
                      <Typography
                        variant='h4'
                        fontWeight={500}
                        color='#1a4f9c'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {allData?.active_vendors}
                      </Typography>
                    </Grid>
                  </Card>

                  {/* Latest Quoted Price */}
                  <Card
                    sx={{
                      width: { xs: "100%", sm: "48%", md: 180 },
                      borderRadius: 3,
                      boxShadow: "none",
                      p: 2,
                      background:
                        "linear-gradient(135deg, #c8ddf0 0%, #ddeaf8 60%, #eef4fc 100%)",
                      height: "20vh",
                    }}
                  >
                    <Grid sx={{ height: "8vh" }}>
                      <Typography
                        variant='body2'
                        color='#2e2e2e'
                        fontWeight={500}
                        mb={1}
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Latest Lowest Quoted Price
                      </Typography>
                    </Grid>

                    <Grid sx={{ height: "10vh" }}>
                      <Typography
                        variant='h4'
                        fontWeight={500}
                        color='#1a4f9c'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        ₹ {allData?.latest_quoted_price}
                      </Typography>
                    </Grid>
                  </Card>
                </Box>
                {/* Vendor Table Card */}

                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    border: "1px solid #e0e4f0",
                    background: "#fff",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#1a1a2e",
                      }}
                    >
                      Vendors Supplying This Material
                    </Typography>
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
                  </Box>

                  <TableContainer
                    stickyHeader
                    elevation={0}
                    sx={{ border: "1px solid #eef0f8" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow sx={{ background: "#f5f7fc" }}>
                          {[
                            "Vendor Name",
                            "Vendor Account",
                            "Location",
                            "Quote Price",
                            "Last Quote Date",
                            "RFQ Case ID",
                            "RFQ ID",
                            "Vendor Expiry Date",
                            "Portal Status",
                            "Contact",
                          ].map((h) => (
                            <TableCell
                              key={h}
                              sx={headerCellStyle}
                              align={h == "Portal Status" ? "center" : ""}
                            >
                              {h}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {filtered &&
                          filtered?.map((vendor, i) => (
                            <TableRow
                              key={vendor.id}
                              // sx={{
                              //   backgroundColor:
                              //     i % 2 === 0 ? "#ffffff" : "#f4f6f8",
                              // }}
                              sx={{
                                backgroundColor: vendor.expiry_status
                                  ? "#FFE9EC"
                                  : "inherit",
                              }}
                            >
                              <TableCell
                                sx={{
                                  ...bodyCellStyle,
                                  cursor: "pointer",
                                  color: "#1976d2",

                                  "&:hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                                onClick={() => {
                                  navigate("/VendorDetailsPage", {
                                    state: {
                                      vendor_account: vendor.vendor_account,
                                    },
                                  });
                                }}
                              >
                                {vendor.vendor_name}
                              </TableCell>

                              <TableCell
                                sx={{
                                  ...bodyCellStyle,
                                  // cursor: "pointer",
                                  // color: "#1976d2",
                                  // "&:hover": {
                                  //   textDecoration: "underline",
                                  // },
                                }}
                                onClick={() => {
                                  navigate("/VendorDetailsPage", {
                                    state: {
                                      vendor_account: vendor.vendor_account,
                                    },
                                  });
                                }}
                              >
                                {vendor.vendor_account}
                              </TableCell>
                              <TableCell sx={bodyCellStyle}>
                                {vendor.location}
                              </TableCell>
                              <TableCell sx={bodyCellStyle} align='right'>
                                {vendor.quote_price == null
                                  ? "-"
                                  : vendor.quote_price}
                              </TableCell>
                              <TableCell sx={bodyCellStyle}>
                                {vendor.last_quote_date == null
                                  ? "-"
                                  : vendor.last_quote_date}
                              </TableCell>
                              <TableCell sx={bodyCellStyle} align='right'>
                                {vendor.rfq_case_id == null
                                  ? "-"
                                  : vendor.rfq_case_id}
                              </TableCell>
                              <TableCell sx={bodyCellStyle}>
                                {vendor.rfq_id == null ? "-" : vendor.rfq_id}
                              </TableCell>
                              <TableCell sx={bodyCellStyle}>
                                {vendor.expiry}
                                {vendor.expiry_status ? (
                                  <Chip
                                    label={
                                      vendor.expiry_status == true
                                        ? "Expiry Soon"
                                        : ""
                                    }
                                    size='small'
                                    sx={{
                                      fontSize: "12px",
                                      width: 100,
                                      px: 0.5,
                                      ml: 2,
                                      fontFamily: "Poppins, sans-serif",
                                      fontWeight: 500,
                                      borderRadius: "15px",
                                      backgroundColor: "#FFE0E5",
                                      color: "#E53A6B",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </TableCell>
                              {/* <TableCell sx={{ ...bodyCellStyle }}>
                            <ExpiryChip days={vendor.days_left} />
                          </TableCell> */}
                              <TableCell
                                sx={{ ...bodyCellStyle }}
                                align='center'
                              >
                                <Chip
                                  label={vendor.status}
                                  size='small'
                                  sx={{
                                    fontSize: "12px",
                                    width: 100,
                                    px: 0.5,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 500,
                                    borderRadius: "15px",

                                    backgroundColor:
                                      DECISION_COLOR[vendor.status]?.bg,
                                    color: DECISION_COLOR[vendor.status]?.text,
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                sx={{ ...bodyCellStyle, padding: 0.5 }}
                              >
                                {vendor.contact}
                              </TableCell>
                            </TableRow>
                          ))}
                        {filtered?.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={9}
                              align='center'
                              sx={{ py: 4, color: "#9ba8b5" }}
                            >
                              No vendors found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Navbar>
      )}
    </div>
  );
}

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
  paddingTop: "6px",
  paddingBottom: "6px",
  whiteSpace: "nowrap",
  // cursor: "pointer",
  // px: "4px",
};

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

const DECISION_COLOR = {
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
  Accepted: {
    bg: "#E3F7F4",
    text: "#21BFA7",
    border: "#6EE7B7",
  },

  Active: {
    bg: "#E3F7F4",
    text: "#21BFA7",
    // border: "#6EE7B7",
  },
  Inactive: {
    bg: "#FEF2E0",
    text: "#F99709",
    border: "#C7D2FE",
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
