import { Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { orange } from "@mui/material/colors";
import { btnColor, btnColor2, orangeLight, purpleLight } from "../../constants/color";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],


}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"} sx={{

      padding: "0.2rem",


      
      overflowX: 'hidden',  
      '&::-webkit-scrollbar': {
        width: '0.5rem',  },
    
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#44f141',  
        margin: '1rem', 
      },
      scrollbarWidth: 'thin',  
}}
  >
    {
      chats.length === 0 ? <Typography
      sx={{
        color: "black",  
        padding: "1rem",  
        textAlign: "center",
        borderRadius: "8px",  
        fontSize: "1.2rem",  
        mx: "auto",
        mt: "2rem",  
        width: "80%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  
      }}
    >
      Search a friend to chat
    </Typography>
:
      chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}

          />
        );
      })}
    </Stack>
  );
};

export default ChatList;

