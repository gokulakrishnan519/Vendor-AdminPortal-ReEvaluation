import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Chip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DescriptionIcon from "@mui/icons-material/Description";
import styled from "@emotion/styled";
import UserContext from "../../../../UseContext/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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

// Main Component
export default function CompanyInfoDashboard() {
  const [selected, setSelected] = useState(0);
  const { formData, setFormData } = React.useContext(UserContext);

  const menuItems = [
    "General Information ",
    "Financial & Commercial",
    "Distribute Information",
    "Quality Management",
    "Declaration",
  ];

  const navigate = useNavigate();

  const handleViewFile = async (attachid, attchfor, attchname, contenttype) => {
    try {
      const response = await axios.post(
        "http://10.10.0.115:8095/api/vendor-onboarding/file-content/fetch",
        {
          AttachmentId: attachid,
          ProspectId: formData?.PROSPECT_ID,
          AttachmentFor: attchfor,
          FileName: attchname,
        },
        {
          responseType: "blob",
        },
      );

      // Create blob URL
      const file = new Blob([response.data], {
        type: contenttype || response.data.type,
      });

      const fileURL = window.URL.createObjectURL(file);

      // Open in new tab
      window.open(fileURL, "_blank");

      // Optional cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(fileURL);
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
    }
  };
  const questionnaire = formData?.qualityQuestionnaire || {};

  const qualityQuestions = [
    {
      question: "Are instruments used calibrated?",
      responseKey: "INSTRUMENTSCALIBRATED",
      remarkKey: "INSTRUMENTSCALIBRATEDREMARK",
    },
    {
      question: "Are adequate equipment and trained manpower available?",
      responseKey: "ADEQUATEEQUIPMENT",
      remarkKey: "ADEQUATEEQUIPMENTREMARK",
    },
    {
      question: "Do you have a dedicated quality function?",
      responseKey: "DEDICATEDQUALITYFUNCTION",
      remarkKey: "DEDICATEDQUALITYFUNCTIONREMARK",
    },
    {
      question: "Do you supply CoC/Test Report?",
      responseKey: "SUPPLYCOC",
      remarkKey: "SUPPLYCOCREMARK",
    },
    {
      question: "Do you retain CoC/Test Reports for 15 years?",
      responseKey: "RETAINCOC15YEARS",
      remarkKey: "RETAINCOC15YEARSREMARK",
    },
    {
      question: "Do you have a corrective action system?",
      responseKey: "CORRECTIVEACTIONSYSTEM",
      remarkKey: "CORRECTIVEACTIONSYSTEMREMARK",
    },
    {
      question: "Does your packing ensure no damages?",
      responseKey: "PACKINGENSURESNODAMAGE",
      remarkKey: "PACKINGENSURESNODAMAGEREMARK",
    },
    {
      question: "Will you meet Hi-Q's shelf-life requirements?",
      responseKey: "MEETSHELFLIFEREQUIREMENTS",
      remarkKey: "MEETSHELFLIFEREQUIREMENTSREMARK",
    },
    {
      question: "Are employees aware of ethical behavior?",
      responseKey: "EMPLOYEESAWAREETHICS",
      remarkKey: "EMPLOYEESAWAREETHICSREMARK",
    },
    {
      question: "Do you have a counterfeit prevention system?",
      responseKey: "PREVENTCOUNTERFEITPARTS",
      remarkKey: "PREVENTCOUNTERFEITPARTSREMARK",
    },
    {
      question: "Will you notify Hi-Q of organizational changes?",
      responseKey: "NOTIFYORGANIZATIONCHANGES",
      remarkKey: "NOTIFYORGANIZATIONCHANGESREMARK",
    },
  ];
  return (
    <Grid sx={{ mt: 3, borderRadius: "8px", backgroundColor: "white" }}>
      <Grid container>
        {/* Left Menu */}
        <Grid
          size={{ lg: 2.3, xs: 6, md: 6, sm: 6 }}
          sx={{
            bgcolor: "#F2F3F4",
            // borderRight: "1px solid #E5E5E5",
            borderRadius: "8px",
            height: "250px",
          }}
        >
          <List disablePadding>
            {menuItems.map((item, index) => (
              <ListItemButton
                key={index}
                selected={selected === index}
                onClick={() => setSelected(index)}
                sx={{
                  py: 1.5,
                  justifyContent: "center",
                  "&.Mui-selected": {
                    bgcolor: "#fff",
                    color: "#1A56DB",
                    fontWeight: 600,
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    borderLeft: "4px solid #1A56DB",
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "#fff",
                  },
                }}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontSize: "12px",
                    fontWeight: selected === index ? 600 : 500,
                    textAlign: "center",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>

        {/* Right Content */}
        <Grid size={{ lg: 9.7, xs: 6, md: 6, sm: 6 }}>
          {selected === 0 ? (
            <Box p={3}>
              {/* Company Information */}
              <SectionHeading>Company Information</SectionHeading>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Company Name</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.COMPANYNAME || "-"}
                  </FieldValue>
                </Grid>
                {/* 
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Company Registration Number</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.COMPANYREGISTERNUMBER || "-"}
                  </FieldValue>
                </Grid> */}

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Nature of Company</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.NATUREOFCOMPANY || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Nature of Business</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.NATUREOFBUSINESS || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Scope of Supply</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.SCOPEOFSUPPLY || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Year of Establishment</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.YEAROFESTABLISHMENT || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Number of Employees</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.NUMBEROFEMPLOYEES || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Country of Origin</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.COUNTRYOFORIGIN || "-"}
                  </FieldValue>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Supply Locations</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.CURRENTSUPPLYLOCATION?.length
                      ? formData.GENERALINFORMATION.CURRENTSUPPLYLOCATION.join(
                          ", ",
                        )
                      : "-"}
                  </FieldValue>
                </Grid>
              </Grid>

              {/* Company Address */}
              <SectionHeading sx={{ mt: 4 }}>Company Address</SectionHeading>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Country</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.COUNTRY || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>State</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.STATE || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>City</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.CITY || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Street</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.STREET || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Postal Code</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.POSTALCODE == "OTH"
                      ? "Others"
                      : formData?.GENERALINFORMATION?.POSTALCODE || "-"}
                  </FieldValue>
                </Grid>
              </Grid>

              {/* Contact Information */}
              <SectionHeading sx={{ mt: 4 }}>
                Contact Information
              </SectionHeading>

              <TableContainer
                component={Paper}
                variant='outlined'
                sx={{ borderRadius: 2 }}
              >
                <Table size='small'>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Contact Person
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Designation
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Email Address
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Mobile Number
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ fontSize: "12px", fontWeight: 600 }}
                      >
                        Primary
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData?.contacts && Array.isArray(formData.contacts) ? (
                      formData.contacts.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.CONTACTPERSONNAME || "-"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.DESIGNATION || "-"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.EMAIL || "-"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.MOBILENUMBER || "-"}
                          </TableCell>
                          <TableCell align='center'>
                            {item?.ISPRIMARY && (
                              <CheckIcon sx={{ fontSize: "18px" }} />
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align='center'>
                          No contacts available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Business Details */}
              <SectionHeading sx={{ mt: 4 }}>Business Details</SectionHeading>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Working Time Zone</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.WORKINGTIMEZONE || "-"}
                  </FieldValue>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FieldLabel>Weekly Holiday</FieldLabel>
                  <FieldValue>
                    {formData?.GENERALINFORMATION?.WEEKLYHOLIDAY || "-"}
                  </FieldValue>
                </Grid>
              </Grid>
            </Box>
          ) : selected === 1 ? (
            <Box p={3}>
              {/* Supplier Information */}
              <SectionHeading>Supplier Information</SectionHeading>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Supplier Type
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.SUPPLIERTYPE || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Payment Terms
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.PAYMENTTERMS || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Delivery Terms
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.DELIVERYTERMS || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Currency
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.CURRENCY || "-"}
                  </Typography>
                </Grid>
              </Grid>

              {/* Banking Information */}
              <Typography
                variant='h6'
                fontWeight={600}
                mt={4}
                mb={2}
                sx={{ fontSize: "16px" }}
              >
                Banking Information
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Bank Name
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.BANKNAME || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Bank Address
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.BANKADDRESS || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Account Number
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.BANKACCOUNTNUMBER || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    IFSC Code
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.IFSCCODE || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Beneficiary Name
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.BENEFICIARYNAME || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Contact Number
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.BANKCONTACTNUMBER || "-"}
                  </Typography>
                </Grid>
              </Grid>

              {/* Registration Details */}
              <Typography
                variant='h6'
                fontWeight={600}
                mt={4}
                mb={2}
                sx={{ fontSize: "16px" }}
              >
                Registration Details
              </Typography>

              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    PAN Number
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.PANNUMBER || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Registration Type
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.REGISTRATIONTYPE || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Registration Number
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.REGISTRATIONNUMBER || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Factory Licence Number
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.FINANCIALCOMMERCIAL?.FACTORYLICENCENUMBER || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Factory Licence
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      mt: 0.5,
                      cursor: "pointer",
                      color: "primary.main",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      handleViewFile(
                        formData?.FINANCIALCOMMERCIAL?.ATTACHMENTID,
                        formData?.FINANCIALCOMMERCIAL?.ATTACHMENTFOR,
                        formData?.FINANCIALCOMMERCIAL?.FACTORYLICENSEFILENAME,
                        formData?.FINANCIALCOMMERCIAL?.CONTENTTYPE,
                      )
                    }
                  >
                    <DescriptionIcon sx={{ fontSize: "16px", mr: 0.5 }} />
                    {formData?.FINANCIALCOMMERCIAL?.FACTORYLICENSEFILENAME ||
                      "-"}
                  </Typography>
                </Grid>
              </Grid>
              <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                Legal Documents
              </Typography>
              <TableContainer
                component={Paper}
                variant='outlined'
                sx={{ borderRadius: 2, mb: 4, mt: 2 }}
              >
                <Table size='small'>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRight: "0.5px solid lightgray",
                        }}
                      >
                        Document Name
                      </TableCell>

                      <TableCell
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        File
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {formData?.legaldocument &&
                    Array.isArray(formData.legaldocument) ? (
                      formData.legaldocument.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.DOCUMENTNAME || "-"}
                          </TableCell>

                          <TableCell sx={{ fontSize: "13px" }}>
                            {/* <DescriptionIcon sx={{ fontSize: "16px" }} />

                            {item?.ATTACHMENTNAME || "No attachment"} */}
                            <Typography
                              sx={{
                                fontSize: "13px",
                                mt: 0.5,
                                cursor: "pointer",
                                color: "primary.main",
                                textDecoration: "underline",
                                textAlign: "center",
                              }}
                              onClick={() =>
                                handleViewFile(
                                  item.ATTACHMENTID,
                                  item.ATTACHMENTFOR,
                                  item.LEGALFILENAME,
                                  item.CONTENTTYPE,
                                )
                              }
                            >
                              <DescriptionIcon sx={{ fontSize: "16px" }} />
                              {item.LEGALFILENAME || "-"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align='center'>
                          No certifications available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <TableContainer
                component={Paper}
                variant='outlined'
                sx={{ borderRadius: 2 }}
              >
                <Table size='small'>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Registration Type
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Registration Number
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Document
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {formData?.FINANCIALCOMMERCIAL?.SUPPLIERTYPE || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {formData?.FINANCIALCOMMERCIAL?.REGISTRATIONNUMBER ||
                          "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        <DescriptionIcon sx={{ fontSize: "16px" }} />

                        {formData?.FINANCIALCOMMERCIAL
                          ?.FACTORYLICENSEFILENAME || "No document"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer> */}

              {/* Business References */}
              <Typography
                variant='h6'
                fontWeight={600}
                mt={4}
                mb={2}
                sx={{ fontSize: "16px" }}
              >
                Business References
              </Typography>

              <TableContainer
                component={Paper}
                variant='outlined'
                sx={{ borderRadius: 2 }}
              >
                <Table size='small'>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Customer Name
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Industry
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Country
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {formData?.businessReference &&
                    Array.isArray(formData.businessReference) ? (
                      formData.businessReference.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.CUTOMERNAME || "-"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.INDUSTRY || "-"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.COUNTRY || "-"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align='center'>
                          No business references available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : selected === 2 ? (
            <Box p={3}>
              {/* Distributor Status */}
              <SectionHeading>Distributor Status</SectionHeading>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Authorized Distributor
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {formData?.DISTRIBUTORAUTHORIZATION === true ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>

              {formData?.DISTRIBUTORAUTHORIZATION === true && (
                <>
                  {/* OEM Details */}
                  <Typography
                    variant='h6'
                    fontWeight={600}
                    mt={4}
                    mb={2}
                    sx={{ fontSize: "16px" }}
                  >
                    OEM Details
                  </Typography>

                  <TableContainer
                    component={Paper}
                    variant='outlined'
                    sx={{ borderRadius: 2 }}
                  >
                    <Table size='small'>
                      <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                        <TableRow>
                          <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                            OEM Name
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                            Authorization Certificate
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {formData?.oemdetails &&
                        Array.isArray(formData.oemdetails) ? (
                          formData.oemdetails.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {item?.OEMNAME || "-"}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    mt: 0.5,
                                    cursor: "pointer",
                                    color: "primary.main",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() =>
                                    handleViewFile(
                                      item.ATTACHMENTID,
                                      item.ATTACHMENTFOR,
                                      item.CERTIFICATENAME,
                                      item.CONTENTTYPE,
                                    )
                                  }
                                >
                                  <DescriptionIcon sx={{ fontSize: "16px" }} />
                                  {item.CERTIFICATENAME || "-"}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} align='center'>
                              No OEM details available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Box>
          ) : selected === 3 ? (
            <Box p={3}>
              {/* Certifications & Accreditations */}
              <SectionHeading>Certifications & Accreditations</SectionHeading>

              <TableContainer
                component={Paper}
                variant='outlined'
                sx={{ borderRadius: 2, mb: 4 }}
              >
                <Table size='small'>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRight: "0.5px solid lightgray",
                        }}
                      >
                        Certification
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRight: "0.5px solid lightgray",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRight: "0.5px solid lightgray",
                        }}
                      >
                        Certificate Number
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRight: "0.5px solid lightgray",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Valid Until
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        Certificate
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {formData?.certification &&
                    Array.isArray(formData.certification) ? (
                      formData.certification.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.CERTIFICATIONTYPE || "-"}
                          </TableCell>
                          <TableCell align='center' sx={{ fontSize: "13px" }}>
                            <Chip
                              label={item?.STATUS || "N/A"}
                              size='small'
                              sx={{
                                bgcolor: "#E6EDF8",
                                color: "#0C52BC",
                                fontWeight: 600,
                                fontSize: "12px",
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {item?.CERTIFICATIONNUMBER || "-"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {dayjs(item.VALIDUNTIL).format("DD-MMM-YYYY") ||
                              "-"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {/* <DescriptionIcon sx={{ fontSize: "16px" }} />

                            {item?.ATTACHMENTNAME || "No attachment"} */}
                            <Typography
                              sx={{
                                fontSize: "13px",
                                mt: 0.5,
                                cursor: "pointer",
                                color: "primary.main",
                                textDecoration: "underline",
                              }}
                              onClick={() =>
                                handleViewFile(
                                  item.ATTACHMENTID,
                                  item.ATTACHMENTFOR,
                                  item.ATTACHMENTNAME,
                                  item.CONTENTTYPE,
                                )
                              }
                            >
                              <DescriptionIcon sx={{ fontSize: "16px" }} />
                              {item.ATTACHMENTNAME || "-"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align='center'>
                          No certifications available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Quality Assurance Questionnaire */}
              <Typography
                variant='h6'
                fontWeight={600}
                mt={4}
                mb={2}
                sx={{ fontSize: "16px" }}
              >
                Quality Assurance Questionnaire
              </Typography>

              <TableContainer
                component={Paper}
                variant='outlined'
                sx={{ borderRadius: 2 }}
              >
                <Table size='small'>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Question
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Response
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Remark
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {qualityQuestions.map((item) => (
                      <TableRow key={item.responseKey}>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {item.question}
                        </TableCell>

                        <TableCell sx={{ fontSize: "13px" }}>
                          {questionnaire[item.responseKey] || "-"}
                        </TableCell>

                        <TableCell sx={{ fontSize: "13px" }}>
                          {questionnaire[item.remarkKey] || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : selected === 4 ? (
            <Box p={3}>
              {/* Review & Declaration */}
              <SectionHeading>Review & Declaration</SectionHeading>

              <TableContainer
                component={Paper}
                variant='outlined'
                sx={{ borderRadius: 2, mb: 4 }}
              >
                <Table size='small'>
                  <TableHead sx={{ bgcolor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Authorized Representative
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Designation
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Email
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>
                        Mobile Number
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {formData?.declaration?.TITLE || ""}
                        {formData?.declaration?.NAME || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {formData?.declaration?.DESIGNATION || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {formData?.declaration?.EMAIL || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {formData?.declaration?.MOBILENUMBER || "-"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Submission Details */}
              <Typography
                variant='h6'
                fontWeight={600}
                mt={4}
                mb={2}
                sx={{ fontSize: "16px" }}
              >
                Submission Details
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography fontWeight={600} sx={{ fontSize: "13px" }}>
                    Date of Submission
                  </Typography>
                  <Typography sx={{ fontSize: "13px", mt: 0.5 }}>
                    {dayjs(formData?.declaration?.DATESUBMISSION).format(
                      "DD-MMM-YYYY",
                    ) || "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
