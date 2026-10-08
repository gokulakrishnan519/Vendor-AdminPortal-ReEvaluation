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
  Critical: {
    color: "#C81E5B",
    backgroundColor: "#FFF0F5",
    borderColor: "#F9C7D9",
  },

  High: {
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },

  Elevated: {
    color: "#EA580C",
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
  },

  Medium: {
    color: "#D97706",
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },

  Low: {
    color: "#059669",
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
};

/* =========================================================
   COMMON STYLES
========================================================= */

const bodyCellStyle = {
  fontSize: {
    xs: 11,
    sm: 12,
    md: 13,
  },

  color: COLORS.text,
  fontFamily: "Poppins, sans-serif",
  borderBottom: `1px solid ${COLORS.border}`,

  px: {
    xs: 1,
    sm: 1.5,
    md: 2,
  },
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontFamily: "Poppins, sans-serif",

    fontSize: {
      xs: 11,
      sm: 12,
      md: 13,
    },

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
        width: "100%",
        height: "100%",

        backgroundColor: COLORS.white,

        border: `1px solid ${COLORS.border}`,

        borderRadius: {
          xs: "8px",
          sm: "10px",
          md: "12px",
        },

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
        px: {
          xs: 1.5,
          sm: 2,
          md: 2.5,
        },

        py: {
          xs: 1.5,
          sm: 1.75,
          md: 2,
        },

        display: "flex",

        flexDirection: {
          xs: "column",
          sm: "row",
        },

        alignItems: {
          xs: "stretch",
          sm: "center",
        },

        justifyContent: "space-between",

        gap: {
          xs: 1,
          sm: 2,
        },
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          gap: {
            xs: 1,
            sm: 1.25,
          },
        }}
      >
        {icon && (
          <Box
            sx={{
              width: {
                xs: 30,
                sm: 34,
              },

              height: {
                xs: 30,
                sm: 34,
              },

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
              fontSize: {
                xs: 12,
                sm: 13,
                md: 14,
              },

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

                fontSize: {
                  xs: 10,
                  sm: 11,
                },

                color: COLORS.secondaryText,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* ACTIONS */}
      {!editing ? (
        <Button
          variant='text'
          startIcon={<EditOutlinedIcon sx={{ fontSize: 15 }} />}
          onClick={onEdit}
          sx={{
            alignSelf: {
              xs: "flex-end",
              sm: "center",
            },

            minWidth: "auto",

            px: 1,

            color: COLORS.primary,
            textTransform: "none",

            fontSize: {
              xs: 11,
              sm: 12,
            },

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
        <Box
          sx={{
            display: "flex",

            justifyContent: {
              xs: "flex-end",
              sm: "initial",
            },

            gap: 1,
          }}
        >
          <Button
            onClick={onCancel}
            startIcon={<CloseOutlinedIcon sx={{ fontSize: 15 }} />}
            sx={{
              minWidth: "auto",

              px: {
                xs: 0.75,
                sm: 1.25,
              },

              color: COLORS.secondaryText,
              textTransform: "none",

              fontSize: {
                xs: 11,
                sm: 12,
              },

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

              px: {
                xs: 0.75,
                sm: 1.25,
              },

              color: COLORS.primary,
              textTransform: "none",

              fontSize: {
                xs: 11,
                sm: 12,
              },

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

  if (!style) return null;

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
        height: {
          xs: 24,
          sm: 27,
        },

        minWidth: {
          xs: 85,
          sm: 100,
        },

        justifyContent: "flex-start",

        border: `1px solid ${style.borderColor}`,

        color: style.color,
        backgroundColor: style.backgroundColor,

        fontSize: {
          xs: 10,
          sm: 11,
        },

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
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "Poppins, sans-serif" }}
                    >
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
                    <Typography
                      sx={{ fontSize: 12, fontFamily: "Poppins, sans-serif" }}
                    >
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

export default function ConfirmRequstRevaluation({ onClose, allSelected }) {
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
          xs: "calc(100% - 16px)",
          sm: "calc(100% - 32px)",
          md: "calc(100% - 64px)",
          lg: "calc(100% - 100px)",
        },

        maxWidth: {
          xs: "100%",
          sm: 900,
          md: 1120,
          lg: 1200,
        },

        height: {
          xs: "calc(100vh - 16px)",
          sm: "calc(100vh - 32px)",
          md: "calc(100vh - 64px)",
        },

        maxHeight: {
          xs: "100vh",
          sm: 900,
        },

        backgroundColor: COLORS.white,

        borderRadius: {
          xs: "10px",
          sm: "12px",
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
          MAIN HEADER
      ===================================================== */}

      <Box
        sx={{
          flexShrink: 0,

          px: {
            xs: 1.5,
            sm: 3,
            md: 4,
          },

          py: {
            xs: 1.5,
            sm: 2,
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

            gap: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          {/* LEFT */}
          <Box>
            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: {
                  xs: 1,
                  sm: 1.25,
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 34,
                    sm: 40,
                  },

                  height: {
                    xs: 34,
                    sm: 40,
                  },

                  borderRadius: "10px",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  backgroundColor: COLORS.primaryLight,

                  color: COLORS.primary,

                  flexShrink: 0,
                }}
              >
                <ScheduleOutlinedIcon
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 21,
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 15,
                      sm: 18,
                      md: 20,
                    },

                    fontWeight: 600,

                    lineHeight: 1.3,

                    color: COLORS.text,

                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Confirm Vendor Revaluation
                </Typography>

                <Typography
                  sx={{
                    mt: 0.35,

                    fontSize: {
                      xs: 9.5,
                      sm: 10,
                      md: 11,
                    },

                    color: COLORS.secondaryText,

                    fontFamily: "Poppins, sans-serif",

                    maxWidth: {
                      xs: 230,
                      sm: 500,
                      md: "none",
                    },
                  }}
                >
                  The Following email will be sent to the selected vendors when
                  the revaluation is initiated
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* CLOSE */}
          <IconButton
            onClick={onClose}
            aria-label='Close'
            sx={{
              width: {
                xs: 30,
                sm: 34,
              },

              height: {
                xs: 30,
                sm: 34,
              },

              color: "#64748B",

              borderRadius: "8px",

              flexShrink: 0,

              "&:hover": {
                backgroundColor: "#F1F5F9",

                color: COLORS.text,
              },
            }}
          >
            <CloseIcon
              sx={{
                fontSize: {
                  xs: 17,
                  sm: 19,
                },
              }}
            />
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
            xs: 1,
            sm: 2,
            md: 3,
          },

          py: {
            xs: 1.25,
            sm: 2,
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
        {/* =================================================
            MAIN RESPONSIVE GRID
        ================================================= */}

        <Grid
          container
          spacing={{
            xs: 1.5,
            sm: 1.5,
            md: 2,
            lg: 2,
          }}
          alignItems='stretch'
        >
          {/* EMAIL RECIPIENTS */}
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            }}
          >
            <EmailRecipients settingGetAll={settingGetAll} />
          </Grid>

          {/* EMAIL TEMPLATE */}
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            }}
          >
            <EmailTemplate settingGetAll={settingGetAll} />
          </Grid>
        </Grid>

        {/* =================================================
            BOTTOM BUTTONS
        ================================================= */}

        <Grid
          container
          justifyContent='center'
          spacing={{
            xs: 1,
            sm: 1.5,
          }}
          sx={{
            pt: {
              xs: 2,
              sm: 3,
            },

            pb: {
              xs: 1,
              sm: 0.5,
            },
          }}
        >
          {/* CONFIRM */}
          <Grid
            size={{
              xs: 12,
              sm: "auto",
            }}
          >
            <Button
              fullWidth
              sx={{
                width: {
                  xs: "100%",
                  sm: "190px",
                },

                height: {
                  xs: "36px",
                  sm: "34px",
                },

                borderRadius: "6px",

                textTransform: "none",

                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                fontWeight: 600,

                fontFamily: "Poppins, sans-serif",

                backgroundColor: "#FF3154",

                color: "#FFFFFF",

                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#FF8197",

                  boxShadow: "none",
                },

                "&.Mui-disabled": {
                  backgroundColor: "#FF91A4",

                  color: "#FFFFFF",

                  opacity: 0.75,
                },
              }}
            >
              Confirm Revaluation
            </Button>
          </Grid>

          {/* CANCEL */}
          <Grid
            size={{
              xs: 12,
              sm: "auto",
            }}
          >
            <Button
              onClick={onClose}
              variant='outlined'
              fullWidth
              sx={{
                width: {
                  xs: "100%",
                  sm: "190px",
                },

                height: {
                  xs: "36px",
                  sm: "34px",
                },

                borderRadius: "6px",

                border: "1.5px solid #FF3154",

                textTransform: "none",

                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
