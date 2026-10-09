import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Tabs,
  Tab,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../../Navbars/Navbar";
import Overview from "./Child/Overview";
import Documents from "./Child/Documents";
import RiskAssesment from "./Child/RiskAssesment";
import RevaluationProfile from "./Child/RevaluationProfile";
import Registrationicon from "../../../Images/Prospects/RegisterationIcon.png";
import RegistrationiconActive from "../../../Images/Prospects/Registration Form Active.png";
import Documentsicon from "../../../Images/Prospects/Documents Icon.png";
import DocumentsiconActive from "../../../Images/Prospects/Documents Active Icon.png";
import Approvalsicon from "../../../Images/Prospects/Approvals Icon.png";
import ApprovalsiconActive from "../../../Images/Prospects/Approvals Active Icon.png";
import RiskAssesmenticon from "../../../Images/Prospects/RiskAssesment.png";
import RiskAssesmenticonActive from "../../../Images/Prospects/To Evaluate Blue.png";
import ReviewIcon from "../../../Images/Prospects/Review Icon.png";
import ReviewIconActive from "../../../Images/Prospects/Review Icon - Active.png";
import Review from "./Child/Review";
import axios from "axios";
import UserContext from "../../../UseContext/UserContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../Loading/Loading";

const FONT = "'Poppins', sans-serif";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6366F1" },
    background: { default: "#F8FAFC", paper: "#FFFFFF" },
    text: { primary: "#0F172A", secondary: "#64748B" },
  },
  typography: {
    fontFamily: FONT,
    fontSize: 12,
  },
  shape: { borderRadius: 6 },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: { fontFamily: FONT },
        message: { fontFamily: FONT },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { fontFamily: FONT },
      },
    },
  },
});

const statusColors = {
  "Not Started": {
    bg: "#EAE7FF",
    color: "#725CFC",
  },
  "Awaiting Response": {
    bg: "#FEF0DA",
    color: "#F99709",
  },
  "Validation In Progress": {
    bg: "#E8EDFF",
    color: "#6788FF",
  },
  Returned: {
    bg: "#E8EDFF",
    color: "#6788FF",
  },
  Completed: {
    bg: "#DEF6F2",
    color: "#21BFA7",
  },
  Cancelled: {
    bg: "#FBE3EA",
    color: "#E34472",
  },
};

