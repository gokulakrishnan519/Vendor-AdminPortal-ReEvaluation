import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  Link,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const RISK_STYLES = {
  Low: { color: "#14b8a6", bg: "#e6f7f4" },
  Medium: { color: "#d97706", bg: "#fef3e2" },
  High: { color: "#dc2626", bg: "#fdeaea" },
};

const historyRows = [
  {
    date: "29 Aug 2026",
    status: "Completed",
    assessedBy: "Kannan",
    triggerType: "Auto Triggered",
    risk: "High",
    triggerBy: "System",
    comments: "-",
  },
  {
    date: "15 Mar 2026",
    status: "Completed",
    assessedBy: "Kannan",
    triggerType: "Manually Triggered",
    risk: "Medium",
    triggerBy: "Kannan",
    comments: "-",
  },
  {
    date: "15 Mar 2025",
    status: "Completed",
    assessedBy: "Kannan",
    triggerType: "Auto Triggered",
    risk: "Low",
    triggerBy: "System",
    comments: "-",
  },
];

const RiskChip = ({ level }) => {
  const s = RISK_STYLES[level];
  return (
    <Chip
      icon={
        <WarningAmberRoundedIcon
          sx={{ fontSize: 14, color: `${s.color} !important` }}
        />
      }
      label={level}
      sx={{
        bgcolor: s.bg,
        color: s.color,
        fontWeight: 500,
        fontSize: 12,
        height: 23,
        borderRadius: "16px",
        minWidth: 96,
        justifyContent: "center",
      }}
    />
  );
};

export default function RevaluationProfile() {
  const [riskLevel, setRiskLevel] = useState("Low");
  const [draft, setDraft] = useState("Low");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setDraft(riskLevel);
    setIsEditing(true);
  };

  const handleSave = () => {
    setRiskLevel(draft);
    setIsEditing(false);
    // TODO: call your API here
  };

  const handleCancel = () => {
    setDraft(riskLevel);
    setIsEditing(false);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: "#fff", mt: 3 }}>
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
            <RiskChip level={riskLevel} />
            <Link
              component="button"
              underline="always"
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
            <FormControl size="small" sx={{ minWidth: 120 }}>
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
                  <MenuItem key={level} value={level}>
                    <RiskChip level={level} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  bgcolor: "#0b52bf",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 12,
                  px: 2.5,
                  boxShadow: "none",
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
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
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  borderBottom: "2px solid #e0e0e0",
                  fontWeight: 500,
                  fontSize: 12,
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
            {historyRows.map((row) => (
              <TableRow
                key={row.date}
                sx={{
                  "& td": { borderBottom: "1px solid #eee", fontSize: 12 },
                }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.assessedBy}</TableCell>
                <TableCell>{row.triggerType}</TableCell>
                <TableCell>{row.risk}</TableCell>
                <TableCell>{row.triggerBy}</TableCell>
                <TableCell>{row.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
