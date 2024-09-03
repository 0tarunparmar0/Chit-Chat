
import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import CustomTextField from "../constants/CustomTextField";
import cc9 from "../constants/images/cc9.webp";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        >
          {isLogin ? (
            <>
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
                Log In
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                
                <CustomTextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  />

                  <CustomTextField


                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
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
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  sx={{
                    background: "linear-gradient(45deg, #6a1b9a, #ab47bc)", // Gradient colors
                    color: "#ffffff",
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
                  disabled={isLoading}
                  fullWidth
                  onClick={toggleLogin}

                >
                  Sign Up Instead
                </Button>

              </form>
            </>
          ) : (
            <>
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
                Sign Up
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  marginBottom : "2rem",
                }}
                onSubmit={handleSignUp}
              >

                <Stack position={"relative"} width={"10rem"} margin={"auto"} >
                  <Avatar
                    sx={{
                      width: "6rem",
                      height: "6rem",
                      objectFit: "contain",
                      left: "2rem",
                      border: `2px solid #f8f9fa`,
                      boxShadow: "5px 4px 16px rgba(0, 0, 0, 0.5)",

                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      width: "2.4rem",
                      height: "2.4rem",
                      position: "absolute",
                      bottom: "0",
                      right: "1rem",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <CustomTextField
                    required
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={name.value}
                    onChange={name.changeHandler}
                  />

                  <CustomTextField
                    required
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />
                  <CustomTextField
                    required
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />

                  {username.error && (
                    <Typography color="#8e24aa" variant="caption">
                      {username.error}
                    </Typography>
                  )}

                  <CustomTextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                
                <Button
                  sx={{
                    marginTop: "1rem",
                    background: "linear-gradient(45deg, #7b1fa2, #b388ff)", // Gradient colors
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #6a1b9a, #9c27b0)",
                    },
                  }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  sx={{
                    background: "linear-gradient(45deg, #7b1fa2, #b388ff)", // Gradient colors
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #6a1b9a, #9c27b0)",
                    },
                  }}
                  variant="contained"
                  disabled={isLoading}
                  fullWidth
                  onClick={toggleLogin}
                >
                  Login Instead
                </Button>

              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
