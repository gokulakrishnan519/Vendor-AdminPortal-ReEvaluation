import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "@emotion/styled";
import axios from "axios"; // ✅ ADD THIS IMPORT
import UserContext from "../../../../UseContext/UserContext";
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "../../../../style";

// Styled Components
const CertificateItem = styled(ListItemButton)`
  padding: 16px;
  margin-bottom: 8px;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;

  &.Mui-selected {
    background-color: #f0f0f0;
    border-left-color: #1a56db;
    font-weight: 600;
    color: #1a56db;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function Documents() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [iframeData, setIframeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { formData } = useContext(UserContext);

  const currentCert = formData?.certificationDocuments?.[selectedIndex];

  console.log(formData);

  const navigate = useNavigate();

  // ✅ FIXED: Proper async function
  const handleView = async (cert) => {
    if (!cert) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://10.50.20.89:9091/api/vendor-onboarding/file-content/fetch",
        {
          AttachmentId: cert?.ATTACHMENTID,
          ProspectId: formData?.PROSPECT_ID,
          AttachmentFor: cert?.ATTACHMENTFOR,
          // VendAccount: formData?.VENDOR_ACCOUNT,
          FileName: cert?.ATTACHMENTNAME,
        },
        {
          responseType: "blob",
        },
      );

      // ✅ Convert blob to base64 for iframe
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1];
        const mimeType = cert.CONTENTTYPE || "application/pdf";
        setIframeData({
          data: base64data,
          mimeType: mimeType,
          fileName: cert.ATTACHMENTNAME,
        });
        setLoading(false);
      };
      reader.readAsDataURL(response.data);
    } catch (err) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  // ✅ FIXED: Proper download function
  const handleDownload = async (cert) => {
    if (!cert) return;

    try {
      const response = await axios.post(
        "http://10.50.20.89:9091/api/vendor-onboarding/file-content/fetch",
        {
          AttachmentId: cert?.ATTACHMENTID,
          ProspectId: formData?.PROSPECT_ID,
          AttachmentFor: cert?.ATTACHMENTFOR,

          FileName: cert?.ATTACHMENTNAME,
        },
        {
          responseType: "blob",
        },
      );

      // ✅ Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", cert.ATTACHMENTNAME);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      navigate("/ErrorHandling");
      sessionStorage.setItem("errormessge", errorMessage);
      setLoading(false);
    }
  };

  return (
    <Grid sx={{ mt: 2, backgroundColor: "white" }}>
      <Grid container>
        {/* Left Sidebar */}
        <Grid
          size={{ lg: 3, xs: 12, md: 4, sm: 6 }}
          sx={{ bgcolor: "#F2F3F4" }}
        >
          <List disablePadding>
            {formData?.certificationDocuments?.map((item, index) => (
              <ListItemButton
                key={item.CERTIFICATIONID}
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  setIframeData(null); // ✅ Reset when selecting new cert
                }}
                sx={{
                  py: 1,
                  "&.Mui-selected": {
                    bgcolor: "#fff",
                    color: "#1A56DB",
                    borderLeft: "4px solid #1A56DB",
                  },
                }}
              >
                <ListItemText
                  primary={
                    item.CERTIFICATIONTYPE == undefined
                      ? "No"
                      : item.CERTIFICATIONTYPE
                  }
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: selectedIndex === index ? 600 : 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>

        {/* Right Content */}
        <Grid size={{ lg: 9, xs: 12, md: 8, sm: 6 }} sx={{ p: 3 }}>
          {currentCert ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {currentCert.ATTACHMENTNAME}
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant='contained'
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleView(currentCert)}
                    disabled={loading}
                    sx={{
                      ...buttonStyle,
                      bgcolor: "#1A56DB",
                      textTransform: "none",
                      "&:disabled": {
                        bgcolor: "#ccc",
                      },
                    }}
                  >
                    {loading ? "Loading..." : "View"}
                  </Button>

                  <Button
                    variant='contained'
                    startIcon={<CloudDownloadIcon />}
                    onClick={() => handleDownload(currentCert)}
                    sx={{
                      ...buttonStyle,
                      bgcolor: "#1A56DB",
                      textTransform: "none",
                    }}
                  >
                    Download
                  </Button>
                </Box>
              </Box>

              {/* Error Message */}
              {error && (
                <Alert
                  severity='error'
                  sx={{ mb: 2 }}
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              )}

              {/* Loading State */}
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 600,
                    bgcolor: "#f9f9f9",
                    borderRadius: 1,
                  }}
                >
                  <CircularProgress />
                </Box>
              )}

              {/* Iframe or Initial State */}
              {!loading && (
                <Card
                  sx={{
                    height: 600,
                    overflow: "hidden",
                  }}
                >
                  {iframeData ? (
                    <iframe
                      src={`data:${iframeData.mimeType};base64,${iframeData.data}`}
                      title={iframeData.fileName}
                      width='100%'
                      height='100%'
                      style={{ border: "none" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        bgcolor: "#f9f9f9",
                        color: "#999",
                      }}
                    >
                      <Typography>
                        Click "View" to display the document
                      </Typography>
                    </Box>
                  )}
                </Card>
              )}

              {/* Certificate Details */}
              <Box sx={{ mt: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                  📄 {currentCert.ATTACHMENTNAME}
                </Typography>

                <Typography sx={{ fontSize: 11, color: "#777", mt: 1 }}>
                  Certificate No: {currentCert.CERTIFICATIONNUMBER}
                </Typography>

                <Typography sx={{ fontSize: 11, color: "#777" }}>
                  Valid Until: {currentCert.VALIDUNTIL}
                </Typography>
              </Box>
            </>
          ) : (
            <Typography>No Certificate Selected</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
