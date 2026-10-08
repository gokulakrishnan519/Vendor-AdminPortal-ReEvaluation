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
import Registration from "./Child/Registration";
import Documents from "./Child/Documents";
import RiskAssesment from "./Child/RiskAssesment";
import Approvals from "./Child/Approvals";
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
import { useNavigate } from "react-router-dom";
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

export default function ProspectWorkspace() {
  const [tab, setTab] = React.useState(0);
  const [activeTab, setActiveTab] = useState("Registration Forms");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const steps = ["Registration", "Evaluation", "Approvals", "Vendor Created"];

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
    ...(formData?.STATUS === "TO_EVALUATE"
      ? []
      : formData?.STATUS === "IN_APPROVAL"
        ? [
            {
              id: 4,
              label: "Approvals",
              img: Approvalsicon,
              activeimg: ApprovalsiconActive,
            },
          ]
        : formData?.STATUS === "RESUBMITTED"
          ? []
          : formData?.STATUS === "REJECTED"
            ? []
            : sessionStorage.getItem("RoleName") == "Risk Assessment"
              ? [
                  {
                    id: 4,
                    label: "Approvals",
                    img: Approvalsicon,
                    activeimg: ApprovalsiconActive,
                  },
                  {
                    id: 5,
                    label: "Review",
                    img: ReviewIcon,
                    activeimg: ReviewIconActive,
                  },
                ]
              : [
                  {
                    id: 4,
                    label: "Approvals",
                    img: Approvalsicon,
                    activeimg: ApprovalsiconActive,
                  },
                  // {
                  //   id: 5,
                  //   label: "Review",
                  //   img: Approvalsicon,
                  // },
                ]),
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
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProspectorData();
  }, []);

  const statusColors = {
    INVITED: {
      bg: "#E8EDFF",
      color: "#6788FF",
    },
    DRAFT: {
      bg: "#F5F5F5",
      color: "#616161",
    },
    TO_EVALUATE: {
      bg: "#FEF0DA",
      color: "#F99709",
    },
    IN_APPROVAL: {
      bg: "#EAE7FF",
      color: "#725CFC",
    },
    RETURNED: {
      bg: "#EEF0F0",
      color: "#8E9696",
    },
    RESUBMITTED: {
      bg: "#E8EDFF",
      color: "#6788FF",
    },
    APPROVED: {
      bg: "#DEF6F2",
      color: "#21BFA7",
    },
    REJECTED: {
      bg: "#FBE3EA",
      color: "#E34472",
    },
    VENDOR_CREATED: {
      bg: "#E0F7FA",
      color: "#00838F",
    },
  };

  const chipStyle = statusColors[formData?.STATUS] || {
    bg: "#ECEFF1",
    color: "#455A64",
  };

  const getActiveStep = (status) => {
    switch (status) {
      case "INVITED":
      case "DRAFT":
        return 0; // Registration

      case "TO_EVALUATE":
        return 1; // Evaluation

      case "IN_APPROVAL":
      case "RETURNED":
      case "RESUBMITTED":
      case "APPROVED":
      case "REJECTED":
        return 2; // Approvals

      case "VENDOR_CREATED":
        return 3; // Vendor Created

      default:
        return 0;
    }
  };

  const activeStep = getActiveStep(formData?.STATUS);

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
                      <b>Prospect ID</b>&nbsp;&nbsp; {formData?.PROSPECT_ID}
                    </Typography>
                  </Grid>

                  {/* <Grid item>
                <Typography>
                  <b>Vendor Account</b>&nbsp;&nbsp;{formData?.VENDOR_ACCOUNT}
                </Typography>
              </Grid> */}

                  <Grid item>
                    <Typography>
                      <b>Email</b>&nbsp;&nbsp;
                      {formData?.contacts?.[0]?.EMAIL || "-"}
                    </Typography>
                  </Grid>

                  {/* <Grid item>
                    <Typography>
                      <b>Vendor Group</b>&nbsp;&nbsp;
                      {formData?.FINANCIALCOMMERCIAL?.SUPPLIERTYPE}
                    </Typography>
                  </Grid> */}

                  <Grid item>
                    <Typography>
                      <b>Supplier Type</b>&nbsp;&nbsp;
                      {formData?.FINANCIALCOMMERCIAL?.SUPPLIERTYPE}
                    </Typography>
                  </Grid>

                  <Grid item display='flex' alignItems='center'>
                    <Typography fontWeight={600} mr={2}>
                      Status
                    </Typography>

                    <Chip
                      label={formData?.STATUS?.replace(/_/g, " ")}
                      sx={{
                        bgcolor: chipStyle.bg,
                        color: chipStyle.color,
                        fontWeight: 600,
                        borderRadius: "20px",
                        px: 2,
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Timeline */}
                <Box
                  sx={{
                    width: 550,
                    mt: 5,
                    mx: "auto", // Centers the Box horizontally
                  }}
                >
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

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
                    Prospect Workspace
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
                      <Registration />
                    ) : activeTab == "Documents" ? (
                      <Documents />
                    ) : activeTab == "Risk Assesment" ? (
                      <RiskAssesment getProspectorData={getProspectorData} />
                    ) : activeTab == "Approvals" ? (
                      <Approvals getProspectorData={getProspectorData} />
                    ) : activeTab == "Review" ? (
                      <Review getProspectorData={getProspectorData} />
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