const statusLabels = {
  "Not Started": "Not Started",
  "Awaiting Response": "Awaiting Response",
  "Validation In Progress": "Validation In Progress",
  Returned: "Returned",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

const riskColors = {
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

const riskLabels = {
  Critical: "Critical",
  High: "High",
  Elevated: "Elevated",
  Medium: "Medium",
  Low: "Low",
};

const chipStyle = {
  height: "22px",
  fontSize: "11px",
  minWidth: "75px",
  fontWeight: 500,
  fontFamily: "Poppins, sans-serif",
  "& .MuiChip-label": {
    px: "6px",
  },
};

export default function ParentReevaluation() {
  const [tab, setTab] = React.useState(0);
  const [activeTab, setActiveTab] = useState("Registration Forms");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [getTopData, setGetTopData] = useState(null);
  const [riskLevelUpdate, setRiskLevelUpdate] = useState(false);

  const location = useLocation();

  const {
    riskLevel,
    lastreevaluation,
    nextreevaluationdate,
    status,
    revaluation_id,
    email,
  } = location.state || {};

  console.log("Risk Level:", riskLevel);
  console.log("Last Reevaluation:", lastreevaluation);
  console.log("Next Reevaluation:", nextreevaluationdate);
  console.log("Status:", status);

  const navigate = useNavigate();

  const tabs = [
    {
      id: 1,
      label: "Registration Forms",
      img: Registrationicon,
      activeimg: RegistrationiconActive,
    },
    {
      id: 2,
      label: "Documents",
      img: Documentsicon,
      activeimg: DocumentsiconActive,
    },
    {
      id: 3,
      label: "Risk Assesment",
      img: RiskAssesmenticon,
      activeimg: RiskAssesmenticonActive,
    },
    {
      id: 4,
      label: "Revalution Profile",
      img: Approvalsicon,
      activeimg: ApprovalsiconActive,
    },
  ];

  const getProspectorData = async () => {
    setLoading(true);
    const payload = {
      PROSPECT_ID: sessionStorage.getItem("Prospect_id"),
    };

    try {
      const response = await axios.post(
        "http://10.10.0.115:8095/api/vendor-onboarding/fetch",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setFormData({
        ...response.data,

        contacts: response.data?.contacts?.length
          ? response.data.contacts
          : [
              {
                CONTACTPERSONNAME: "",
                DESIGNATION: "",
                EMAIL: "",
                MOBILENUMBER: "",
                ISPRIMARY: false,
              },
            ],

        businessReference: response.data?.businessReference?.length
          ? response.data.businessReference
          : [
              {
                CUTOMERNAME: "",
                INDUSTRY: "",
                COUNTRY: "",
              },
            ],

        oemdetails: response.data?.oemdetails?.length
          ? response.data.oemdetails
          : [
              {
                OEMNAME: "",
                CERTIFICATE: "",
              },
            ],

        certification: response.data?.certification?.length
          ? response.data.certification.filter(
              (item) =>
                item.ATTACHMENTNAME !== null && item.STATUS == "available",
            )
          : [
              {
                CERTIFICATIONTYPE: "ISO 9001",
                STATUS: "",
                CERTIFICATIONNUMBER: "",
                VALIDUNTIL: null,
                ATTACHMENT: null,
              },
              {
                CERTIFICATIONTYPE: "AS9100",
                STATUS: "",
                CERTIFICATIONNUMBER: "",
                VALIDUNTIL: null,
                ATTACHMENT: null,
              },
              {
                CERTIFICATIONTYPE: "ISO/IEC 17025",
                STATUS: "",
                CERTIFICATIONNUMBER: "",
                VALIDUNTIL: null,
                ATTACHMENT: null,
              },
              {
                CERTIFICATIONTYPE: "DLA Approval",
                STATUS: "",
                CERTIFICATIONNUMBER: "",
                VALIDUNTIL: null,
                ATTACHMENT: null,
              },
              {
                CERTIFICATIONTYPE: "NABL Accreditation",
                STATUS: "",
                CERTIFICATIONNUMBER: "",
                VALIDUNTIL: null,
                ATTACHMENT: null,
              },
            ],

        certificationDocuments: response.data?.certification?.length
          ? [
              // Existing certifications (remove null attachment names)
              // ...response.data.certification.filter(
              //   (item) => item.ATTACHMENTNAME !== null,
              // ),

              // Factory License
              ...(response.data?.FINANCIALCOMMERCIAL?.FACTORYLICENSEFILENAME
                ? [
                    {
                      ATTACHMENTID:
                        response.data.FINANCIALCOMMERCIAL.ATTACHMENTID,
                      ATTACHMENTFOR:
                        response.data.FINANCIALCOMMERCIAL.ATTACHMENTFOR,
                      ATTACHMENTNAME:
                        response.data.FINANCIALCOMMERCIAL
                          .FACTORYLICENSEFILENAME,
                      CONTENTTYPE:
                        response.data.FINANCIALCOMMERCIAL.CONTENTTYPE,
                      CERTIFICATIONTYPE: "Factory Licence",
                    },
                  ]
                : []),

              // OEM Certificate (only if Distributor Authorization is Yes)
              ...(response.data?.DISTRIBUTORAUTHORIZATION === true
                ? response.data.oemdetails
                    .filter((item) => item.CERTIFICATENAME)
                    .map((item, index) => ({
                      ATTACHMENTID: item.ATTACHMENTID,
                      ATTACHMENTFOR: item.ATTACHMENTFOR,
                      ATTACHMENTNAME: item.CERTIFICATENAME,
                      CONTENTTYPE: item.CONTENTTYPE,
                      CERTIFICATIONTYPE: item.OEMNAME + " OEM Certificate",
                    }))
                : []),

              // Certification Attachments
              ...response.data.certification
                .filter(
                  (item) =>
                    item.ATTACHMENTNAME !== null && item.STATUS == "available",
                )
                .map((item) => ({
                  ATTACHMENTID: item.ATTACHMENTID,
                  ATTACHMENTFOR: item.ATTACHMENTFOR,
                  ATTACHMENTNAME: item.ATTACHMENTNAME,
                  CONTENTTYPE: item.CONTENTTYPE,
                  CERTIFICATIONTYPE: item.CERTIFICATIONTYPE,
                })),

              ...response.data.legaldocument
                .filter((item) => item.LEGALFILENAME !== null)
                .map((item) => ({
                  ATTACHMENTID: item.ATTACHMENTID,
                  DOCUMENTNAME: item.DOCUMENTNAME,
                  ATTACHMENTFOR: item.ATTACHMENTFOR,
                  ATTACHMENTNAME: item.LEGALFILENAME,
                  CONTENTTYPE: item.CONTENTTYPE,
                  CERTIFICATIONTYPE: item.DOCUMENTNAME,
                })),
            ]
          : [],
      });

      setLoading(false);
    } catch (error) {
      // const errorMessage =
      //   error.response?.data?.message || error.message || "Login failed";

      // navigate("/ErrorHandling");
      // sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  const getHistoryList = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://10.10.0.115:8095/vendor-reevaluation/risk-level/get",
        {
          reevaluation_id: revaluation_id,
        },
      );

      const result = response.data?.data;

      setGetTopData(response.data?.data.current_risk_level);
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
    getHistoryList();
  }, [riskLevelUpdate]);

  useEffect(() => {
    getProspectorData();
  }, []);

  // const getActiveStep = (status) => {
  //   switch (status) {
  //     case "INVITED":
  //     case "DRAFT":
  //       return 0; // Registration

  //     case "TO_EVALUATE":
  //       return 1; // Evaluation

  //     case "IN_APPROVAL":
  //     case "RETURNED":
  //     case "RESUBMITTED":
  //     case "APPROVED":
  //     case "REJECTED":
  //       return 2; // Approvals

  //     case "VENDOR_CREATED":
  //       return 3; // Vendor Created

  //     default:
  //       return 0;
  //   }
  // };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                bgcolor: "#f4f6fb",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  background:
                    "linear-gradient(to bottom, #a2bde5 0%, #d6e2f4 100%)",
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                  p: 2,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    position: "absolute",
                    left: 16,
                    color: "#1f2937",
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>

                <Typography variant='h6' fontWeight={700}>
                  {formData?.GENERALINFORMATION?.COMPANYNAME}
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: "#F2F5F9",
                  p: 3,
                }}
              >
                {/* Information Row */}
                <Grid
                  container
                  spacing={4}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Grid item>
                    <Typography>
                      <b>Vendor Account</b>&nbsp;&nbsp;{" "}
                      {formData?.VENDOR_ACCOUNT}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography>
                      <b>Prospect ID</b>&nbsp;&nbsp; {formData?.PROSPECT_ID}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography>
                      <b>Email</b>&nbsp;&nbsp; {email || "-"}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography>
                      <b>Risk Level</b>&nbsp;&nbsp;{" "}
                      {riskLevel == null ? (
                        "-"
                      ) : (
                        <Chip
                          label={String(getTopData || "-")
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                          size='small'
                          sx={{
                            backgroundColor:
                              riskColors[
                                String(getTopData || "")
                                  .toLowerCase()
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase(),
                                  )
                              ]?.bg,
                            color:
                              riskColors[
                                String(getTopData || "")
                                  .toLowerCase()
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase(),
                                  )
                              ]?.color,
                            ...chipStyle,
                          }}
                        />
                      )}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography>
                      <b>Last Revaluation</b>&nbsp;&nbsp;{" "}
                      {lastreevaluation || "-"}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography>
                      <b>Next Revaluation</b>&nbsp;&nbsp;{" "}
                      {nextreevaluationdate || "-"}
                    </Typography>
                  </Grid>

                  <Grid item display='flex' alignItems='center'>
                    <Typography fontWeight={600} mr={2}>
                      Status
                    </Typography>
                    {status == null ? (
                      "-"
                    ) : (
                      <Chip
                        label={statusLabels[status] || status || "-"}
                        size='small'
                        sx={{
                          backgroundColor: statusColors[status]?.bg,
                          color: statusColors[status]?.color,
                          ...chipStyle,
                        }}
                      />
                    )}
                  </Grid>
                </Grid>

                <Paper
                  elevation={0}
                  sx={{
                    mt: 5,
                    borderRadius: 2,
                    p: 3,
                    backgroundColor: "#F9FAFC",
                  }}
                >
                  <Typography
                    align='center'
                    sx={{
                      fontWeight: 500,
                      fontSize: 18,
                      mb: 4,
                    }}
                  >
                    Revaluation Workspace
                  </Typography>

                  {/* Tabs */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      mt: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                        background: "#F2F3F4",
                        gap: "6px",
                        width: { xs: "100%", sm: "fit-content" },
                        justifyContent: "center",
                      }}
                    >
                      {tabs.map((tab, index) => {
                        const isActive = activeTab === tab.label;

                        return (
                          <Box
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            sx={{
                              minWidth: { xs: "100%", sm: "130px" },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              px: 2,
                              py: 0.9,
                              cursor: "pointer",
                              background: isActive ? "#DBE5F5" : "transparent",
                              color: isActive ? "#0C52BC" : "#2e2e2e",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                paddingLeft: 2,
                              }}
                            >
                              <Box
                                component='img'
                                src={isActive ? tab.activeimg : tab.img}
                                // alt={tab.label}
                                sx={{ height: 10, objectFit: "contain" }}
                              />
                              <Typography
                                sx={{
                                  fontFamily: "Poppins",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                              >
                                {tab.label}
                              </Typography>

                              <Box
                                sx={{
                                  bgcolor: isActive ? "#0C52BC" : "#E0E0E0",
                                  color: isActive ? "#fff" : "#333",
                                  borderRadius: "10px",
                                  px: "6px",
                                  fontSize: "10px",
                                  fontWeight: 500,
                                }}
                              >
                                {tab.count}
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                  <UserContext.Provider value={{ formData, setFormData }}>
                    {activeTab == "Registration Forms" ? (
                      <Overview />
                    ) : activeTab == "Documents" ? (
                      <Documents />
                    ) : activeTab == "Risk Assesment" ? (
                      <RiskAssesment
                        getProspectorData={getProspectorData}
                        revaluation_id={revaluation_id}
                        email={email}
                      />
                    ) : activeTab == "Revalution Profile" ? (
                      <>
                        <RevaluationProfile
                          getProspectorData={getProspectorData}
                          revaluation_id={revaluation_id}
                          setRiskLevelUpdate={setRiskLevelUpdate}
                          riskLevelUpdate={riskLevelUpdate}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </UserContext.Provider>
                </Paper>
              </Box>
              {/* Workspace */}
            </Box>
          </ThemeProvider>
        </Navbar>
      )}
    </div>
  );
}
