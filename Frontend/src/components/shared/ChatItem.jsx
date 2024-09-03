import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { btnColor2 } from "../../constants/color";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,

}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}

    >

<motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          background: sameSender ? btnColor2: "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          padding: ".8rem",
          margin: "0.2rem 0.3rem", 
          borderRadius: "3rem",
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack >
          <Typography sx={{ fontSize: "1.4rem"}} >{name}</Typography>
          {newMessageAlert && (
            <Typography sx={{ color: "black" , fontSize: ".8rem"
            }}>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "purple",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              border: "1px solid white",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
