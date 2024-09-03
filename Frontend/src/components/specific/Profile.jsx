import React from "react";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";
import { matBlack } from "../../constants/color";
import { useNavigate } from "react-router-dom";

const Profile = ({ user,setViewProfile }) => {


const navigate = useNavigate();


const navigateBack = () => {
  setViewProfile(false);
  navigate("/");

};

return (
  <Stack
  spacing={"2rem"}
  direction={{ xs: "column",md: "row" }} 
  height={{ xs: "auto", md: "40vh" }}    
  width={"100vp"}
  // overflowX={"hidden"}
  sx={{
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.4rem",
    bgcolor: 'white', 
    padding: '1rem', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '3px 4px 10px rgba(0, 0, 0, 0.8)', 
    borderRadius: '8px', 
  }}
>
  <Avatar
 
    onClick={() => navigate(`/user/${user?._id}`)}
    src={user?.avatar?.url}
    sx={{
      width: { xs: 150, md: 200 },
      height: { xs: 150, md: 200 }, 
      objectFit: "contain",
      marginBottom: { xs: "1rem", sm: "0" },
      boxShadow: '3px 4px 10px rgba(0, 0, 0, 0.8)', 
    

    }}
  />
  <ProfileCard heading={"Name"} text={user?.name} />
  <ProfileCard heading={"Username"} text={user?.username} />
  <ProfileCard heading={"Bio"} text={user?.bio} />
  <ProfileCard text={"Joined"} heading ={moment(user?.createdAt).fromNow()} />

  <IconButton
    sx={{
      position: "absolute",
      top: "2rem",
      left: "2rem",
      bgcolor: matBlack,
      color: "white",
      ":hover": {
        bgcolor: "rgba(0,0,0,0.7)",
      },
    }}
    onClick={navigateBack}
  >
    <KeyboardBackspaceIcon />
  </IconButton>
</Stack>
);
};
const ProfileCard = ({ text, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    // color={"white"}
    textAlign={"center"}
  >

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;