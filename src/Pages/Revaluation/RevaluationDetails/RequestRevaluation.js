import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ConfirmRequstRevaluation from "./ConfirmRequstRevaluation";

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
  "No Documents": "-",
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

export default function RequestRevaluation({ onClose, data }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [riskLevel, setRiskLevel] = useState("Critical");
  const [status, setStatus] = useState("All");
  const [documentStatus, setDocumentStatus] = useState("Expired");
  const [modal, setModal] = useState(false);
  const [vendors, setVendors] = useState([]);
  // const [search, setSearch] = useState("");

  const filteredVendors = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return vendors;
    }

    return vendors?.filter((vendor) =>
      Object.values(vendor).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(searchValue),
      ),
    );
  }, [vendors, search]);

  useEffect(() => {
    setVendors(data);
  }, []);

  console.log(data);

  const allSelected =
    vendors?.length > 0 && selected?.length === vendors?.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(vendors.map((vendor) => vendor.vendoraccount));
    } else {
      setSelected([]);
    }
  };

  const handleSelectVendor = (vendoraccount) => {
    setSelected((prev) =>
      prev.includes(vendoraccount)
        ? prev.filter((id) => id !== vendoraccount)
        : [...prev, vendoraccount],
    );
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "calc(100% - 32px)",
        maxWidth: 900,
        // height: "calc(100vh - 32px)",
        // maxHeight: 680,
        backgroundColor: "#fff",
        borderRadius: "12px",
        outline: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 15px 45px rgba(0, 0, 0, 0.16)",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          pt: "28px",
          pb: "24px",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "23px",
            fontFamily: "Poppins, sans-serif",
            lineHeight: 1.2,
            fontWeight: 500,
            color: "#2D2D2D",
            letterSpacing: "-0.3px",
          }}
        >
          Select Vendors for Revaluation
        </Typography>
        <Typography
          sx={{
            mt: "8px",
            fontSize: "13px",
            fontFamily: "Poppins, sans-serif",
            color: "#333",
            fontWeight: 400,
          }}
        >
          Select one or more eligible vendors to initiate revaluation
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: "18px",
            top: "18px",
            width: 30,
            height: 30,
            color: "#8B8B8B",
            "&:hover": { backgroundColor: "transparent", color: "#333" },
          }}
        >
          <CloseIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>
      {/* ================= CONTENT ================= */}
      <Box sx={{ flex: 1, overflow: "auto", px: "28px", pb: "18px" }}>
        {/* Main light-blue section */}
        <Box
          sx={{ backgroundColor: "#F3F6FC", p: "20px", borderRadius: "8px" }}
        >
          {/* ================= FILTER CARD ================= */}
          {/* <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px", px: "18px", pt: "18px", pb: "18px", }} > <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#292929", mb: "18px", fontFamily: "Poppins, sans-serif", }} > Revaluation Period </Typography> <Box sx={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr", gap: "20px", }} > <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" size="small" fullWidth sx={{ "& .MuiOutlinedInput-root": { height: "30px", borderRadius: "4px", fontSize: "12px", fontFamily: "Poppins, sans-serif", "& fieldset": { borderColor: "#D7D7D7", }, "&:hover fieldset": { borderColor: "#D7D7D7", }, "&.Mui-focused fieldset": { borderColor: "#D7D7D7", borderWidth: "1px", }, }, "& input": { px: "14px", py: 0, }, "& input::placeholder": { color: "#8A8A8A", opacity: 1, }, }} /> <FilterSelect label="Risk Level" value={riskLevel} onChange={setRiskLevel} options={["Critical", "High", "Medium", "Low"]} /> <FilterSelect label="Status" value={status} onChange={setStatus} options={["All", "Completed", "Pending"]} /> <FilterSelect label="Document Status" value={documentStatus} onChange={setDocumentStatus} options={["Expired", "Valid", "Expiring"]} /> </Box> </Box> */}
          {/* ================= TABLE ================= */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px 8px 0 0",
              overflow: "hidden",
            }}
          >
            {/* Select all */}
            <Box
              sx={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                px: "13px",
                borderBottom: "1px solid #D8D8D8",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/* Select All */}
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={allSelected}
                    onChange={handleSelectAll}
                    size='small'
                    sx={{
                      p: 0,
                      mr: "7px",
                      color: "#333",
                      "&.Mui-checked": { color: "#333" },
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#333",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Select all
                  </Typography>
                </Grid>

                {/* Search */}
                <Grid>
                  <TextField
                    size='small'
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                      width: 180,
                      ml: 2,
                      "& .MuiInputBase-root": {
                        height: 28,
                        fontSize: "11px",
                        fontFamily: "Poppins, sans-serif",
                      },
                      "& .MuiInputBase-input": {
                        padding: "4px 8px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: 0,
                overflowX: "auto",
                maxHeight: "50vh",
                minHeight: "50vh",
                position: "relative",
              }}
            >
              <Table
                stickyHeader
                size='small'
                sx={{
                  "& .MuiTableCell-stickyHeader": {
                    top: -1,
                    backgroundColor: "#F5F5F5",
                    zIndex: 2,
                  },
                }}
              >
                {/* TABLE HEADER */}
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                    <TableCell sx={headerText}>Vendor Account No</TableCell>
                    <TableCell sx={headerText}> Prospect ID </TableCell>
                    <TableCell sx={headerText}> Vendor Name </TableCell>
                    <TableCell sx={headerText}> Risk Level </TableCell>
                    <TableCell sx={headerText}> Last Revaluation </TableCell>
                    <TableCell sx={headerText}> Next Revaluation </TableCell>
                    <TableCell sx={headerText} align='center'>
                      Document Status
                    </TableCell>
                    <TableCell sx={headerText} align='center'>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* TABLE BODY */}
                <TableBody>
                  {filteredVendors?.map((vendor) => {
                    const checked = selected.includes(vendor.vendoraccount);
                    return (
                      <TableRow key={vendor.vendoraccount}>
                        {/* Account number */}
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                              checked={checked}
                              onChange={() =>
                                handleSelectVendor(vendor.vendoraccount)
                              }
                              size='small'
                              sx={{
                                p: 0,
                                mr: "7px",
                                color: "#333",
                                "&.Mui-checked": { color: "#333" },
                                "& .MuiSvgIcon-root": { fontSize: 17 },
                              }}
                            />
                            <Typography sx={bodyText}>
                              {vendor.vendoraccount}
                            </Typography>
                          </Box>
                        </TableCell>
                        {/* Prospect ID */}
                        <TableCell>
                          <Typography sx={bodyText}>
                            {vendor.prospectid}
                          </Typography>
                        </TableCell>
                        {/* Vendor name */}
                        <TableCell>
                          <Typography sx={bodyText}>
                            {vendor.vendorname}
                          </Typography>
                        </TableCell>
                        {/* Risk */}
                        <TableCell>
                          {/* <RiskBadge /> */}

                          {vendor.risklevel == null ? (
                            "-"
                          ) : (
                            <Chip
                              label={
                                riskLabels[vendor.risklevel] ||
                                vendor.risklevel ||
                                "-"
                              }
                              size='small'
                              sx={{
                                backgroundColor:
                                  riskColors[vendor.risklevel]?.bg,
                                color: riskColors[vendor.risklevel]?.color,
                                ...chipStyle,
                              }}
                            />
                          )}
                        </TableCell>
                        {/* Last Revaluation */}
                        <TableCell>
                          <Typography sx={bodyText}>
                            {vendor.lastreevaluation || "-"}
                          </Typography>
                        </TableCell>
                        {/* Next Revaluation */}
                        <TableCell>
                          <Typography sx={bodyText}>
                            {vendor.nextreevaluationdate || "-"}
                          </Typography>
                        </TableCell>
                        {/* Document */}
                        <TableCell align='center'>
                          {vendor.documentstatus == null ||
                          vendor.documentstatus == "-" ? (
                            "-"
                          ) : (
                            <Chip
                              label={
                                documentStatusLabels[vendor.documentstatus] ||
                                vendor.documentstatus ||
                                "-"
                              }
                              size='small'
                              sx={{
                                backgroundColor:
                                  documentStatusColors[vendor.documentstatus]
                                    ?.bg,
                                color:
                                  documentStatusColors[vendor.documentstatus]
                                    ?.color,
                                ...chipStyle,
                              }}
                            />
                          )}
                        </TableCell>
                        {/* Status */}
                        <TableCell align='center'>
                          {/* <StatusBadge /> */}
                          {vendor.status == null ? (
                            "-"
                          ) : (
                            <Chip
                              label={
                                statusLabels[vendor.status] ||
                                vendor.status ||
                                "-"
                              }
                              size='small'
                              sx={{
                                backgroundColor:
                                  statusColors[vendor.status]?.bg,
                                color: statusColors[vendor.status]?.color,
                                ...chipStyle,
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        {/* ================= FOOTER ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            pt: "25px",
            pb: "5px",
          }}
        >
          <Button
            disabled={selected.length === 0}
            onClick={() => {
              setModal(true);
            }}
            sx={{
              width: "190px",
              height: "34px",
              borderRadius: "6px",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              backgroundColor: "#FF3154",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#FF8197", boxShadow: "none" },
              "&.Mui-disabled": {
                backgroundColor: "#FF91A4",
                color: "#FFFFFF",
                opacity: 0.75,
              },
            }}
          >
            Initiate Revaluation
          </Button>
          <Button
            onClick={onClose}
            variant='outlined'
            sx={{
              width: "190px",
              height: "34px",
              borderRadius: "6px",
              border: "1.5px solid #FF3154",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              color: "#FF3154",
              "&:hover": {
                border: "1.5px solid #FF3154",
                backgroundColor: "rgba(255,49,84,0.04)",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "calc(100% - 32px)",

            height: "calc(100vh - 32px)",
            maxHeight: 680,
          }}
        >
          <ConfirmRequstRevaluation
            // setModal={setModal}
            onClose={onClose}
            allSelected={allSelected}
          />
        </Box>
      </Modal>
    </Box>
  );
}

/* ===================================================== RISK BADGE ===================================================== */
function RiskBadge() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        minWidth: "62px",
        height: "18px",
        px: "8px",
        borderRadius: "14px",
        backgroundColor: "#E83D70",
        color: "#FFF",
        fontSize: "10px",
        fontWeight: 500,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <WarningAmberOutlinedIcon sx={{ fontSize: "12px" }} /> Critical
    </Box>
  );
}
/* ===================================================== DOCUMENT BADGE ===================================================== */
function DocumentBadge() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        minWidth: "62px",
        height: "18px",
        px: "8px",
        borderRadius: "14px",
        backgroundColor: "#FCE8EE",
        color: "#FF3F67",
        fontSize: "10px",
        fontWeight: 500,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <WarningAmberOutlinedIcon sx={{ fontSize: "10px" }} /> 1 Expired
    </Box>
  );
}
/* ===================================================== STATUS BADGE ===================================================== */
function StatusBadge() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "65px",
        height: "18px",
        px: "9px",
        borderRadius: "14px",
        backgroundColor: "#E3F7F4",
        color: "#12B8A6",
        fontSize: "10px",
        fontWeight: 500,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      Completed
    </Box>
  );
}
/* ===================================================== TABLE STYLES ===================================================== */
const headerText = {
  height: "38px",
  py: 0,
  px: "7px",
  backgroundColor: "#F5F5F5",
  borderRight: "1px solid #D9D9D9",
  borderBottom: "1px solid #D9D9D9",
  fontSize: "10px",
  fontWeight: 500,
  color: "#303030",
  whiteSpace: "nowrap",
  fontFamily: "Poppins, sans-serif",
};
const bodyText = {
  fontSize: "10px",
  color: "#333",
  whiteSpace: "nowrap",
  fontFamily: "Poppins, sans-serif",
};
