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
  Modal,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import UserContext from "../../../../UseContext/UserContext";
import Loading from "../../../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "../../../../style";
import ReturnRevaluationModal from "../ReturnRevaluationModal";

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
  const [details, setSelectVendorGroup] = useState("");
  const [vendorGroupList, setVendorGropList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState(""); // save | submit
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const handleStatusChange = (index, value) => {
    setRiskData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              is_applicable: value === "Yes",
              status: value,
              riskLevel: value === "No" ? "" : item.riskLevel,
              risk_level: value === "No" ? null : item.risk_level,
            }
          : item,
      ),
    );
  };

  const handleRiskLevelChange = (index, value) => {
    setRiskData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              riskLevel: value,
              risk_level: value,
            }
          : item,
      ),
    );
  };

  const handleRemarksChange = (index, value) => {
    setRiskData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, remarks: value } : item)),
    );
  };

  const handleGetRiskAssesmentList = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://10.10.0.115:8095/vendor-reevaluation/risk-assessment",
        {
          reevaluation_id: props.revaluation_id,
        },
      );

      const result = response.data?.data;

      setAllRiskAssesmentData(response.data);

      setRiskData(
        (result?.details ?? []).map((item) => ({
          ...item,
          status: item.is_applicable === true ? "Yes" : "No",
          riskLevel: item.risk_level ?? "",
          remarks: item.remarks ?? "",
        })),
      );

      setOverallRiskLevel(result?.assessment?.overall_risk_level ?? "");

      setComments(result?.assessment?.comments ?? "");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      sessionStorage.setItem("errormessge", errorMessage);
      navigate("/ErrorHandling");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (type) => {
    if (!riskData?.length) {
      setErrorMessage("No risk assessment data available.");
      return;
    }

    const missingStatus = riskData.some((item) => !item.status?.trim());

    if (missingStatus) {
      setErrorMessage(
        "Please select Applicable for every risk assessment row.",
      );
      return;
    }

    const missingRiskLevel = riskData.some(
      (item) => item.status !== "No" && !item.riskLevel?.trim(),
    );

    if (missingRiskLevel) {
      setErrorMessage("Please select a Risk Level for every applicable row.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    const payload = {
      reevaluation_id: props.revaluation_id,
      action: type,
      overall_risk_level: overallriskLevel,
      comments: comments.trim(),
      action_by: sessionStorage.getItem("UserId"),
      details: riskData,
    };

    try {
      const response = await axios.post(
        "http://10.10.0.115:8095/vendor-reevaluation/risk-assessment/save",
        payload,
      );

      if (response.data?.status) {
        setDialogType(type == "COMPLETED" ? "Submit" : "");
        setDialogMessage(
          response.data.message || "Risk assessment completed successfully.",
        );
        setOpenDialog(true);
      } else {
        setErrorMessage(
          response.data?.message || "Unable to complete risk assessment.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      sessionStorage.setItem("errormessge", errorMessage);
      navigate("/ErrorHandling");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRiskAssesmentList();
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

  const reevaluationStatus = allriskAssesmentData?.data?.reevaluation?.status;

  const assessmentStatus =
    allriskAssesmentData?.data?.assessment?.assessment_status;

  const isEditable = ["SUBMITTED", "UNDER_REVIEW", "RESUBMITTED"].includes(
    reevaluationStatus,
  );
  //  &&
  // assessmentStatus !== "COMPLETED";

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ p: 3, backgroundColor: "white", mt: 3 }}>
          {/* Table */}

          {/* <Snackbar
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar> */}

          <Dialog open={openDialog} onClose={handleDialogOk}>
            <DialogTitle>{dialogType}</DialogTitle>

            <DialogContent>
              <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button variant='contained' onClick={handleDialogOk}>
                OK
              </Button>
            </DialogActions>
          </Dialog>

          <Grid>
            {isEditable ? (
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

                  {loading ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} align='center'>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {riskData?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.process_name}
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.identified_risk}
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            <Select
                              value={
                                row.status === "Yes" ||
                                row.is_applicable === true
                                  ? "Yes"
                                  : row.status === "No" ||
                                      row.is_applicable === false
                                    ? "No"
                                    : ""
                              }
                              onChange={(e) =>
                                handleStatusChange(index, e.target.value)
                              }
                              renderValue={(selected) =>
                                selected || "Select Status"
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
                          </TableCell>

                          <TableCell>
                            <Select
                              value={row.riskLevel}
                              onChange={(e) =>
                                handleRiskLevelChange(index, e.target.value)
                              }
                              renderValue={(selected) =>
                                selected || "Select Risk Level"
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
                            </Select>
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
                  )}
                </Table>
              </TableContainer>
            ) : allriskAssesmentData?.data?.reevaluation?.status ===
              "MAIL_SENT" ? (
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
                    <TableRow>
                      <TableCell colSpan={5} align='center'>
                        No data available
                      </TableCell>
                    </TableRow>
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

                  {loading ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} align='center'>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {riskData?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.process_name}
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.identified_risk}
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.is_applicable === true ? "Yes" : "No"}
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.is_applicable
                              ? row.risk_level || "-"
                              : "Not Applicable"}
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.remarks || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
            {/* {sessionStorage.getItem("RoleName") == "Risk Assessment" ? (
              allriskAssesmentData?.assessment?.assessment_status  === "TO_EVALUATE" ? (
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
                      size="small"
                      sx={{ width: 150, textAlign: "center" }}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
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
            )} */}
          </Grid>

          {/* Your Next Action Section */}

          {isEditable ? (
            <>
              {/* <Grid
                  sx={{
                    p: 3,
                    mt: 3,
                    border: "1px solid #DDDEE0",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                  }}
                > */}

              <Grid container spacing={3}>
                <Grid size={{ lg: 12, xs: 12, md: 12, sm: 12 }} sx={{ mt: 3 }}>
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
                    {/* {(decision === "RESUBMITTED" ||
                        decision === "REJECTED") && (
                        <span style={{ color: "#E63946" }}> *</span>
                      )} */}
                  </Typography>

                  <TextField
                    value={comments}
                    onChange={(e) => {
                      setComments(e.target.value);
                      setErrorMessage("");
                    }}
                    // disabled={
                    //   decision !== "REJECTED" &&
                    //   decision !== "RESUBMITTED" &&
                    //   (!riskData?.length ||
                    //     !riskData.every(
                    //       (item) =>
                    //         item.status?.trim() &&
                    //         (item.status === "No" || item.riskLevel?.trim()),
                    //     ))
                    // }
                    placeholder='Enter the Comments'
                    multiline
                    rows={4}
                    variant='outlined'
                    fullWidth
                  />

                  {/* {(decision === "RESUBMITTED" || decision === "REJECTED") &&
                      !comments.trim() && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#E63946",
                            display: "block",
                            mt: 0.5,
                            fontSize: "12px",
                          }}
                        >
                          Comments are required for this decision
                        </Typography>
                      )} */}
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
                    onClick={() => handleSubmit("COMPLETED")}
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
                    Mark as complete
                  </Button>
                </Grid>
                <Grid item xs={12} sm='auto'>
                  <Button
                    variant='outlined'
                    onClick={() => {
                      setModal(true);
                    }}
                    disabled={
                      !riskData?.some(
                        (item) => item.status?.trim() || item.riskLevel?.trim(),
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
                    Return to vendor
                  </Button>
                </Grid>

                <Grid item xs={12} sm='auto'>
                  <Button
                    variant='outlined'
                    onClick={() => handleSubmit("DRAFT")}
                    disabled={
                      !riskData?.some(
                        (item) => item.status?.trim() || item.riskLevel?.trim(),
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
                {allriskAssesmentData?.data?.assessment?.comments}
              </Typography>
            </Grid>
          )}
          {/* allriskAssesmentData?.headers?.[0]?.assessmentStatus !==
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
          )} */}

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
      <Modal
        open={modal}
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
          <ReturnRevaluationModal
            onClose={() => setModal(false)}
            revaluation_id={props.revaluation_id}
            email={props.email}
          />
        </Box>
      </Modal>
    </div>
  );
}
