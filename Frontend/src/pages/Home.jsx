import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
  
      <Typography
        p={"2rem"}
        sx={{
          color: "black",
          paddingTop: "2rem",
          textAlign: "center",
          borderRadius: "8px",
          fontSize: "1.2rem", 
          mx: "auto", 
          width: "80%",  
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
        }}
      >
        Select a Friend/Group to chat
      </Typography>

    </Box>
  );
};

export default AppLayout()(Home);