import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { btnColor, orange } from "../../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";
import Profile from "../specific/Profile";
import ConfirmLogoutDialog from "../dialogs/ConfirmLogoutDialog";
import {useMyGroupsQuery,} from "../../redux/api/api";





const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const myGroups = useMyGroupsQuery("");
  
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { user } = useSelector((state) => state.auth);
  
  const { notificationCount } = useSelector((state) => state.chat);

  const [confirmLogOutDialog, setConfirmLogOutDialog] = useState(false);


  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };


  const openNotification = () => {
    // console.log(" open Notification ");
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const manageGroupHandler = () => {
    // navigateToGroup()
    // console.log(" manageGroupHandler ", myGroups.lenght );
    // if(myGroups.lenght > 0){
    //   navigateToGroup()
    // }
    // else{
    //   toast.error("You are not a member of any group")
    // }
  };

  const openConfirmLogOutDialog = () => {
    setConfirmLogOutDialog(true)
  }
  const closeLogOutHandler = () => {
    setConfirmLogOutDialog(false)
  }

  const LogoutHandler = async () => {

    closeLogOutHandler(false);
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  const [viewProfie, setViewProfile] = useState(false)

  const handleProfileView = () => {

    setViewProfile((prev) => !prev)
  }


  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 1, padding: 0 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            background: btnColor,
          }}
        >
          <Toolbar>


            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              Chit Chat
            </Typography>

 
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              {/* <Typography>hwllo { notificationCount}</Typography> */}

              <IconBtn
                title={"Profile"}
                icon={<PersonIcon />}
                onClick={handleProfileView}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={openConfirmLogOutDialog}
              />
            </Box>

              <Box sx={{ display: { xs: "block", sm: "none" },flexGrow: 1}}/>
            
            <Box
            sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}


      {confirmLogOutDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmLogoutDialog
            open={confirmLogOutDialog}
            handleClose={closeLogOutHandler}
            LogoutHandler={LogoutHandler}
          />
        </Suspense>
      )}

      <Drawer open={viewProfie} onClose={handleProfileView} anchor="bottom">
        <Profile user={user} setViewProfile={setViewProfile} />
      </Drawer>
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;