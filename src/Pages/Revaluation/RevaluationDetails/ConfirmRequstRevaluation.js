import React, { useState } from "react";

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
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
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
          variant="text"
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
      size="small"
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

function EmailRecipients() {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const [recipients, setRecipients] = useState([
    {
      name: "Senthil",
      email: "senthil@hiq.com",
    },
    {
      name: "Rajesh",
      email: "rajesh@hiq.com",
    },
    {
      name: "Kannan",
      email: "kannan@hiq.com",
    },
    {
      name: "Veena",
      email: "veena@hiq.com",
    },
    {
      name: "Ranganathan",
      email: "ranganathan@hiq.com",
    },
  ]);

  const [editRecipients, setEditRecipients] = useState(recipients);

  const [newRecipient, setNewRecipient] = useState({
    name: "",
    email: "",
  });

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = () => {
    setEditRecipients(recipients);
    setEditing(true);
  };

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

  const handleSave = () => {
    setRecipients(editRecipients);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditRecipients(recipients);
    setEditing(false);
  };

  /* =====================================================
     ADD
  ===================================================== */

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

  const handleCancelAdd = () => {
    setNewRecipient({
      name: "",
      email: "",
    });

    setAdding(false);
  };

  /* =====================================================
     REMOVE
  ===================================================== */

  const handleRemoveRecipient = (index) => {
    setEditRecipients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },

          py: {
            xs: 1.5,
            sm: 2,
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

              backgroundColor: "#EFF6FF",
              color: "#2563EB",

              flexShrink: 0,
            }}
          >
            <GroupsOutlinedIcon
              sx={{
                fontSize: {
                  xs: 16,
                  sm: 18,
                },
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: 12,
                sm: 13,
                md: 14,
              },

              fontWeight: 600,
              color: "#172033",

              fontFamily: "Poppins, sans-serif",
            }}
          >
            Email Notification Recipients
          </Typography>
        </Box>

        {/* ACTIONS */}
        <Box
          sx={{
            display: "flex",

            justifyContent: {
              xs: "flex-end",
              sm: "initial",
            },

            alignItems: "center",

            flexWrap: {
              xs: "wrap",
              sm: "nowrap",
            },

            gap: {
              xs: 0.5,
              sm: 1,
            },
          }}
        >
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

                px: {
                  xs: 0.75,
                  sm: 1.25,
                },

                color: "#2563EB",

                textTransform: "none",

                fontSize: {
                  xs: 11,
                  sm: 12,
                },

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
              variant="text"
              startIcon={
                <EditOutlinedIcon
                  sx={{
                    fontSize: 15,
                  }}
                />
              }
              onClick={handleEdit}
              sx={{
                minWidth: "auto",

                px: 1,

                color: "#2563EB",

                textTransform: "none",

                fontSize: {
                  xs: 11,
                  sm: 12,
                },

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
                startIcon={
                  <CloseOutlinedIcon
                    sx={{
                      fontSize: 15,
                    }}
                  />
                }
                sx={{
                  minWidth: "auto",

                  px: 1,

                  color: "#64748B",

                  textTransform: "none",

                  fontSize: {
                    xs: 11,
                    sm: 12,
                  },

                  fontWeight: 500,

                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                startIcon={
                  <CheckIcon
                    sx={{
                      fontSize: 15,
                    }}
                  />
                }
                sx={{
                  minWidth: "auto",

                  px: 1,

                  color: "#2563EB",

                  textTransform: "none",

                  fontSize: {
                    xs: 11,
                    sm: 12,
                  },

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

      {/* =====================================================
          ADD RECIPIENT FORM
      ===================================================== */}

      {adding && (
        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 2,
            },

            backgroundColor: "#F8FAFC",

            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Typography
            sx={{
              mb: 1.25,

              fontSize: {
                xs: 11,
                sm: 12,
              },

              fontWeight: 600,

              color: "#172033",

              fontFamily: "Poppins, sans-serif",
            }}
          >
            Add Recipient
          </Typography>

          {/* =============================================
              GRID CONTAINER
          ============================================= */}

          <Grid
            container
            spacing={{
              xs: 1,
              sm: 1,
              md: 1.25,
            }}
            alignItems="center"
          >
            {/* NAME */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
              }}
            >
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

                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

                    "& fieldset": {
                      borderColor: "#CBD5E1",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#2563EB",
                    },
                  },
                }}
              />
            </Grid>

            {/* EMAIL */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 5,
                lg: 5,
              }}
            >
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

                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

                    "& fieldset": {
                      borderColor: "#CBD5E1",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#2563EB",
                    },
                  },
                }}
              />
            </Grid>

            {/* BUTTONS */}
            <Grid
              size={{
                xs: 12,
                sm: 12,
                md: 3,
                lg: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  justifyContent: {
                    xs: "flex-end",
                    sm: "flex-end",
                    md: "flex-start",
                  },

                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancelAdd}
                  sx={{
                    minWidth: {
                      xs: 64,
                      sm: 70,
                    },

                    height: {
                      xs: 34,
                      sm: 38,
                    },

                    borderRadius: "8px",

                    borderColor: "#CBD5E1",

                    color: "#64748B",

                    textTransform: "none",

                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

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

                <Button
                  variant="contained"
                  onClick={handleAddRecipient}
                  disabled={
                    !newRecipient.name.trim() || !newRecipient.email.trim()
                  }
                  sx={{
                    minWidth: {
                      xs: 64,
                      sm: 70,
                    },

                    height: {
                      xs: 34,
                      sm: 38,
                    },

                    borderRadius: "8px",

                    backgroundColor: "#2563EB",

                    textTransform: "none",

                    fontSize: {
                      xs: 11,
                      sm: 12,
                    },

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
            </Grid>
          </Grid>
        </Box>
      )}

      {/* =====================================================
          TABLE
      ===================================================== */}

      <Box
        sx={{
          width: "100%",

          overflowX: {
            xs: "auto",
            sm: "auto",
            md: "visible",
          },
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: {
              xs: editing ? 520 : 420,
              sm: editing ? 520 : 450,
              md: "100%",
            },

            "& .MuiTableCell-root": {
              height: {
                xs: 44,
                sm: 48,
              },

              borderBottom: "1px solid #E2E8F0",
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

                    width: {
                      xs: 50,
                      sm: 70,
                    },
                  }}
                />
              )}
            </TableRow>
          </TableHead>

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
                          height: {
                            xs: 32,
                            sm: 34,
                          },

                          borderRadius: "7px",

                          fontSize: {
                            xs: 11,
                            sm: 12,
                          },

                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 11,
                          sm: 12,
                        },

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
                          height: {
                            xs: 32,
                            sm: 34,
                          },

                          borderRadius: "7px",

                          fontSize: {
                            xs: 11,
                            sm: 12,
                          },

                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 10.5,
                          sm: 12,
                        },

                        color: "#64748B",

                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {recipient.email}
                    </Typography>
                  )}
                </TableCell>

                {/* REMOVE */}
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
                        width: {
                          xs: 27,
                          sm: 30,
                        },

                        height: {
                          xs: 27,
                          sm: 30,
                        },

                        color: "#94A3B8",

                        borderRadius: "6px",

                        "&:hover": {
                          color: "#DC2626",

                          backgroundColor: "#FEF2F2",
                        },
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: {
                            xs: 14,
                            sm: 16,
                          },
                        }}
                      />
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
                    borderBottom: "none",

                    textAlign: "center",

                    py: {
                      xs: 3,
                      sm: 4,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        sm: 12,
                      },

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
      </Box>
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
    <Card>
      <SectionHeader
        title="Email Preview"
        icon={
          <MailOutlineIcon
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

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },
        }}
      >
        {/* =================================================
            SUBJECT
        ================================================= */}

        <Box
          sx={{
            mb: {
              xs: 2,
              sm: 2.5,
            },
          }}
        >
          <Typography
            sx={{
              mb: 0.75,

              fontSize: {
                xs: 11,
                sm: 12,
              },

              fontWeight: 600,

              color: COLORS.text,

              fontFamily: "Poppins, sans-serif",
            }}
          >
            Subject
          </Typography>

          <Box
            sx={{
              px: {
                xs: 1,
                sm: 1.5,
              },

              py: {
                xs: 1,
                sm: 1.1,
              },

              borderRadius: "8px",

              border: `1px solid ${COLORS.border}`,

              backgroundColor: "#F8FAFC",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 12,
                },

                color: COLORS.text,

                fontFamily: "Poppins, sans-serif",

                wordBreak: "break-word",
              }}
            >
              {templateData.subject}
            </Typography>
          </Box>
        </Box>

        {/* =================================================
            EMAIL CONTENT
        ================================================= */}

        <Box>
          <Typography
            sx={{
              mb: 0.75,

              fontSize: {
                xs: 11,
                sm: 12,
              },

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

              px: {
                xs: 1.25,
                sm: 2,
              },

              py: {
                xs: 1.25,
                sm: 1.75,
              },
            }}
          >
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
                <Grid container spacing={1}>
                  <Grid
                    size={{
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 12,
                    }}
                  >
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

                          fontSize: {
                            xs: 11,
                            sm: 12,
                          },

                          lineHeight: 1.7,

                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Typography
                  sx={{
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
                  {templateData.message}
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
    </Card>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ConfirmRequstRevaluation({ onClose }) {
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
            aria-label="Close"
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
          alignItems="stretch"
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
            <EmailRecipients />
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
            <EmailTemplate />
          </Grid>
        </Grid>

        {/* =================================================
            BOTTOM BUTTONS
        ================================================= */}

        <Grid
          container
          justifyContent="center"
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
              variant="outlined"
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
