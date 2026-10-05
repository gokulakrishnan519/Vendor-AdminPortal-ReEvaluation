import { useEffect, useRef, useState } from "react";
import { Box, Card, Typography, Grid, Chip } from "@mui/material";

const VendorDetailsToopData = ({ topData, statCards }) => {
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { bottom } = sectionRef.current.getBoundingClientRect();
        setIsSticky(bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const vendorInitials = topData?.vendor_name
    ?.split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 3);

  return (
    <>
      <Box ref={sectionRef}>
        <Grid container spacing={2} alignItems='stretch' sx={{ mb: 2 }}>
          {/* ── Vendor Card ── */}
          <Grid size={{ lg: 3, xs: 12, md: 12, sm: 12 }}>
            <Card
              elevation={0}
              sx={{ borderRadius: "16px", overflow: "hidden", height: "100%" }}
            >
              {/* Banner */}
              <Box
                sx={{
                  background: "linear-gradient(to bottom, #93B2E1, #C9D8F0)",
                  height: 130,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* Avatar */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    bottom: -30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "#1a1a2e",
                      fontFamily: "Poppins, sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {vendorInitials}
                  </Typography>
                </Box>
              </Box>

              {/* Vendor Info */}
              <Box
                sx={{
                  pt: 5,
                  pb: 3,
                  px: 2,
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #f3f6fd 0%, #eaf1fc 100%)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 550,
                    fontSize: "1.1rem",
                    color: "#1a1a2e",
                  }}
                >
                  {topData?.vendor_name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "0.75rem",
                      color: "#1a1a2e",
                    }}
                  >
                    Vendor Account
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "0.75rem",
                      color: "#555",
                      fontWeight: 600,
                    }}
                  >
                    {topData?.vendor_account}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* ── Right Section ── */}
          <Grid size={{ lg: 9, xs: 12, md: 12, sm: 12 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              {/* Stat Cards */}
              <Grid container spacing={2} alignItems='stretch'>
                {statCards.map((stat, i) => (
                  <Grid size={{ lg: 3, xs: 6, md: 6, sm: 6 }} key={i}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: "8px",
                        boxShadow: "none",
                        background:
                          "linear-gradient(135deg, #c8ddf0 0%, #ddeaf8 60%, #eef4fc 100%)",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        px: 2.5,
                        py: 3.3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                            fontSize: "0.85rem",
                            color: "#334",
                            lineHeight: 1.3,
                            maxWidth: "60%",
                          }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                            fontSize: "2.2rem",
                            color: "#1a4fcc",
                            lineHeight: 1,
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Contact Information */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #f3f6fd 0%, #eaf1fc 100%)",
                  p: 3,
                  mt: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "#1a1a2e",
                    mb: 2,
                  }}
                >
                  Contact Information
                </Typography>

                <Grid container spacing={1}>
                  <Grid size={{ lg: 4, xs: 12 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography
                        fontWeight={600}
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Mobile Phone
                      </Typography>
                      <Typography
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {topData?.phone ?? "-"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ lg: 5, xs: 12 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography
                        fontWeight={600}
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Email
                      </Typography>
                      <Typography
                        fontSize='0.82rem'
                        sx={{
                          wordBreak: "break-all",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {topData?.email ?? "-"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ lg: 3, xs: 12 }}>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Typography
                        fontWeight={600}
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Portal Status
                      </Typography>
                      <Chip
                        label={topData?.kpis?.status}
                        size='small'
                        sx={{
                          width: 100,
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                          backgroundColor:
                            topData?.kpis?.status === "Active"
                              ? "rgba(33, 191, 167, 0.15)"
                              : "rgba(249, 151, 9, 0.15)",
                          color:
                            topData?.kpis?.status === "Active"
                              ? "#21BFA7"
                              : "#F99709",
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ lg: 4, xs: 12 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography
                        fontWeight={600}
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Location
                      </Typography>
                      <Typography
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {topData?.city ?? "-"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ lg: 8, xs: 12 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography
                        fontWeight={600}
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Address
                      </Typography>
                      <Typography
                        fontSize='0.82rem'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {topData?.address ?? "-"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ── Sticky Compact Bar ── */}
      {isSticky && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            backgroundColor: "#fff",
            boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
            px: 3,
            py: 1.2,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Avatar */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(to bottom, #93B2E1, #C9D8F0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "#1a1a2e",
                fontFamily: "Poppins, sans-serif",
                textTransform: "uppercase",
              }}
            >
              {vendorInitials}
            </Typography>
          </Box>

          {/* Name & Account */}
          <Box sx={{ flexShrink: 0 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#1a1a2e",
                fontFamily: "Poppins, sans-serif",
                lineHeight: 1.2,
              }}
            >
              {topData?.vendor_name}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "#555",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {topData?.vendor_account}
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{ width: "1px", height: 36, backgroundColor: "#dce4f5", mx: 1 }}
          />

          {/* Stat Values */}
          <Box sx={{ display: "flex", gap: 4, flex: 1, flexWrap: "wrap" }}>
            {statCards.map((stat, i) => (
              <Box key={i} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#1a4fcc",
                    fontFamily: "Poppins, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    color: "#334",
                    fontFamily: "Poppins, sans-serif",
                    mt: 0.3,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Status Chip */}
          <Chip
            label={topData?.kpis?.status}
            size='small'
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              flexShrink: 0,
              backgroundColor:
                topData?.kpis?.status === "Active"
                  ? "rgba(33, 191, 167, 0.15)"
                  : "rgba(249, 151, 9, 0.15)",
              color: topData?.kpis?.status === "Active" ? "#21BFA7" : "#F99709",
            }}
          />
        </Box>
      )}
    </>
  );
};

export default VendorDetailsToopData;
