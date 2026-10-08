import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  TextField,
  Divider,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useNavigate } from "react-router-dom";

/* =========================================================
   THEME
========================================================= */

const COLORS = {
  primary: "#2563EB",
  primaryLight: "#EFF6FF",
  text: "#172033",
  secondaryText: "#64748B",
  border: "#E2E8F0",
  background: "#F8FAFC",
  sectionBackground: "#F1F5F9",
  white: "#FFFFFF",
  success: "#059669",
  successLight: "#ECFDF5",
};

const riskStyles = {
  CRITICAL: {
    color: "#C81E5B",
    backgroundColor: "#FFF0F5",
    borderColor: "#F9C7D9",
  },
  HIGH: {
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  ELEVATED: {
    color: "#EA580C",
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
  },
  MEDIUM: {
    color: "#D97706",
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  LOW: {
    color: "#059669",
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
};

/* =========================================================
   COMMON STYLES
========================================================= */

const bodyCellStyle = {
  fontSize: 13,
  color: COLORS.text,
  fontFamily: "Poppins, sans-serif",
  borderBottom: `1px solid ${COLORS.border}`,
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,

    "& fieldset": {
      borderColor: "#CBD5E1",
    },

    "&:hover fieldset": {
      borderColor: "#94A3B8",
    },

    "&.Mui-focused fieldset": {
      borderColor: COLORS.primary,
      borderWidth: 1,
    },
  },
};

/* =========================================================
   SECTION CARD
========================================================= */

function Card({ children, sx = {} }) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.03)",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  subtitle,
  icon,
  editing,
  onEdit,
  onCancel,
  onSave,
}) {
  return (
    <Box
      sx={{
        px: 2.5,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        {icon && (
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primaryLight,
              color: COLORS.primary,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}

        <Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.text,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                mt: 0.25,
                fontSize: 11,
                color: COLORS.secondaryText,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {!editing ? (
        <Button
          variant='text'
          startIcon={<EditOutlinedIcon sx={{ fontSize: 15 }} />}
          onClick={onEdit}
          sx={{
            minWidth: "auto",
            px: 1,
            color: COLORS.primary,
            textTransform: "none",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "Poppins, sans-serif",
            borderRadius: "6px",

            "&:hover": {
              backgroundColor: COLORS.primaryLight,
            },

            "& .MuiButton-startIcon": {
              marginRight: "4px",
            },
          }}
        >
          Edit
        </Button>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={onCancel}
            startIcon={<CloseOutlinedIcon sx={{ fontSize: 15 }} />}
            sx={{
              minWidth: "auto",
              px: 1.25,
              color: COLORS.secondaryText,
              textTransform: "none",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "Poppins, sans-serif",
              borderRadius: "6px",

              "&:hover": {
                backgroundColor: "#F1F5F9",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={onSave}
            startIcon={<CheckIcon sx={{ fontSize: 15 }} />}
            sx={{
              minWidth: "auto",
              px: 1.25,
              color: COLORS.primary,
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              borderRadius: "6px",

              "&:hover": {
                backgroundColor: COLORS.primaryLight,
              },
            }}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
}

/* =========================================================
   RISK CHIP
========================================================= */

function RiskChip({ risk }) {
  const style = riskStyles[risk];

  return (
    <Chip
      icon={
        <WarningAmberOutlinedIcon
          sx={{
            fontSize: "14px !important",
          }}
        />
      }
      label={risk}
      size='small'
      sx={{
        height: 27,
        minWidth: 100,
        justifyContent: "flex-start",
        border: `1px solid ${style.borderColor}`,
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "Poppins, sans-serif",

        "& .MuiChip-icon": {
          color: style.color,
          marginLeft: "7px",
        },

        "& .MuiChip-label": {
          paddingLeft: "4px",
          paddingRight: "9px",
        },
      }}
    />
  );
}

/* =========================================================
   REVALUATION PERIOD
========================================================= */

function RevaluationPeriod({ settingGetAll }) {
  const [editing, setEditing] = useState(false);
  const [revaluationData, setRevaluationData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const periods = settingGetAll?.data?.reevaluation_periods;

    if (Array.isArray(periods)) {
      setRevaluationData(periods);

      setEditData(
        periods.map((item) => ({
          ...item,
        })),
      );
    }
  }, [settingGetAll]);

  // ==============================
  // EDIT
  // ==============================
  const handleEdit = () => {
    setEditData(
      revaluationData.map((item) => ({
        ...item,
      })),
    );

    setEditing(true);
  };

  // ==============================
  // VALUE CHANGE
  // ==============================

  const handleValueChange = (index, value) => {
    setEditData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              value: value,
            }
          : item,
      ),
    );
  };

  // ==============================
  // UNIT CHANGE
  // ==============================
  const handleUnitChange = (index, unit) => {
    setEditData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              unit: unit,
            }
          : item,
      ),
    );
  };

  // ==============================
  // API CALL
  // ==============================
  const RevaluationEdit = async () => {
    try {
      const payload = {
        periods: editData.map((item) => ({
          risk_level: item.risk_level,
          value: Number(item.value),
          unit: item.unit,
        })),

        modified_by: sessionStorage.getItem("UserId"),
      };

      console.log("Revaluation Payload:", payload);

      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/settings/reevaluation-periods",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
        setLoading(true),
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);

        throw new Error(data?.detail || "Failed to update revaluation periods");
      }

      console.log("Revaluation updated successfully:", data);

      return data;
    } catch (error) {
      console.error("Failed to edit revaluation periods:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // SAVE
  // ==============================
  const handleSave = async () => {
    try {
      setSaving(true);

      await RevaluationEdit();

      // Update UI only when API succeeds
      setRevaluationData(
        editData.map((item) => ({
          ...item,
          value: Number(item.value),
        })),
      );

      setEditing(false);
    } catch (error) {
      console.error("Save failed:", error);

      // Keep edit mode open if API fails
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // CANCEL
  // ==============================
  const handleCancel = () => {
    setEditData(
      revaluationData.map((item) => ({
        ...item,
      })),
    );

    setEditing(false);
  };

  return (
    <Card>
      <SectionHeader
        title='Revaluation Period'
        subtitle='Set the review frequency based on vendor risk level.'
        icon={<ScheduleOutlinedIcon sx={{ fontSize: 18 }} />}
        editing={editing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <Divider />

      <Table
        size='small'
        sx={{
          "& .MuiTableCell-root": {
            height: 48,
          },

          "& tbody tr:last-child td": {
            borderBottom: "none",
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F8FAFC",
            }}
          >
            <TableCell
              sx={{
                ...bodyCellStyle,
                fontWeight: 600,
              }}
            >
              Risk Level
            </TableCell>

            <TableCell
              sx={{
                ...bodyCellStyle,
                fontWeight: 600,
              }}
            >
              Review Frequency
            </TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell align='center' colSpan={2}>
                {" "}
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {editData.map((item, index) => (
              <TableRow key={item.risk_level || index}>
                {/* Risk Level */}
                <TableCell sx={bodyCellStyle}>
                  <RiskChip risk={item.risk_level} />
                </TableCell>

                {/* Review Frequency */}
                <TableCell
                  sx={{
                    ...bodyCellStyle,
                    fontSize: 12,
                  }}
                >
                  {editing ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        maxWidth: 320,
                      }}
                    >
                      {/* VALUE */}
                      <TextField
                        type='number'
                        value={item.value ?? ""}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        size='small'
                        disabled={saving}
                        inputProps={{
                          min: 0.5,
                          step: 0.5,
                        }}
                        sx={{
                          width: 70,

                          "& .MuiOutlinedInput-root": {
                            height: 34,
                            fontSize: 13,
                          },

                          "& input": {
                            textAlign: "center",
                            padding: "8px 6px",
                          },

                          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                            {
                              WebkitAppearance: "none",
                              margin: 0,
                            },

                          "& input[type=number]": {
                            MozAppearance: "textfield",
                          },
                        }}
                      />

                      {/* UNIT */}
                      <TextField
                        select
                        value={item.unit ?? ""}
                        onChange={(e) =>
                          handleUnitChange(index, e.target.value)
                        }
                        size='small'
                        disabled={saving}
                        sx={{
                          width: 220,

                          "& .MuiOutlinedInput-root": {
                            height: 34,
                            fontSize: 13,
                          },

                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            padding: "6px 12px",
                          },
                        }}
                      >
                        <MenuItem value='Months'>Months</MenuItem>

                        <MenuItem value='Years'>Years</MenuItem>
                      </TextField>
                    </Box>
                  ) : (
                    `${item.value} ${item.unit}`
                  )}
                </TableCell>
              </TableRow>
            ))}

            {editData.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align='center'>
                  No revaluation periods configured.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </Card>
  );
}

/* =========================================================
   EMAIL RECIPIENTS
========================================================= */

function EmailRecipients({ settingGetAll }) {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const [recipients, setRecipients] = useState([]);
  const [editRecipients, setEditRecipients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newRecipient, setNewRecipient] = useState({
    displayname: "",
    emailaddress: "",
  });

  // ==========================================
  // LOAD RECIPIENTS
  // ==========================================
  useEffect(() => {
    const emailRecipients = settingGetAll?.data?.email_recipients;

    if (Array.isArray(emailRecipients)) {
      const copiedRecipients = emailRecipients.map((item) => ({
        ...item,
      }));

      setRecipients(copiedRecipients);
      setEditRecipients(copiedRecipients);
    }
  }, [settingGetAll]);

  // ==========================================
  // EDIT
  // ==========================================
  const handleEdit = () => {
    setEditRecipients(
      recipients.map((item) => ({
        ...item,
      })),
    );

    setEditing(true);
  };

  // ==========================================
  // CHANGE EXISTING RECIPIENT
  // ==========================================
  const handleChange = (index, field, value) => {
    setEditRecipients((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  // ==========================================
  // SAVE EDITED RECIPIENTS
  // ==========================================
  const handleSave = async () => {
    try {
      setSaving(true);

      for (const recipient of editRecipients) {
        await EmailRecipientEdit(recipient);
      }

      setRecipients(
        editRecipients.map((item) => ({
          ...item,
        })),
      );

      setEditing(false);
    } catch (error) {
      console.error("Failed to save recipient changes:", error);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setEditRecipients(
      recipients.map((item) => ({
        ...item,
      })),
    );

    setEditing(false);
  };

  // ==========================================
  // OPEN ADD RECIPIENT FORM
  // ==========================================
  const handleOpenAdd = () => {
    setNewRecipient({
      displayname: "",
      emailaddress: "",
    });

    setAdding(true);
  };

  // ==========================================
  // ADD RECIPIENT API
  // ==========================================
  const EmailRecipientAdd = async () => {
    try {
      const payload = {
        display_name: newRecipient.displayname.trim(),
        email_address: newRecipient.emailaddress.trim(),
        created_by: sessionStorage.getItem("UserId"),
      };

      console.log("Recipient Add Payload:", payload);

      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/settings/recipients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        setLoading(true),
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);

        throw new Error(data?.detail || "Failed to add email recipient");
      }

      console.log("Recipient added successfully:", data);

      return data;
    } catch (error) {
      console.error("Failed to add email recipient:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };
  // ==========================================
  // EDIT RECIPIENT API
  // ==========================================
  const EmailRecipientEdit = async (recipient) => {
    try {
      const payload = {
        cc_master_id: recipient.ccmasterid,
        display_name: recipient.displayname.trim(),
        email_address: recipient.emailaddress.trim(),
        modified_by: sessionStorage.getItem("UserId"),
      };

      console.log("Recipient Edit Payload:", payload);

      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/settings/recipients/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        setLoading(true),
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);

        throw new Error(data?.detail || "Failed to edit email recipient");
      }

      console.log("Recipient edited successfully:", data);

      return data;
    } catch (error) {
      console.error("Failed to edit email recipient:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };
  // ==========================================
  // REMOVE RECIPIENT API
  // ==========================================
  const EmailRecipientRemove = async (recipient) => {
    try {
      const payload = {
        cc_master_id: recipient.ccmasterid,
        modified_by: sessionStorage.getItem("UserId"),
      };

      console.log("Remove Recipient Payload:", payload);

      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/settings/recipients/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        setLoading(true),
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Failed to remove email recipient");
      }

      console.log("Recipient removed successfully:", data);

      return data;
    } catch (error) {
      console.error("Failed to remove recipient:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // ==========================================
  // ADD RECIPIENT
  // ==========================================
  const handleAddRecipient = async () => {
    if (!newRecipient.displayname.trim() || !newRecipient.emailaddress.trim()) {
      return;
    }

    try {
      setSaving(true);

      const responseData = await EmailRecipientAdd();

      console.log(responseData);

      /*
        If API returns the newly created recipient,
        use the API response.

        Otherwise use the values entered by the user.
      */

      const recipient = {
        ccmasterid:
          responseData?.ccmasterid ?? responseData?.data?.ccmasterid ?? null,

        displayname:
          responseData?.data?.displayname ?? newRecipient.displayname.trim(),

        emailaddress:
          responseData?.data?.emailaddress ?? newRecipient.emailaddress.trim(),
      };

      // update normal list
      setRecipients((prev) => [...prev, recipient]);

      // update edit list also
      setEditRecipients((prev) => [...prev, recipient]);

      // clear form
      setNewRecipient({
        displayname: "",
        emailaddress: "",
      });

      setAdding(false);
    } catch (error) {
      console.error("Add recipient failed:", error);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL ADD
  // ==========================================
  const handleCancelAdd = () => {
    setNewRecipient({
      displayname: "",
      emailaddress: "",
    });

    setAdding(false);
  };

  // ==========================================
  // REMOVE FROM EDIT LIST
  // ==========================================
  const handleRemoveRecipient = async (index) => {
    try {
      const recipient = editRecipients[index];

      if (!recipient) {
        return;
      }

      await EmailRecipientRemove(recipient);

      setEditRecipients((prev) => prev.filter((_, i) => i !== index));

      setRecipients((prev) =>
        prev.filter((item) => item.ccmasterid !== recipient.ccmasterid),
      );
    } catch (error) {
      console.error("Remove recipient failed:", error);
    }
  };

  return (
    <Card>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EFF6FF",
              color: "#2563EB",
            }}
          >
            <GroupsOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#172033",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Email Notification Recipients
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                fontSize: 11,
                color: "#64748B",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              People who receive vendor revaluation notifications.
            </Typography>
          </Box>
        </Box>

        {/* ================= HEADER ACTIONS ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {!editing && (
            <Button
              onClick={handleOpenAdd}
              disabled={adding}
              sx={{
                minWidth: "auto",
                px: 1.25,
                color: "#2563EB",
                textTransform: "none",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
                borderRadius: "7px",

                "&:hover": {
                  backgroundColor: "#EFF6FF",
                },
              }}
            >
              + Add Recipient
            </Button>
          )}

          {!editing ? (
            <Button
              variant='text'
              startIcon={<EditOutlinedIcon sx={{ fontSize: 15 }} />}
              onClick={handleEdit}
              sx={{
                minWidth: "auto",
                px: 1,
                color: "#2563EB",
                textTransform: "none",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Edit
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                onClick={handleCancel}
                startIcon={<CloseOutlinedIcon sx={{ fontSize: 15 }} />}
                sx={{
                  minWidth: "auto",
                  px: 1,
                  color: "#64748B",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                startIcon={<CheckIcon sx={{ fontSize: 15 }} />}
                sx={{
                  minWidth: "auto",
                  px: 1,
                  color: "#2563EB",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* ================= ADD RECIPIENT ================= */}
      {adding && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Typography
            sx={{
              mb: 1.25,
              fontSize: 12,
              fontWeight: 600,
              color: "#172033",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Add Recipient
          </Typography>

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1.3fr auto",
              },

              gap: 1,
              alignItems: "center",
            }}
          >
            {/* NAME */}
            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                },
              }}
              value={newRecipient.displayname}
              onChange={(e) =>
                setNewRecipient((prev) => ({
                  ...prev,
                  displayname: e.target.value,
                }))
              }
              placeholder='Enter name'
              size='small'
              fullWidth
              disabled={saving}
            />

            {/* EMAIL */}
            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                },
              }}
              value={newRecipient.emailaddress}
              onChange={(e) =>
                setNewRecipient((prev) => ({
                  ...prev,
                  emailaddress: e.target.value,
                }))
              }
              placeholder='Enter email address'
              type='email'
              size='small'
              fullWidth
              disabled={saving}
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                variant='outlined'
                onClick={handleCancelAdd}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                variant='contained'
                onClick={handleAddRecipient}
                disabled={
                  saving ||
                  !newRecipient.displayname.trim() ||
                  !newRecipient.emailaddress.trim()
                }
              >
                {saving ? "Adding..." : "Add"}
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* ================= TABLE ================= */}
      <Table size='small'>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
            <TableCell
              sx={{
                ...bodyCellStyle,
                width: "35%",
                fontWeight: 600,
              }}
            >
              Name
            </TableCell>

            <TableCell
              sx={{
                ...bodyCellStyle,
                fontWeight: 600,
              }}
            >
              Email Address
            </TableCell>

            {editing && (
              <TableCell
                sx={{
                  ...bodyCellStyle,
                  width: 70,
                }}
              />
            )}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell align='center' colSpan={2}>
                {" "}
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {editRecipients.map((recipient, index) => (
              <TableRow
                key={
                  recipient.ccmasterid ?? `${recipient.emailaddress}-${index}`
                }
              >
                {/* NAME */}
                <TableCell sx={bodyCellStyle}>
                  {editing ? (
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                        },
                      }}
                      value={recipient.displayname ?? ""}
                      onChange={(e) =>
                        handleChange(index, "displayname", e.target.value)
                      }
                      size='small'
                      fullWidth
                    />
                  ) : (
                    <Typography sx={{ fontSize: 12, fontFamily: "Poppins" }}>
                      {recipient.displayname || "-"}
                    </Typography>
                  )}
                </TableCell>

                {/* EMAIL */}
                <TableCell sx={bodyCellStyle}>
                  {editing ? (
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                        },
                      }}
                      type='email'
                      value={recipient.emailaddress ?? ""}
                      onChange={(e) =>
                        handleChange(index, "emailaddress", e.target.value)
                      }
                      size='small'
                      fullWidth
                    />
                  ) : (
                    <Typography sx={{ fontSize: 12, fontFamily: "Poppins" }}>
                      {recipient.emailaddress || "-"}
                    </Typography>
                  )}
                </TableCell>

                {/* DELETE */}
                {editing && (
                  <TableCell
                    sx={{
                      ...bodyCellStyle,
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      size='small'
                      onClick={() => handleRemoveRecipient(index)}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {editRecipients.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={editing ? 3 : 2}
                  sx={{
                    textAlign: "center",
                    py: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#94A3B8",
                    }}
                  >
                    No email recipients configured.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </Card>
  );
}
/* =========================================================
   NOTIFICATION SETTINGS
========================================================= */

function NotificationSettings({ settingGetAll }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notificationData, setNotificationData] = useState([]);
  const [editData, setEditData] = useState([]);

  // ==========================================
  // LOAD NOTIFICATION SETTINGS
  // ==========================================
  useEffect(() => {
    const notificationSetting = settingGetAll?.data?.notification_settings;

    if (Array.isArray(notificationSetting)) {
      const copiedData = notificationSetting.map((item) => ({
        ...item,
      }));

      setNotificationData(copiedData);
      setEditData(copiedData);
    }
  }, [settingGetAll]);

  // ==========================================
  // EDIT NOTIFICATION API
  // ==========================================
  const NotificationEdit = async () => {
    try {
      const payload = {
        settings: editData.map((item) => ({
          notification_type: item.notificationtype,
          notify_before_value: Number(item.notifybeforevalue),
          notify_before_unit: "Months",
        })),

        modified_by: sessionStorage.getItem("UserId"),
      };

      console.log("Notification Payload:", payload);

      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/settings/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        setLoading(true),
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);

        throw new Error(
          data?.detail || "Failed to update notification settings",
        );
      }

      console.log("Notification updated successfully:", data);

      return data;
    } catch (error) {
      console.error("Failed to edit notification:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EDIT
  // ==========================================
  const handleEdit = () => {
    setEditData(
      notificationData.map((item) => ({
        ...item,
      })),
    );

    setEditing(true);
  };

  // ==========================================
  // CHANGE NOTIFY BEFORE VALUE
  // ==========================================
  const handleChange = (index, value) => {
    setEditData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              notifybeforevalue: value,
            }
          : item,
      ),
    );
  };

  // ==========================================
  // SAVE
  // ==========================================
  const handleSave = async () => {
    try {
      setSaving(true);

      await NotificationEdit();

      // Update frontend only after API success
      setNotificationData(
        editData.map((item) => ({
          ...item,
          notifybeforevalue: Number(item.notifybeforevalue),
        })),
      );

      setEditData(
        editData.map((item) => ({
          ...item,
          notifybeforevalue: Number(item.notifybeforevalue),
        })),
      );

      setEditing(false);
    } catch (error) {
      console.error("Save failed:", error);

      // stay in edit mode if API fails
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL
  // ==========================================
  const handleCancel = () => {
    setEditData(
      notificationData.map((item) => ({
        ...item,
      })),
    );

    setEditing(false);
  };

  return (
    <Card>
      <SectionHeader
        title='Notification Settings'
        subtitle='Configure when reminders should be sent.'
        icon={
          <NotificationsNoneOutlinedIcon
            sx={{
              fontSize: 18,
            }}
          />
        }
        editing={editing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <Divider />

      <Table
        size='small'
        sx={{
          "& .MuiTableCell-root": {
            height: 52,
          },

          "& tbody tr:last-child td": {
            borderBottom: "none",
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F8FAFC",
            }}
          >
            <TableCell
              sx={{
                ...bodyCellStyle,
                width: "60%",
                fontWeight: 600,
              }}
            >
              Notification
            </TableCell>

            <TableCell
              sx={{
                ...bodyCellStyle,
                fontWeight: 600,
              }}
            >
              Notify Before
            </TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell align='center' colSpan={2}>
                {" "}
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {editData.map((item, index) => (
              <TableRow key={item.notificationsettingid ?? index}>
                {/* NOTIFICATION TYPE */}
                <TableCell
                  sx={{
                    ...bodyCellStyle,
                    fontSize: 12,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {item.notificationtype}
                  </Typography>
                </TableCell>

                {/* NOTIFY BEFORE */}
                <TableCell
                  sx={{
                    ...bodyCellStyle,
                    fontSize: 12,
                  }}
                >
                  {editing ? (
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <TextField
                        type='number'
                        value={item.notifybeforevalue ?? ""}
                        onChange={(e) => handleChange(index, e.target.value)}
                        variant='outlined'
                        size='small'
                        disabled={saving}
                        inputProps={{
                          min: 0,
                        }}
                        fullWidth
                        sx={{
                          maxWidth: 180,
                          ...inputStyle,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 12,
                        }}
                      >
                        Months
                      </Typography>
                    </Grid>
                  ) : (
                    <Chip
                      label={`${item.notifybeforevalue} Months`}
                      size='small'
                      sx={{
                        height: 25,
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#475569",
                        backgroundColor: "#F1F5F9",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}

            {editData.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align='center'>
                  No notification settings configured.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </Card>
  );
}

/* =========================================================
   EMAIL TEMPLATE
========================================================= */

function EmailTemplate({ settingGetAll }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [templateData, setTemplateData] = useState({});
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ==========================================
  // LOAD EMAIL TEMPLATE
  // ==========================================
  useEffect(() => {
    const template = settingGetAll?.data?.email_template;

    if (template && typeof template === "object") {
      setTemplateData({
        ...template,
      });

      setEditData({
        ...template,
      });
    }
  }, [settingGetAll]);

  // ==========================================
  // EMAIL TEMPLATE EDIT API
  // ==========================================
  const EmailTemplateEdit = async () => {
    try {
      const payload = {
        template_id: editData.templateid,
        subject: editData.subject?.trim() || "",
        email_body: editData.emailbody?.trim() || "",
        modified_by: sessionStorage.getItem("UserId"),
      };

      console.log("Email Template Payload:", payload);

      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/settings/email-template",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        setLoading(true),
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);

        throw new Error(
          data?.detail || "Failed to update email template settings",
        );
      }

      console.log("Email template updated successfully:", data);

      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EDIT
  // ==========================================
  const handleEdit = () => {
    setEditData({
      ...templateData,
    });

    setEditing(true);
  };

  // ==========================================
  // SAVE
  // ==========================================
  const handleSave = async () => {
    try {
      setSaving(true);

      await EmailTemplateEdit();

      // Update frontend only after API success
      setTemplateData({
        ...editData,
      });

      setEditing(false);
    } catch (error) {
      console.error("Save failed:", error);

      // Keep edit mode open if API fails
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL
  // ==========================================
  const handleCancel = () => {
    setEditData({
      ...templateData,
    });

    setEditing(false);
  };

  return (
    <Card
      sx={{
        gridColumn: {
          xs: "auto",
          md: "1 / -1",
        },
      }}
    >
      <SectionHeader
        title='Email Template'
        subtitle='Customize the email sent to vendors during revaluation.'
        icon={<MailOutlineIcon sx={{ fontSize: 18 }} />}
        editing={editing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <Divider />
      {loading ? (
        <Box
          sx={{
            px: 1.5,
            py: 1.1,
            borderRadius: "8px",
            border: `1px solid ${COLORS.border}`,
            backgroundColor: "#F8FAFC",
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ p: 2.5 }}>
          {/* SUBJECT */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                mb: 0.75,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.text,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Subject
            </Typography>

            {/* {editing ? (
              <TextField
                value={editData.subject ?? ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                size="small"
                fullWidth
                disabled={saving}
                sx={{
                  ...inputStyle,
                  "& .MuiInputBase-root": {
                    fontSize: 12,
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
              />
            ) : ( */}
            <Box
              sx={{
                px: 1.5,
                py: 1.1,
                borderRadius: "8px",
                border: `1px solid ${COLORS.border}`,
                backgroundColor: "#F8FAFC",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: COLORS.text,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {templateData.subject ?? "-"}
              </Typography>
            </Box>
            {/* )} */}
          </Box>

          {/* EMAIL CONTENT */}
          <Box>
            <Typography
              sx={{
                mb: 0.75,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.text,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Email Content
            </Typography>

            <Box
              sx={{
                border: `1px solid ${COLORS.border}`,
                borderRadius: "8px",
                backgroundColor: "#FAFBFC",
                px: 2,
                py: 1.75,
              }}
            >
              <Box sx={{ my: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

                    lineHeight: 1.7,

                    color: "#334155",

                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Dear [Vendor Name],
                </Typography>
                <Box
                  sx={{
                    my: {
                      xs: 1,
                      sm: 1.5,
                    },
                  }}
                >
                  {editing ? (
                    <TextField
                      value={editData.emailbody ?? ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          emailbody: e.target.value,
                        }))
                      }
                      multiline
                      minRows={5}
                      fullWidth
                      variant='outlined'
                      disabled={saving}
                      sx={{
                        ...inputStyle,

                        "& .MuiInputBase-root": {
                          alignItems: "flex-start",
                          fontSize: 12,
                          lineHeight: 1.7,
                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: 1.7,
                        color: "#334155",
                        whiteSpace: "pre-line",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {templateData.emailbody ?? "-"}
                    </Typography>
                  )}
                </Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

                    lineHeight: 1.7,

                    color: "#334155",

                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  [Document Upload Link]
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,

                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

                    lineHeight: 1.7,

                    color: "#334155",

                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  If you have any questions, please contact us.
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,

                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

                    lineHeight: 1.7,

                    color: "#334155",

                    whiteSpace: "pre-line",

                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Regards,{"\n"}
                  [Company Name]
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
}
/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function RevaluationSetting({ onClose }) {
  const [settingGetAll, setSettingGetAll] = useState(null);

  const getSetting = async () => {
    try {
      const response = await fetch(
        "http://10.10.0.115:8095/vendor-reevaluation/settings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      setSettingGetAll(data);
      return data;
    } catch (error) {
      console.error("Failed to get settings:", error);
      throw error;
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        width: {
          xs: "calc(100% - 20px)",
          sm: "calc(100% - 32px)",
          md: "calc(100% - 64px)",
        },

        maxWidth: 1120,

        height: {
          xs: "calc(100vh - 20px)",
          sm: "calc(100vh - 32px)",
          md: "calc(100vh - 64px)",
        },

        maxHeight: 900,

        backgroundColor: COLORS.white,
        borderRadius: {
          xs: "12px",
          md: "16px",
        },

        outline: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",

        boxShadow: "0 24px 70px rgba(15, 23, 42, 0.20)",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          flexShrink: 0,
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          py: {
            xs: 2,
            md: 2.5,
          },

          borderBottom: `1px solid ${COLORS.border}`,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primaryLight,
                  color: COLORS.primary,
                }}
              >
                <ScheduleOutlinedIcon sx={{ fontSize: 21 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 18,
                      md: 20,
                    },
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: COLORS.text,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Vendor Revaluation Settings
                </Typography>

                <Typography
                  sx={{
                    mt: 0.35,
                    fontSize: 11.5,
                    color: COLORS.secondaryText,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Manage review intervals, notifications and email
                  communication.
                </Typography>
              </Box>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            aria-label='Close'
            sx={{
              width: 34,
              height: 34,
              color: "#64748B",
              borderRadius: "8px",

              "&:hover": {
                backgroundColor: "#F1F5F9",
                color: COLORS.text,
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Box>
      </Box>

      {/* =====================================================
          SCROLLABLE BODY
      ===================================================== */}

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",

          px: {
            xs: 1.25,
            sm: 2,
            md: 3,
          },

          py: {
            xs: 1.5,
            md: 2.5,
          },

          backgroundColor: COLORS.background,

          "&::-webkit-scrollbar": {
            width: 7,
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#CBD5E1",
            borderRadius: 10,
          },

          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E1 transparent",
        }}
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },

            gap: {
              xs: 1.5,
              md: 2,
            },

            maxWidth: 1050,
            mx: "auto",
          }}
        >
          <RevaluationPeriod settingGetAll={settingGetAll} />

          <EmailRecipients settingGetAll={settingGetAll} />

          <NotificationSettings settingGetAll={settingGetAll} />

          <EmailTemplate settingGetAll={settingGetAll} />
        </Box>
      </Box>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Box
        sx={{
          flexShrink: 0,
          px: {
            xs: 2,
            md: 3,
          },
          py: 1.25,

          borderTop: `1px solid ${COLORS.border}`,
          backgroundColor: "#FFFFFF",

          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          sx={{
            fontSize: 10.5,
            color: "#94A3B8",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Vendor configuration settings
        </Typography>
      </Box>
    </Box>
  );
}
