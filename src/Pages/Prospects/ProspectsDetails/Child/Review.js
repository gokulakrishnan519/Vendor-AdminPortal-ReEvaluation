import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Chip,
  Avatar,
  useMediaQuery,
  useTheme,
  styled,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UserContext from "../../../../UseContext/UserContext";
import { Snackbar, Alert } from "@mui/material";
import Loading from "../../../../Loading/Loading";
import { useNavigate } from "react-router-dom";

// Styled Components
const SectionHeading = styled(Typography)`
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #2e2e2e;
`;

const FieldLabel = styled(Typography)`
  font-weight: 600;
  color: #666;
  font-size: 12px;
`;

const FieldValue = styled(Typography)`
  color: #333;
  margin-top: 5px;
  font-size: 13px;
`;

const Review = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [decision, setDecision] = useState("RESUBMITTED");
  const [comments, setComments] = useState("");
  const [allReviewData, setAllReviewData] = useState(null);
  const [decisionError, setDecisionError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const { formData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const isDecisionEmpty = decision === "";
    const isCommentsEmpty = comments.trim() === "";

    setDecisionError(isDecisionEmpty);
    setCommentsError(isCommentsEmpty);

    if (isDecisionEmpty || isCommentsEmpty) return;
    setLoading(true);
    const payload = {
      ProspectId: formData?.PROSPECT_ID,
      status: decision,
      Comments: comments,
      // ToEmail: formData?.contacts?.[0]?.EMAIL,
      ToEmail: sessionStorage.getItem("To_Email"),
    };

    try {
      const response = await axios.post(
        "http://10.10.0.115:8095/review/approvalreviewupdate",
        payload,
      );

      if (response.data?.approvalreview_update === "updated successfully") {
        setSnackbar({
          open: true,
          message: "Resubmitted Successfully",
          severity: "success",
        });
        props.getProspectorData();
        setLoading(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const handleGetReview = async () => {
    setLoading(true);
    const payload = {
      // ProspectId: "PR0821",
      ProspectId: formData?.PROSPECT_ID,
    };

    try {
      const response = await axios.post(
        "http://10.10.0.115:8095/review/approvalist",
        payload,
      );

      setAllReviewData(response.data.approval_listpage);
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
    handleGetReview();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: "16px !important" }} />}
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
            icon={<CancelIcon sx={{ fontSize: "16px !important" }} />}
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
            icon={<AccessTimeIcon sx={{ fontSize: "16px !important" }} />}
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

  const getAvatarProps = (name = "") => {
    const initials = name
      .trim()
      .split(" ")
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

    // Generate a consistent color based on the username
    const colorIndex =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;

    return {
      initials,
      bgColor: colors[colorIndex],
    };
  };

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
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
        <Grid container spacing={3}>
          {/* Left Column - Approver Decisions */}
          <Grid
            size={{
              lg: formData?.STATUS == "RETURNED" ? 7 : 12,
              xs: 12,
              md: 12,
              sm: 12,
            }}
          >
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <SectionHeading>Approver Decisions</SectionHeading>

                <TableContainer sx={{ border: "1px solid #DDDEE0" }}>
                  <Table sx={{ minWidth: 500 }}>
                    <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                      <TableRow sx={{ whiteSpace: "nowrap" }}>
                        <TableCell>Approver</TableCell>
                        <TableCell>Decision</TableCell>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Completed On</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allReviewData?.map((approver, index) => {
                        const { initials, bgColor } = getAvatarProps(
                          approver.fullname,
                        );
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:hover": { bgcolor: "#f9fafb" },
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
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
                                    variant='body2'
                                    sx={{
                                      fontWeight: 600,
                                      color: "#1f2937",
                                    }}
                                  >
                                    {approver.fullname}
                                  </Typography>
                                  {/* <Typography
                                  variant='caption'
                                  sx={{
                                    color: "#9ca3af",
                                    display: "block",
                                  }}
                                >
                                  {approver.role}
                                </Typography> */}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(approver.decisionstatus)}
                            </TableCell>
                            <TableCell>{approver.decisionremarks}</TableCell>
                            <TableCell>{approver.decisionat}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {formData?.STATUS == "RETURNED" && (
            <>
              <Grid size={{ lg: 5, xs: 12, md: 12, sm: 12 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <SectionHeading>Your Decision</SectionHeading>

                    <Typography
                      variant='body2'
                      sx={{
                        color: "#4b5563",
                        mb: 3,
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                      }}
                    >
                      Review the approver feedback and decide whether the vendor
                      should be rejected or asked to resubmit.
                    </Typography>

                    {/* Decision RadioGroup */}
                    <Box sx={{ mb: 3 }}>
                      <FieldLabel sx={{ mb: 1.5 }}>Decision</FieldLabel>
                      <RadioGroup
                        value={decision}
                        onChange={(e) => {
                          setDecision(e.target.value);
                          setDecisionError(false);
                        }}
                        sx={{
                          gap: 1,
                        }}
                      >
                        <FormControlLabel
                          value='RESUBMITTED'
                          control={
                            <Radio
                              sx={{
                                color: "#d1d5db",
                                "&.Mui-checked": {
                                  color: "#E63946",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant='body2'
                              sx={{ color: "#374151", fontWeight: 500 }}
                            >
                              Request Vendor to Resubmit
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value='REJECT'
                          control={
                            <Radio
                              sx={{
                                color: "#d1d5db",
                                "&.Mui-checked": {
                                  color: "#E63946",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant='body2'
                              sx={{ color: "#374151", fontWeight: 500 }}
                            >
                              Reject Vendor
                            </Typography>
                          }
                        />
                      </RadioGroup>
                      {decisionError && (
                        <Typography color='error' fontSize={12} mt={0.5}>
                          Please select a decision.
                        </Typography>
                      )}
                    </Box>

                    {/* Comments TextField */}
                    <Box sx={{ mb: 3 }}>
                      <FieldLabel sx={{ mb: 1.5 }}>Comments</FieldLabel>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder='Enter Comments to be sent to Vendor'
                        value={comments}
                        onChange={(e) => {
                          setComments(e.target.value);
                          setCommentsError(false);
                        }}
                        error={commentsError}
                        helperText={
                          commentsError ? "Comments are required." : ""
                        }
                      />
                    </Box>

                    {/* Submit Button */}
                    <Button
                      fullWidth
                      variant='contained'
                      onClick={handleSubmit}
                      sx={{
                        bgcolor: "#E63946",
                        color: "#fff",
                        fontWeight: 600,
                        py: 0.5,
                        fontSize: "0.95rem",
                        textTransform: "none",
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor: "#E63946",
                        },
                        "&:active": {
                          transform: "scale(0.98)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      Submit Decision
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Review;
