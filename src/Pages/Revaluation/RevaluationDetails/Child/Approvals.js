import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import UserContext from "../../../../UseContext/UserContext";
import approved_sts1 from "../../../../Images/Prospects/approved_sts1.png";
import approved_sts2 from "../../../../Images/Prospects/approved_sts2.png";
import approved_sts3 from "../../../../Images/Prospects/approved_sts3.png";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Approvals(props) {
  const { formData } = useContext(UserContext);
  const [allapprovalData, setAllApprovalData] = useState(null);
  const [decision, setDecision] = useState("APPROVE");
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState({ decision: "", comments: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <Chip
            // icon={<CheckCircleIcon sx={{ fontSize: "16px !important" }} />}
            label='Approved'
            size='small'
            sx={{
              bgcolor: "#C8E6C9",
              color: "#2E7D32",
              fontWeight: 600,
              fontSize: "12px",
            }}
          />
        );
      case "REJECTED":
        return (
          <Chip
            // icon={<CancelIcon sx={{ fontSize: "16px !important" }} />}
            label='Rejected'
            size='small'
            sx={{
              bgcolor: "#FFCDD2",
              color: "#C62828",
              fontWeight: 600,
              fontSize: "12px",
            }}
          />
        );
      case "PENDING":
        return (
          <Chip
            // icon={<AccessTimeIcon sx={{ fontSize: "16px !important" }} />}
            label='Pending'
            size='small'
            sx={{
              bgcolor: "#FFE0B2",
              color: "#F57C00",
              fontWeight: 600,
              fontSize: "12px",
            }}
          />
        );
      default:
        return null;
    }
  };

  // const handleSubmit = () => {
  //   if (!decision) {
  //     alert("Please select a decision (Approve or Reject)");
  //     return;
  //   }
  //   console.log("Decision:", decision, "Comments:", comments);
  //   alert(`Decision submitted: ${decision}`);
  // };

  const getApprovalData = async () => {
    setLoading(true);
    const payload = {
      ProspectId: formData?.PROSPECT_ID,
      UserId: sessionStorage.getItem("UserId"),
    };

    try {
      const response = await axios.post(
        "http://10.50.20.89:9091/vendor-approval/fetch",
        payload,
      );

      console.log("Response:", response.data);

      const updatedData = {
        ...response.data,
        APPROVERS:
          response.data?.CURRENT_USER_DECISION?.ASSIGNMENT?.DECISION_STATUS ==
          "PENDING"
            ? response.data.APPROVERS.filter(
                (approver) =>
                  approver.APPROVER_USER_ID !==
                  Number(sessionStorage.getItem("UserId")),
              )
            : response.data.APPROVERS.filter(
                (approver) => approver.APPROVER_USER_ID,
              ),
      };

      setAllApprovalData(updatedData);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApprovalData();
  }, []);

  const completedCount = allapprovalData?.SUMMARY?.COMPLETED_COUNT || 0;
  const totalCount = allapprovalData?.SUMMARY?.TOTAL_COUNT || 0;

  const progressValue =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getAvatarProps = (name) => {
    name = name ?? "";

    const initials = name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const colors = [
      "#1976D2",
      "#388E3C",
      "#F57C00",
      "#7B1FA2",
      "#D32F2F",
      "#0288D1",
      "#5D4037",
      "#455A64",
    ];

    const colorIndex =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;

    return {
      initials: initials || "?",
      bgColor: colors[colorIndex],
    };
  };

  console.log(
    allapprovalData?.CURRENT_USER_DECISION?.ASSIGNMENT?.APPROVAL_ASSIGNMENT_ID,
  );

  const handleSubmit = async () => {
    let newErrors = { decision: "", comments: "" };

    // Validate decision
    if (!decision) {
      newErrors.decision = "Please select a decision (Approve or Reject)";
    }

    // Validate comments
    if (!comments.trim()) {
      newErrors.comments = "Comments are required";
    }

    setErrors(newErrors);

    // If no errors, proceed with submission
    if (!newErrors.decision && !newErrors.comments) {
      setLoading(true);

      const payload = {
        ProspectId: formData?.PROSPECT_ID,
        ApprovalAssignmentId:
          allapprovalData?.CURRENT_USER_DECISION?.ASSIGNMENT
            ?.APPROVAL_ASSIGNMENT_ID,
        UserId: sessionStorage.getItem("UserId"),
        Decision: decision,
        Remarks: comments,
      };

      try {
        const response = await axios.post(
          "http://10.50.20.89:9091/vendor-approval/decision",
          payload,
        );

        console.log(response.data);

        if (response.data.SUCCESS) {
          setResponseData(response.data);
          setSuccessModalOpen(true);
        } else {
          setSnackbar({
            open: true,
            message: response.data.MESSAGE,
            severity: "error",
          });
        }

        setLoading(false);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "Login failed";

        navigate("/ErrorHandling");
        sessionStorage.setItem("errormessge", errorMessage);
        setLoading(false);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);

    getApprovalData();
    props.getProspectorData();
  };

  return (
    <Box
      sx={{
        mt: 3,
        background: "white",
        p: 3,
        borderRadius: 2,
      }}
    >
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={successModalOpen}
        // onClose={handleSuccessModalClose}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Approval Submitted</DialogTitle>

        <DialogContent>
          <Typography>{responseData?.MESSAGE}</Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Final Status:</strong> {responseData?.FINAL_BATCH_STATUS}
          </Typography>

          <Typography>
            <strong>Vendor Registration:</strong>{" "}
            {responseData?.FINAL_VENDOR_REGISTRATION_STATUS}
          </Typography>

          <Typography>
            <strong>Risk Assessment:</strong>{" "}
            {responseData?.FINAL_RISK_ASSESSMENT_STATUS}
          </Typography>

          {responseData?.D365_TRIGGER_RESULT?.TRIGGERED && (
            <Alert
              severity={
                responseData?.D365_TRIGGER_RESULT?.SUCCESS
                  ? "success"
                  : "warning"
              }
              sx={{ mt: 2 }}
            >
              {responseData?.D365_TRIGGER_RESULT?.SUCCESS
                ? "D365 vendor creation completed successfully."
                : `D365 Trigger Failed: ${responseData?.D365_TRIGGER_RESULT?.ERROR}`}
            </Alert>
          )}
          {responseData?.FINAL_BATCH_STATUS == "PENDING" && (
            <Alert severity='success' sx={{ mt: 2 }}>
              The vendor account will be created once all remaining approvals
              are completed.
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant='contained' onClick={handleSuccessModalClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='60vh'
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid>
          {/* Approval Status Section */}
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 2, mb: 3, bgcolor: "#F0F4F8" }}
          >
            <Grid container spacing={3} alignItems='center'>
              <Grid size={{ lg: 6, xs: 6, sm: 6, md: 3 }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 700, mb: 1 }}>
                  Approval Status
                </Typography>

                <Typography sx={{ fontSize: "13px", color: "#666", mb: 2 }}>
                  {completedCount} / {totalCount} Approvals Completed
                </Typography>

                <LinearProgress
                  variant='determinate'
                  value={progressValue}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#E0E0E0",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#1A56DB",
                      borderRadius: 4,
                    },
                  }}
                />
              </Grid>

              <Grid
                size={{ xs: 12, sm: 8, md: 8, lg: 6 }}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: {
                    xs: "center",
                    sm: "space-between",
                  },
                  alignItems: "center",
                  gap: {
                    xs: 2,
                    sm: 3,
                  },
                  bgcolor: "white",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                }}
              >
                {/* Approved */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flex: {
                      xs: "1 1 100%",
                      sm: "0 0 auto",
                    },
                    justifyContent: {
                      xs: "center",
                      sm: "flex-start",
                    },
                  }}
                >
                  <Box
                    component='img'
                    src={approved_sts1}
                    alt='Approved'
                    sx={{ width: 15, height: 15 }}
                  />

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#21BFA7",
                    }}
                  >
                    {allapprovalData?.SUMMARY?.APPROVED_COUNT}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    Approved
                  </Typography>
                </Box>

                {/* Rejected */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flex: {
                      xs: "1 1 100%",
                      sm: "0 0 auto",
                    },
                    justifyContent: {
                      xs: "center",
                      sm: "flex-start",
                    },
                  }}
                >
                  <Box
                    component='img'
                    src={approved_sts2}
                    alt='Rejected'
                    sx={{ width: 15, height: 15 }}
                  />

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#E34472",
                    }}
                  >
                    {allapprovalData?.SUMMARY?.REJECTED_COUNT}
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: "#666" }}>
                    Rejected
                  </Typography>
                </Box>

                {/* Pending */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flex: {
                      xs: "1 1 100%",
                      sm: "0 0 auto",
                    },
                    justifyContent: {
                      xs: "center",
                      sm: "flex-start",
                    },
                  }}
                >
                  <Box
                    component='img'
                    src={approved_sts3}
                    alt='Pending'
                    sx={{ width: 15, height: 15 }}
                  />

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#F99709",
                    }}
                  >
                    {allapprovalData?.SUMMARY?.PENDING_COUNT}
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: "#666" }}>
                    Pending
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Main Content */}
          <Grid
            container
            spacing={3}
            sx={{ p: 3, borderRadius: "10px", backgroundColor: "#F2F5F9" }}
          >
            {/* Approval Cards */}
            <Grid
              size={{
                lg:
                  allapprovalData?.CURRENT_USER_DECISION?.ASSIGNMENT
                    ?.DECISION_STATUS == "PENDING"
                    ? 8
                    : 12,
                // xs: 8,
                // sm: 8,
                md: 12,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  p: 2,
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                {allapprovalData?.APPROVERS?.map((approver, index) => {
                  const { initials, bgColor } = getAvatarProps(
                    approver.USERNAME,
                  );

                  return (
                    <Card
                      key={index}
                      sx={{
                        borderRadius: 2,
                        border: "1px solid #E5E5E5",
                        boxShadow: "none",
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: bgColor,
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "14px",
                                width: 40,
                                height: 40,
                              }}
                            >
                              {initials}
                            </Avatar>

                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  color: "#333",
                                }}
                              >
                                {approver.USERNAME}
                              </Typography>
                            </Box>
                          </Box>

                          {getStatusBadge(approver.DECISION_STATUS)}
                        </Box>

                        {/* Remarks */}
                        {approver.DECISION_REMARKS && (
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                              <Typography
                                sx={{ fontSize: "12px", color: "#666" }}
                              >
                                ☐
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#333",
                                  lineHeight: 1.4,
                                }}
                              >
                                {approver.DECISION_REMARKS}
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        {/* Date */}
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <CalendarTodayIcon
                            sx={{ fontSize: "14px", color: "#999" }}
                          />
                          <Typography sx={{ fontSize: "12px", color: "#999" }}>
                            Assigned On{" "}
                            {dayjs(approver.ASSIGNED_AT).format("DD-MMM-YYYY")}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Grid>

            {/* Your Decision Panel */}
            {allapprovalData?.CURRENT_USER_DECISION?.ASSIGNMENT
              ?.DECISION_STATUS == "PENDING" && (
              <Grid size={{ lg: 4, xs: 12, sm: 12, md: 12 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    border: "1px solid #E5E5E5",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                        Your Decision
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#666",
                        lineHeight: 1.6,
                        mb: 3,
                      }}
                    >
                      Kindly review the vendor information, documents and risk
                      assessment before making your decision.
                    </Typography>

                    {/* Decision Options */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          mb: 1.5,
                          color: "#333",
                        }}
                      >
                        Decision <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <RadioGroup
                        value={decision}
                        onChange={(e) => {
                          setDecision(e.target.value);
                          setErrors({ ...errors, decision: "" });
                        }}
                      >
                        <FormControlLabel
                          value='APPROVE'
                          control={<Radio size='small' />}
                          label={
                            <Typography sx={{ fontSize: "13px" }}>
                              Approve
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value='REJECT'
                          control={<Radio size='small' />}
                          label={
                            <Typography sx={{ fontSize: "13px" }}>
                              Reject
                            </Typography>
                          }
                        />
                      </RadioGroup>
                      {errors.decision && (
                        <Typography
                          sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                        >
                          {errors.decision}
                        </Typography>
                      )}
                    </Box>

                    {/* Comments */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          mb: 1,
                          color: "#333",
                        }}
                      >
                        Comments <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        value={comments}
                        onChange={(e) => {
                          setComments(e.target.value);
                          setErrors({ ...errors, comments: "" });
                        }}
                        placeholder='Enter your comments...'
                        multiline
                        rows={3}
                        fullWidth
                        variant='outlined'
                        size='small'
                        error={!!errors.comments}
                        helperText={errors.comments}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "12px",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "10px 12px",
                            fontSize: "12px",
                          },
                        }}
                      />
                    </Box>

                    {/* Submit Button */}
                    <Button
                      variant='contained'
                      onClick={handleSubmit}
                      disabled={!decision || !comments.trim()}
                      sx={{
                        bgcolor: "#E63946",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "12px",
                        px: 2,
                        py: 0.6,
                        minWidth: 140,
                        height: 36,
                        borderRadius: 1,
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#C1202E",
                          border: "1.5px solid #C1202E",
                        },
                        "&:disabled": {
                          bgcolor: "#CCCCCC",
                          color: "#999",
                          cursor: "not-allowed",
                        },
                      }}
                    >
                      Submit Decision
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
