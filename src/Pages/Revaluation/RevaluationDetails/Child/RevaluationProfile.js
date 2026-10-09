import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  Link,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import dayjs from "dayjs";
import Loading from "../../../../Loading/Loading";

const RISK_STYLES = {
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

// const RISK_STYLES = {
//   Critical: {
//     color: "#E83E70",
//     bg: "#FCE7EF",
//   },
//   High: {
//     color: "#FF3366",
//     bg: "#FDEBF0",
//   },
//   Elevated: {
//     color: "#FF6B00",
//     bg: "#FFF0E8",
//   },
//   Medium: {
//     color: "#FF9800",
//     bg: "#FFF4E2",
//   },
//   Low: {
//     color: "#00BFA5",
//     bg: "#E7F8F5",
//   },
// };

const RiskChip = ({ level }) => {
  const normalizedLevel =
    Object.keys(RISK_STYLES).find(
      (key) => key.toUpperCase() === level?.toUpperCase(),
    ) || level;

  const style = RISK_STYLES[normalizedLevel];

  return (
    <Chip
      label={normalizedLevel}
      size='small'
      sx={{
        color: style?.color,
        backgroundColor: style?.bg,
        fontSize: "11px",

        width: 80,
      }}
    />
  );
};

export default function RevaluationProfile({
  revaluation_id,
  setRiskLevelUpdate,
  riskLevelUpdate,
}) {
  const [draft, setDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [riskLevelData, setRiskLevelData] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = () => {
    // setDraft(riskLevel);
    setIsEditing(true);
  };

  // const handleSave = () => {
  //   // setRiskLevel(draft);
  //   // TODO: call your API here
  // };

  const handleCancel = () => {
    // setDraft(riskLevel);
    setIsEditing(false);
  };

  const getRiskLevel = async () => {
    setLoading(true);
    const payload = {
      reevaluation_id: revaluation_id,
    };

    try {
      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/history/get",
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      setRiskLevelData(data.data);
      setDraft(
        data?.data?.reevaluation?.risk_level == null
          ? ""
          : data.data.reevaluation.risk_level,
      );
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Failed to get risk level:", error);
      throw error;
    }
  };

  useEffect(() => {
    getRiskLevel();
  }, []);

  const RiskLevelUpdate = async () => {
    setLoading(true);

    const payload = {
      reevaluation_id: revaluation_id,
      risk_level: draft,
      modified_by: sessionStorage.getItem("UserId"),
    };

    try {
      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/risk-level/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || data?.detail || "Failed to update risk level",
        );
      }

      setSnackbarSeverity("success");
      setSnackbarMessage(data?.message || "Risk level updated successfully!");
      setSnackbarOpen(true);
      setIsEditing(false);
      getRiskLevel();
      setRiskLevelUpdate(!riskLevelUpdate);

      return data;
    } catch (error) {
      console.error("Failed to update risk level:", error);

      setSnackbarSeverity("error");
      setSnackbarMessage(
        error.message || "Something went wrong. Please try again.",
      );
      setSnackbarOpen(true);

      return null;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Paper
          elevation={0}
          sx={{ p: 3, borderRadius: 2, bgcolor: "#fff", mt: 3 }}
        >
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              variant='filled'
              sx={{
                width: "100%",
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
              }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          {/* Header row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
              minHeight: 48,
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Risk Level
            </Typography>

            <Typography sx={{ fontWeight: 500, color: "#000", fontSize: 13 }}>
              Current Risk Level
            </Typography>

            {!isEditing ? (
              <>
                <RiskChip level={draft} />
                <Link
                  component='button'
                  underline='always'
                  onClick={handleEdit}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontWeight: 600,
                    fontSize: 12,
                    ml: 2,
                  }}
                >
                  <EditOutlinedIcon sx={{ fontSize: 14 }} />
                  Edit
                </Link>
              </>
            ) : (
              <>
                <FormControl size='small' sx={{ minWidth: 120 }}>
                  <Select
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    renderValue={(v) => <RiskChip level={v} />}
                    sx={{
                      height: 33,
                      fontSize: 12,
                    }}
                    MenuProps={{ PaperProps: { sx: { mt: 0.5 } } }}
                  >
                    {Object.keys(RISK_STYLES).map((level) => (
                      <MenuItem key={level} value={level.toUpperCase()}>
                        <Grid
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiskChip level={level} />
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Button
                    variant='contained'
                    onClick={RiskLevelUpdate}
                    sx={{
                      bgcolor: "#0b52bf",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 12,
                      px: 2.5,
                      boxShadow: "none",
                    }}
                    disabled={draft == ""}
                  >
                    Save
                  </Button>
                  <Button
                    variant='outlined'
                    onClick={handleCancel}
                    sx={{
                      color: "#0b52bf",
                      borderColor: "#0b52bf",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 12,
                      px: 2.5,
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            )}
          </Box>

          {/* Revaluation history */}
          <Typography sx={{ fontWeight: 500, fontSize: 18, mt: 5, mb: 2 }}>
            Revaluation History
          </Typography>

          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      borderBottom: "2px solid #e0e0e0",
                      fontWeight: 500,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  <TableCell>Date</TableCell>
                  <TableCell>Action / Status</TableCell>
                  <TableCell>Assessed By</TableCell>
                  <TableCell>Trigger Type</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Trigger by</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {riskLevelData?.history
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={row.id ?? row.action_at + index}
                      sx={{
                        "& td": {
                          borderBottom: "1px solid #eee",
                          fontSize: 12,
                        },
                      }}
                    >
                      <TableCell>
                        {dayjs(row.action_at).format("DD-MMM-YYYY")}
                      </TableCell>

                      <TableCell>{row.action_type}</TableCell>
                      <TableCell>{row.assessed_by_name}</TableCell>

                      <TableCell>{row.trigger_type}</TableCell>
                      <TableCell>
                        <RiskChip level={row.risk_level} />
                      </TableCell>
                      <TableCell>{row.triggered_by_name}</TableCell>
                      <TableCell>{row.comments}</TableCell>
                    </TableRow>
                  ))}

                {(!riskLevelData?.history ||
                  riskLevelData.history.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={7} align='center'>
                      No history available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component='div'
            count={riskLevelData?.history?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              "& .MuiTablePagination-toolbar": {
                minHeight: 42,
                fontSize: 12,
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: 12,
                  marginBottom: 0,
                },
            }}
          />
        </Paper>
      )}
    </>
  );
}
