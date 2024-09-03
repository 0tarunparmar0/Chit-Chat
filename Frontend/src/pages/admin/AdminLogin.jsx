import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import cc9 from "../../constants/images/cc9.webp"
import CustomTextField from "../../constants/CustomTextField";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("secret key", e.value);
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: `url(${cc9})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}

          sx={{
            transform: "scale(0.8)",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "transparent",
            boxShadow: "5px 4px 16px rgba(0, 0, 0, 0.5)",

          }}
        // sx={{
        //   padding: 4,
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        // }}
        >
          <Typography
            variant="h4"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              color: "#f8f9fa",
              fontWeight: "bold",
              textShadow: "4px 6px 9px rgba(0, 0, 0, 0.7)",
              letterSpacing: "1px",
              borderRadius: "8px",
            }}
          >
            ADMIN
          </Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <CustomTextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              sx={{
                marginTop: "1rem",
                background: "linear-gradient(45deg, #6a1b9a, #ab47bc)", // Gradient colors
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 20px",
                textTransform: "uppercase",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  background: "linear-gradient(45deg, #8e24aa, #d81b60)",
                },
              }}
              variant="contained"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;