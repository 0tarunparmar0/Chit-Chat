import React from "react";
import { ErrorOutline as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#000000", // Entire screen with black background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", 
      }}
    >
      <Container
        maxWidth="sm" 
        
        sx={{
          margin:"2rem",

          height: "80%", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff", 
          color: "#000000", 
          textAlign: "center",
          padding: { xs: "2rem", md: "4rem" }, 
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)", 
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <ErrorIcon sx={{ fontSize: { xs: "3rem", md: "5rem" }, color: "#000000" }} />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "4rem" }, 
              fontWeight: "bold",
              letterSpacing: "0.2rem",
              textTransform: "uppercase",
            }}
          >
            404
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: "1rem", fontStyle: "italic" }}>
            "Looks like you're lost in space."
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
            The page you're looking for isn't here. Maybe it's hiding in a black hole.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="inherit"
            sx={{
              padding: "0.75rem 2rem",
              fontSize: "1.25rem",
              borderRadius: "50px",
              textTransform: "none",
              borderColor: "#000000", 
              '&:hover': {
                backgroundColor: '#000000', 
                color: '#ffffff', 
              },
            }}
          >
            Return to Safety
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default NotFound;
