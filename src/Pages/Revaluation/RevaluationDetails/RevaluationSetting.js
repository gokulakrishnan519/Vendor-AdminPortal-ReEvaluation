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
          variant="text"
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
      size="small"
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

  useEffect(() => {
    const periods = settingGetAll?.data?.reevaluation_periods;

    if (Array.isArray(periods)) {
      setRevaluationData(periods);
      setEditData(periods.map((item) => ({ ...item })));
    }
  }, [settingGetAll]);

  const handleEdit = () => {
    setEditData(revaluationData.map((item) => ({ ...item })));
    setEditing(true);
  };

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

  const handleSave = () => {
    setRevaluationData(editData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditData(revaluationData.map((item) => ({ ...item })));
    setEditing(false);
  };

  return (
    <Card>
      <SectionHeader
        title="Revaluation Period"
        subtitle="Set the review frequency based on vendor risk level."
        icon={<ScheduleOutlinedIcon sx={{ fontSize: 18 }} />}
        editing={editing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <Divider />

      <Table
        size="small"
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
          <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
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

        <TableBody>
          {editData.map((item, index) => (
            <TableRow key={item.risk_level || index}>
              <TableCell sx={bodyCellStyle}>
                <RiskChip risk={item.risk_level} />
              </TableCell>

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
                    <TextField
                      type="number"
                      value={item.value ?? ""}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      size="small"
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

                    <TextField
                      select
                      value={item.unit ?? ""}
                      onChange={(e) => handleUnitChange(index, e.target.value)}
                      size="small"
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
                      <MenuItem value="Months">Months</MenuItem>
                      <MenuItem value="Years">Years</MenuItem>
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
              <TableCell colSpan={2} align="center">
                No revaluation periods configured.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
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

  const [recipients, setRecipients] = useState([
    { name: "Senthil", email: "senthil@hiq.com" },
    { name: "Rajesh", email: "rajesh@hiq.com" },
    { name: "Kannan", email: "kannan@hiq.com" },
    { name: "Veena", email: "veena@hiq.com" },
    { name: "Ranganathan", email: "ranganathan@hiq.com" },
  ]);

  const [editRecipients, setEditRecipients] = useState(recipients);

  const [newRecipient, setNewRecipient] = useState({
    name: "",
    email: "",
  });

  // Edit
  const handleEdit = () => {
    setEditRecipients(recipients);
    setEditing(true);
  };

  const handleChange = (index, field, value) => {
    setEditRecipients((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleSave = () => {
    setRecipients(editRecipients);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditRecipients(recipients);
    setEditing(false);
  };

  // Add recipient
  const handleAddRecipient = () => {
    if (!newRecipient.name.trim() || !newRecipient.email.trim()) {
      return;
    }

    const recipient = {
      name: newRecipient.name.trim(),
      email: newRecipient.email.trim(),
    };

    setRecipients((prev) => [...prev, recipient]);

    setEditRecipients((prev) => [...prev, recipient]);

    setNewRecipient({
      name: "",
      email: "",
    });

    setAdding(false);
  };

  // Cancel add recipient
  const handleCancelAdd = () => {
    setNewRecipient({
      name: "",
      email: "",
    });

    setAdding(false);
  };

  // Remove recipient
  const handleRemoveRecipient = (index) => {
    setEditRecipients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      {/* HEADER */}
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

        {/* HEADER ACTIONS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* ADD RECIPIENT */}
          {!editing && (
            <Button
              onClick={() => {
                setNewRecipient({
                  name: "",
                  email: "",
                });
                setAdding(true);
              }}
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

          {/* EDIT */}
          {!editing ? (
            <Button
              variant="text"
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
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#EFF6FF",
                },
                "& .MuiButton-startIcon": {
                  marginRight: "4px",
                },
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
                  fontFamily: "Poppins, sans-serif",
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
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* ADD RECIPIENT FORM */}
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
              value={newRecipient.name}
              onChange={(e) =>
                setNewRecipient((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Enter name"
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,

                  "& fieldset": {
                    borderColor: "#CBD5E1",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#2563EB",
                  },
                },
              }}
            />

            {/* EMAIL */}
            <TextField
              value={newRecipient.email}
              onChange={(e) =>
                setNewRecipient((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Enter email address"
              type="email"
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,

                  "& fieldset": {
                    borderColor: "#CBD5E1",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#2563EB",
                  },
                },
              }}
            />

            {/* ACTION BUTTONS */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              {/* CANCEL */}
              <Button
                variant="outlined"
                onClick={handleCancelAdd}
                sx={{
                  minWidth: 70,
                  height: 38,
                  borderRadius: "8px",
                  borderColor: "#CBD5E1",
                  color: "#64748B",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Poppins, sans-serif",
                  boxShadow: "none",

                  "&:hover": {
                    borderColor: "#94A3B8",
                    backgroundColor: "#F8FAFC",
                  },
                }}
              >
                Cancel
              </Button>

              {/* ADD */}
              <Button
                variant="contained"
                onClick={handleAddRecipient}
                disabled={
                  !newRecipient.name.trim() || !newRecipient.email.trim()
                }
                sx={{
                  minWidth: 70,
                  height: 38,
                  borderRadius: "8px",
                  backgroundColor: "#2563EB",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "Poppins, sans-serif",
                  boxShadow: "none",

                  "&:hover": {
                    backgroundColor: "#1D4ED8",
                    boxShadow: "none",
                  },
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* TABLE */}
      <Table
        size="small"
        sx={{
          "& .MuiTableCell-root": {
            height: 48,
            borderBottom: "1px solid #E2E8F0",
          },

          "& tbody tr:last-child td": {
            borderBottom: "none",
          },
        }}
      >
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F8FAFC",
            }}
          >
            <TableCell
              sx={{
                ...bodyCellStyle,
                width: "35%",
                fontWeight: 600,
                color: "#475569",
              }}
            >
              Name
            </TableCell>

            <TableCell
              sx={{
                ...bodyCellStyle,
                fontWeight: 600,
                color: "#475569",
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

        {/* TABLE BODY */}
        <TableBody>
          {editRecipients.map((recipient, index) => (
            <TableRow
              key={`${recipient.email}-${index}`}
              sx={{
                "&:hover": {
                  backgroundColor: "#FAFBFC",
                },
              }}
            >
              {/* NAME */}
              <TableCell
                sx={{
                  ...bodyCellStyle,
                  fontSize: 12,
                }}
              >
                {editing ? (
                  <TextField
                    value={recipient.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 34,
                        borderRadius: "7px",
                        fontSize: 12,
                        fontFamily: "Poppins, sans-serif",
                      },
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#172033",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {recipient.name}
                  </Typography>
                )}
              </TableCell>

              {/* EMAIL */}
              <TableCell
                sx={{
                  ...bodyCellStyle,
                  fontSize: 12,
                }}
              >
                {editing ? (
                  <TextField
                    value={recipient.email}
                    onChange={(e) =>
                      handleChange(index, "email", e.target.value)
                    }
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 34,
                        borderRadius: "7px",
                        fontSize: 12,
                        fontFamily: "Poppins, sans-serif",
                      },
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#64748B",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {recipient.email}
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
                    size="small"
                    onClick={() => handleRemoveRecipient(index)}
                    sx={{
                      width: 30,
                      height: 30,
                      color: "#94A3B8",
                      borderRadius: "6px",

                      "&:hover": {
                        color: "#DC2626",
                        backgroundColor: "#FEF2F2",
                      },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}

          {/* EMPTY STATE */}
          {editRecipients.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={editing ? 3 : 2}
                sx={{
                  borderBottom: "none",
                  textAlign: "center",
                  py: 4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#94A3B8",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  No email recipients configured.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

/* =========================================================
   NOTIFICATION SETTINGS
========================================================= */

function NotificationSettings() {
  const [editing, setEditing] = useState(false);

  const [notificationData, setNotificationData] = useState([
    {
      notification: "Revaluation Due",
      notifyBefore: "1",
    },
    {
      notification: "Document Expiry",
      notifyBefore: "1",
    },
  ]);

  const [editData, setEditData] = useState(notificationData);

  const handleEdit = () => {
    setEditData(notificationData);
    setEditing(true);
  };

  const handleChange = (index, value) => {
    setEditData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              notifyBefore: value,
            }
          : item,
      ),
    );
  };

  const handleSave = () => {
    setNotificationData(editData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditData(notificationData);
    setEditing(false);
  };

  return (
    <Card>
      <SectionHeader
        title="Notification Settings"
        subtitle="Configure when reminders should be sent."
        icon={<NotificationsNoneOutlinedIcon sx={{ fontSize: 18 }} />}
        editing={editing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <Divider />

      <Table
        size="small"
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
          <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
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

        <TableBody>
          {editData.map((item, index) => (
            <TableRow key={item.notification}>
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
                  {item.notification}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  ...bodyCellStyle,
                  fontSize: 12,
                }}
              >
                {editing ? (
                  <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                      value={item.notifyBefore}
                      onChange={(e) => handleChange(index, e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        maxWidth: 180,
                        ...inputStyle,
                      }}
                    />
                    <Grid>Month</Grid>
                  </Grid>
                ) : (
                  <Chip
                    label={item.notifyBefore + "  Month"}
                    size="small"
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
        </TableBody>
      </Table>
    </Card>
  );
}

/* =========================================================
   EMAIL TEMPLATE
========================================================= */

function EmailTemplate() {
  const [editing, setEditing] = useState(false);

  const [templateData, setTemplateData] = useState({
    subject: "Vendor Revaluation Request – [Vendor Name]",

    message:
      "We are conducting a periodic revaluation of your vendor profile. Please review and provide the required information and documents through Vendor Revaluation Form.",
  });

  const [editData, setEditData] = useState(templateData);

  const handleEdit = () => {
    setEditData(templateData);
    setEditing(true);
  };

  const handleSave = () => {
    setTemplateData(editData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditData(templateData);
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
        title="Email Template"
        subtitle="Customize the email sent to vendors during revaluation."
        icon={<MailOutlineIcon sx={{ fontSize: 18 }} />}
        editing={editing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <Divider />

      <Box sx={{ p: 2.5 }}>
        {/* SUBJECT - NOT EDITABLE */}
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
              {templateData.subject}
            </Typography>
          </Box>
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
            {/* FIXED CONTENT */}
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: 1.7,
                color: "#334155",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Dear [Vendor Name],
            </Typography>

            <Box sx={{ my: 1.5 }}>
              {editing ? (
                <TextField
                  value={editData.message}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  multiline
                  minRows={3}
                  fullWidth
                  variant="outlined"
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
                  {templateData.message}
                </Typography>
              )}
            </Box>

            {/* FIXED CONTENT */}
            <Typography
              sx={{
                fontSize: 12,
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
                fontSize: 12,
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
                fontSize: 12,
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
        "http://10.10.0.115:8080/vendor-reevaluation/settings",
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
            aria-label="Close"
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
