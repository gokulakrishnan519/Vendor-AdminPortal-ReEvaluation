import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Alert,
  Snackbar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import UserContext from "../../../../UseContext/UserContext";
import Loading from "../../../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "../../../../style";

export default function RiskAssessment(props) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [riskData, setRiskData] = useState(null);
  const [overallriskLevel, setOverallRiskLevel] = useState("");
  const [allriskAssesmentData, setAllRiskAssesmentData] = useState(null);

  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { formData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectVendorGroup, setSelectVendorGroup] = useState("");
  const [vendorGroupList, setVendorGropList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState(""); // save | submit

  const navigate = useNavigate();

  const handleStatusChange = (index, value) => {
    setRiskData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              status: value,
              // If not applicable ("No"), Risk Level doesn't apply anymore,
              // so clear whatever was selected before.
              riskLevel: value === "No" ? "" : item.riskLevel,
            }
          : item,
      ),
    );
  };

  const handleRiskLevelChange = (index, value) => {
    setRiskData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, riskLevel: value } : item,
      ),
    );
  };

  const handleRemarksChange = (index, value) => {
    setRiskData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, remarks: value } : item)),
    );
  };

  // Validation function for Submit Decision
  const validateSubmitDecision = () => {
    setErrorMessage("");

    // Only validate risk assessment for SUBMITTED
    if (decision !== "REJECTED" && decision !== "RESUBMITTED") {
      // Check if all Applicable (status) fields are filled
      const allStatusFilled = riskData.every((item) => item.status !== "");
      if (!allStatusFilled) {
        setErrorMessage(
          "❌ All 'Applicable' fields are mandatory. Please select a value for each row.",
        );
        return false;
      }

      // Check if all Risk Level fields are filled
      const allRiskLevelFilled = riskData.every(
        (item) => item.status === "No" || item.riskLevel !== "",
      );
      if (!allRiskLevelFilled) {
        setErrorMessage(
          "❌ All 'Risk Level' fields are mandatory. Please select a value for each row.",
        );
        return false;
      }
    }

    // Check if decision is selected
    if (!decision) {
      setErrorMessage("❌ Please select a decision before submitting.");
      return false;
    }

    // Comments are mandatory for REJECTED and RESUBMITTED
    if (
      (decision === "REJECTED" || decision === "RESUBMITTED") &&
      !comments.trim()
    ) {
      setErrorMessage("❌ Comments are mandatory for this decision.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateSubmitDecision()) {
      return;
    }

    setErrorMessage("");
    setLoading(true);

    const payload = {
      Header: [
        {
          ProspectId: formData?.PROSPECT_ID,
          AssessedByUserId: sessionStorage.getItem("UserId"),
          SubmittedByUserId: sessionStorage.getItem("UserId"),
          InitiatedByUserId: sessionStorage.getItem("UserId"),
          AssessmentStatus: "Submitted",
          Comments: comments,
          ToEmail: "",
          VendorGroup: selectVendorGroup,
          OverallRiskLevel: overallriskLevel || "",
        },
      ],
      lines: riskData,
    };

    try {
      const response = await axios.post(
        "http://10.50.20.89:9091/riskassessment/create",
        payload,
      );

      if (response.data.SUCCESS) {
        setDialogType("submit");
        setDialogMessage(response.data.MESSAGE);
        setOpenDialog(true);
      }

      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      sessionStorage.setItem("errormessge", errorMessage);
      navigate("/ErrorHandling");
      setLoading(false);
    }
  };

  // Save Draft - No validation required

  // const handleSaveDraft = async () => {
  //   setErrorMessage("");

  //   setLoading(true);
  //   const payload = {
  //     Header: [
  //       {
  //         ProspectId: formData?.PROSPECT_ID,
  //         AssessedByUserId: sessionStorage.getItem("UserId"),
  //         SubmittedByUserId: sessionStorage.getItem("UserId"),
  //         InitiatedByUserId: sessionStorage.getItem("UserId"),
  //         AssessmentStatus: "",
  //         Comments: comments,
  //         ToEmail: "",
  //         VendorGroup: selectVendorGroup ?? selectVendorGroup,
  //         OverallRiskLevel: overallriskLevel ? overallriskLevel : "",
  //       },
  //     ],
  //     lines: riskData,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://10.50.20.89:9091/riskassessment/create",
  //       payload,
  //     );

  //     console.log("Response:", response.data);

  //     setSnackbar({
  //       open: true,
  //       message: "Risk Assessment saved successfully!",
  //       severity: "success",
  //     });

  //     handleGetRiskAssesmentList();
  //     setLoading(false);
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.message || error.message || "Login failed";

  //     navigate("/ErrorHandling");
  //     sessionStorage.setItem("errormessge", errorMessage);
  //     setLoading(false);
  //   }
  // };

  const handleSaveDraft = async () => {
    setErrorMessage("");
    setLoading(true);

    const payload = {
      Header: [
        {
          ProspectId: formData?.PROSPECT_ID,
          AssessedByUserId: sessionStorage.getItem("UserId"),
          SubmittedByUserId: sessionStorage.getItem("UserId"),
          InitiatedByUserId: sessionStorage.getItem("UserId"),
          AssessmentStatus: "",
          Comments: comments,
          ToEmail: "",
          VendorGroup: selectVendorGroup,
          OverallRiskLevel: overallriskLevel || "",
        },
      ],
      lines: riskData,
    };

    try {
      const response = await axios.post(
        "http://10.50.20.89:9091/riskassessment/create",
        payload,
      );

      if (response.data.SUCCESS) {
        setDialogType("save");
        setDialogMessage("Details Saved Succesfully");
        setOpenDialog(true);
      }

      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      sessionStorage.setItem("errormessge", errorMessage);
      navigate("/ErrorHandling");
      setLoading(false);
    }
  };

  const defaultRiskData = [
    {
      id: 1,
      process: "Manufacturing Process",
      identifiedRisk: "Availability of machines",
      status: "",
      riskLevel: "",
      remarks: "",
    },
    {
      id: 2,
      process: "Material Inspection",
      identifiedRisk: "Measuring instruments",
      status: "",
      riskLevel: "",
      remarks: "",
    },
    {
      id: 3,
      process: "Human Resources",
      identifiedRisk: "Skilled personnel",
      status: "",
      riskLevel: "",
      remarks: "",
    },
    {
      id: 4,
      process: "Financial",
      identifiedRisk: "Credit rating",
      status: "",
      riskLevel: "",
      remarks: "",
    },
    {
      id: 5,
      process: "On-Time Delivery",
      identifiedRisk: "Schedule compliance",
      status: "",
      riskLevel: "",
      remarks: "",
    },
    {
      id: 6,
      process: "Logistics",
      identifiedRisk: "Transportation",
      status: "",
      riskLevel: "",
      remarks: "",
    },
    {
      id: 7,
      process: "Service",
      identifiedRisk: "Response to enquiry",
      status: "",
      riskLevel: "",
      remarks: "",
    },
    {
      id: 8,
      process: "Quality Assurance",
      identifiedRisk: "Product consistency",
      status: "",
      riskLevel: "",
      remarks: "",
    },
  ];

  const handleGetRiskAssesmentList = async () => {
    setLoading(true);
    const payload = {
      ProspectId: formData?.PROSPECT_ID,
      // ProspectId: "PR0783",
    };

    try {
      const response = await axios.post(
        "http://10.50.20.89:9091/riskassessment/listpage",
        payload,
      );
      setAllRiskAssesmentData(response.data);
      console.log("Response:", response.data);
      setRiskData(
        response.data?.lines?.length ? response.data.lines : defaultRiskData,
      );

      setSelectVendorGroup(
        response.data.headers.length > 0
          ? response.data.headers[0].vendorGroup
          : "",
      );
      setOverallRiskLevel(
        response.data.headers.length > 0
          ? response.data.headers[0].overallRiskLevel
          : "",
      );

      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const handleGetVendorGroup = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://10.50.20.89:9091/vendor-groups/",
      );

      setVendorGropList(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRiskAssesmentList();
    handleGetVendorGroup();
  }, []);

  const handleDialogOk = async () => {
    try {
      // Close dialog
      setOpenDialog(false);

      // Call APIs after clicking OK
      await handleGetRiskAssesmentList();
      await props.getProspectorData();

      // Optional
      setDialogMessage("");
      setDialogType("");

      // If submit, navigate if required
      // if (dialogType === "submit") {
      //   navigate("/your-route");
      // }
    } catch (error) {
      console.error("Error while loading data:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ p: 3, backgroundColor: "white", mt: 3 }}>
          {/* Table */}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              variant='filled'
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          <Dialog open={openDialog} onClose={handleDialogOk}>
            <DialogTitle>Success</DialogTitle>

            <DialogContent>
              <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button variant='contained' onClick={handleDialogOk}>
                OK
              </Button>
            </DialogActions>
          </Dialog>

          <Grid
            sx={{
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "right",
            }}
          >
            <Grid>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#2e2e2e",
                }}
              >
                Select Vendor Group <span style={{ color: "#E63946" }}>*</span>:
              </Typography>
            </Grid>

            {formData?.STATUS == "TO_EVALUATE" ? (
              <Grid>
                <Select
                  value={selectVendorGroup}
                  onChange={(e) => setSelectVendorGroup(e.target.value)}
                  displayEmpty
                  size='small'
                  sx={{ width: 180 }}
                >
                  <MenuItem value='' disabled>
                    Select Vendor Group
                  </MenuItem>

                  {vendorGroupList.map((item) => (
                    <MenuItem key={item.VendGroup} value={item.Description}>
                      {item.Description}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ) : (
              <Typography>{selectVendorGroup}</Typography>
            )}
          </Grid>

          <Grid>
            {formData?.STATUS == "TO_EVALUATE" ? (
              <TableContainer sx={{ border: "1px solid #DDDEE0" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell>Process</TableCell>
                      <TableCell>Identified risk</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        Applicable <span style={{ color: "#E63946" }}>*</span>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        Risk level <span style={{ color: "#E63946" }}>*</span>
                      </TableCell>
                      <TableCell>Observation</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {riskData?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.process}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.identifiedRisk}
                        </TableCell>

                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {allriskAssesmentData?.headers?.assessmentStatus ===
                            undefined ||
                          allriskAssesmentData?.headers?.assessmentStatus ===
                            "DRAFTED" ? (
                            <Select
                              value={row.status}
                              onChange={(e) =>
                                handleStatusChange(index, e.target.value)
                              }
                              displayEmpty
                              size='small'
                              sx={{ width: 150 }}
                            >
                              <MenuItem value='' disabled>
                                Select the Status
                              </MenuItem>
                              <MenuItem value='Yes'>Yes</MenuItem>
                              <MenuItem value='No'>No</MenuItem>
                            </Select>
                          ) : (
                            row.status
                          )}
                        </TableCell>

                        <TableCell>
                          {!allriskAssesmentData?.headers?.assessmentStatus ||
                          allriskAssesmentData?.headers?.assessmentStatus ===
                            "DRAFTED" ? (
                            <Select
                              value={row.riskLevel}
                              onChange={(e) =>
                                handleRiskLevelChange(index, e.target.value)
                              }
                              displayEmpty
                              size='small'
                              sx={{ width: 150 }}
                              disabled={row.status === "No"}
                            >
                              <MenuItem value='' disabled>
                                {row.status === "No"
                                  ? "Not Applicable"
                                  : "Select the Risk Level"}
                              </MenuItem>
                              <MenuItem value='Low'>Low</MenuItem>
                              <MenuItem value='Medium'>Medium</MenuItem>
                              <MenuItem value='High'>High</MenuItem>
                              {/* <MenuItem value='Critical'>Critical</MenuItem> */}
                            </Select>
                          ) : (
                            row.riskLevel
                          )}
                        </TableCell>

                        <TableCell sx={{ verticalAlign: "top" }}>
                          <TextField
                            value={row.remarks}
                            onChange={(e) =>
                              handleRemarksChange(index, e.target.value)
                            }
                            placeholder='Optional'
                            multiline
                            minRows={1}
                            maxRows={3}
                            size='small'
                            sx={{ width: 180 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer sx={{ border: "1px solid #DDDEE0" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell>Process</TableCell>
                      <TableCell>Identified risk</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        Applicable <span style={{ color: "#E63946" }}>*</span>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        Risk level <span style={{ color: "#E63946" }}>*</span>
                      </TableCell>
                      <TableCell>Observation</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {riskData?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.process}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.identifiedRisk}
                        </TableCell>

                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.status}
                        </TableCell>

                        <TableCell>{row.riskLevel}</TableCell>

                        <TableCell>{row.remarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {sessionStorage.getItem("RoleName") == "Risk Assessment" ? (
              formData?.STATUS === "TO_EVALUATE" ? (
                <>
                  <Box
                    sx={{
                      mt: 2,
                      textAlign: "right",
                      backgroundColor: "#F9FAFC",
                      p: 2,
                      borderRadius: "10px",
                    }}
                  >
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        marginRight: "8px",
                        fontWeight: 600,
                      }}
                    >
                      Overall Risk Level{" "}
                      <span style={{ color: "#E63946" }}>*</span>:
                    </label>

                    <Select
                      value={overallriskLevel}
                      onChange={(e) => setOverallRiskLevel(e.target.value)}
                      size='small'
                      sx={{ width: 150, textAlign: "center" }}
                    >
                      <MenuItem value='Low'>Low</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value='High'>High</MenuItem>
                    </Select>
                  </Box>
                </>
              ) : (
                <Grid sx={{ mt: 3, display: "flex", gap: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#000",
                      mb: 1.5,
                    }}
                  >
                    Overall Risk Level
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000",
                      mb: 1.5,
                    }}
                  >
                    {overallriskLevel}
                  </Typography>
                </Grid>
              )
            ) : allriskAssesmentData?.headers?.[0]?.assessmentStatus !==
              "DRAFT" ? (
              <Grid sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#000",
                    mb: 1.5,
                  }}
                >
                  Overall Risk Level
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#000",
                    mb: 1.5,
                  }}
                >
                  {overallriskLevel}
                </Typography>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          {/* Your Next Action Section */}

          {sessionStorage.getItem("RoleName") == "Risk Assessment" ? (
            formData?.STATUS === "TO_EVALUATE" ? (
              <>
                <Grid
                  sx={{
                    p: 3,
                    mt: 3,
                    border: "1px solid #DDDEE0",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#000",
                        mb: 1,
                      }}
                    >
                      Your Next Action{" "}
                      <span style={{ color: "#E63946" }}>*</span>
                    </Typography>

                    <Typography
                      variant='body2'
                      sx={{
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      We recommend approval based on the risk assessment.
                    </Typography>
                  </Box>

                  <Grid container spacing={3}>
                    {/* Decision Radio Buttons */}
                    <Grid size={{ lg: 6, xs: 12, md: 4, sm: 6 }}>
                      <Typography
                        variant='body2'
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#000",
                          mb: 1.5,
                        }}
                      >
                        Decision
                      </Typography>

                      <RadioGroup
                        value={decision}
                        onChange={(e) => {
                          setDecision(e.target.value);
                          setErrorMessage("");
                        }}
                      >
                        <FormControlLabel
                          disabled={
                            !riskData?.length ||
                            !riskData.every(
                              (item) =>
                                item.status?.trim() &&
                                (item.status === "No" ||
                                  item.riskLevel?.trim()),
                            )
                          }
                          value='SUBMITTED'
                          control={<Radio size='small' />}
                          label='Submit for Approval'
                          sx={{ mb: 1 }}
                        />

                        <FormControlLabel
                          // disabled={
                          //   !riskData?.length ||
                          //   !riskData.every(
                          //     (item) =>
                          //       item.status?.trim() &&
                          //       (item.status === "No" ||
                          //         item.riskLevel?.trim()),
                          //   )
                          // }
                          value='RESUBMITTED'
                          control={<Radio size='small' />}
                          label='Return to Prospect'
                          sx={{ mb: 1 }}
                        />

                        <FormControlLabel
                          // disabled={
                          //   !riskData?.length ||
                          //   !riskData.every(
                          //     (item) =>
                          //       item.status?.trim() &&
                          //       (item.status === "No" ||
                          //         item.riskLevel?.trim()),
                          //   )
                          // }
                          value='REJECTED'
                          control={<Radio size='small' />}
                          label='Reject Prospect'
                        />
                      </RadioGroup>
                    </Grid>

                    {/* Comments */}
                    <Grid size={{ lg: 6, xs: 12, md: 4, sm: 6 }}>
                      <Typography
                        variant='body2'
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#000",
                          mb: 1.5,
                        }}
                      >
                        Comments
                        {(decision === "RESUBMITTED" ||
                          decision === "REJECTED") && (
                          <span style={{ color: "#E63946" }}> *</span>
                        )}
                      </Typography>

                      <TextField
                        value={comments}
                        onChange={(e) => {
                          setComments(e.target.value);
                          setErrorMessage("");
                        }}
                        disabled={
                          decision !== "REJECTED" &&
                          decision !== "RESUBMITTED" &&
                          (!riskData?.length ||
                            !riskData.every(
                              (item) =>
                                item.status?.trim() &&
                                (item.status === "No" ||
                                  item.riskLevel?.trim()),
                            ))
                        }
                        placeholder='Enter the Comments'
                        multiline
                        rows={4}
                        variant='outlined'
                        fullWidth
                      />

                      {(decision === "RESUBMITTED" ||
                        decision === "REJECTED") &&
                        !comments.trim() && (
                          <Typography
                            variant='caption'
                            sx={{
                              color: "#E63946",
                              display: "block",
                              mt: 0.5,
                              fontSize: "12px",
                            }}
                          >
                            Comments are required for this decision
                          </Typography>
                        )}
                    </Grid>
                  </Grid>
                </Grid>

                {/* Action Buttons */}
                <Grid
                  container
                  spacing={1.5}
                  sx={{ mt: 3, justifyContent: "center" }}
                >
                  <Grid item xs={12} sm='auto'>
                    <Button
                      variant='outlined'
                      onClick={handleSubmit}
                      disabled={
                        decision === "" ||
                        // RETURNED & RESUBMITTED -> Only Comment is required
                        ((decision === "RETURNED" ||
                          decision === "RESUBMITTED") &&
                          !comments?.trim()) ||
                        // Other decisions
                        (decision !== "RETURNED" &&
                          decision !== "RESUBMITTED" &&
                          (selectVendorGroup === "" ||
                            selectVendorGroup == null ||
                            overallriskLevel === "" ||
                            (decision !== "REJECTED" &&
                              (!riskData?.length ||
                                !riskData.every(
                                  (item) =>
                                    item.status?.trim() &&
                                    (item.status === "No" ||
                                      item.riskLevel?.trim()),
                                )))))
                      }
                      sx={{
                        ...buttonStyle,
                        bgcolor: "#E63946",
                        color: "white",
                        border: "1.5px solid #E63946",
                        "&.Mui-disabled": {
                          bgcolor: "#ccc",
                          color: "#666",
                          border: "1.5px solid #ccc",
                        },
                      }}
                    >
                      Submit Decision
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm='auto'>
                    <Button
                      variant='outlined'
                      onClick={handleSaveDraft}
                      disabled={
                        !riskData?.some(
                          (item) =>
                            item.status?.trim() || item.riskLevel?.trim(),
                        )
                      }
                      sx={{
                        ...buttonStyle,
                        color: "#E63946",
                        border: "1.5px solid #E63946",
                        "&.Mui-disabled": {
                          color: "#999",
                          border: "1.5px solid #ccc",
                        },
                      }}
                    >
                      Save as Draft
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#000",
                    mb: 1.5,
                  }}
                >
                  {" "}
                  Decision
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#000",
                    mb: 1.5,
                  }}
                >
                  {allriskAssesmentData?.headers?.[0]?.assessmentStatus ===
                  "SUBMITTED"
                    ? "Submitted"
                    : allriskAssesmentData?.headers?.[0]?.assessmentStatus ===
                        "RESUBMITTED"
                      ? "Returned to Prospect"
                      : allriskAssesmentData?.headers?.[0]?.assessmentStatus ===
                          "REJECTED"
                        ? "Rejected Prospect"
                        : allriskAssesmentData?.headers?.[0]?.assessmentStatus}
                </Typography>
                <br />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#000",
                    mb: 1.5,
                  }}
                >
                  {" "}
                  Comments
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",

                    color: "#000",
                    mb: 1.5,
                  }}
                >
                  {allriskAssesmentData?.headers?.[0]?.comments}
                </Typography>
              </Grid>
            )
          ) : allriskAssesmentData?.headers?.[0]?.assessmentStatus !==
            "DRAFT" ? (
            <Grid sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#000",
                  mb: 1.5,
                }}
              >
                {" "}
                Decision :{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#000",
                  mb: 1.5,
                }}
              >
                {" "}
                {allriskAssesmentData?.headers?.[0]?.assessmentStatus ===
                "SUBMITTED"
                  ? "Submitted"
                  : allriskAssesmentData?.headers?.[0]?.assessmentStatus ===
                      "RESUBMITTED"
                    ? "Returned to Prospect"
                    : allriskAssesmentData?.headers?.[0]?.assessmentStatus ===
                        "REJECTED"
                      ? "Rejected Prospect"
                      : allriskAssesmentData?.headers?.[0]?.assessmentStatus}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#000",
                  mb: 1.5,
                }}
              >
                {" "}
                Comments :
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",

                  color: "#000",
                  mb: 1.5,
                }}
              >
                {" "}
                {allriskAssesmentData?.headers?.[0]?.comments}
              </Typography>
            </Grid>
          ) : (
            ""
          )}

          <Grid sx={{ mt: 2 }}>
            {/* Error Alert */}
            {errorMessage && (
              <Alert
                severity='error'
                sx={{ mb: 3, backgroundColor: "#ffebee", borderRadius: 1 }}
                onClose={() => setErrorMessage("")}
              >
                {errorMessage}
              </Alert>
            )}
          </Grid>
        </Box>
      )}
    </div>
  );
}
