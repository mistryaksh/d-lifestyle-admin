import React from "react";

import { Home, Notifications, MenuOpen } from "@mui/icons-material";
import { AppBar, useTheme, IconButton, Box, Toolbar, Avatar, Menu, MenuItem, Divider, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LogOutAction, useAppDispatch } from "../../../redux";
import { enqueueSnackbar } from "notistack";

export interface AppBarProps {
     drawerWidth: string | number;
     handleDrawerToggle: () => void;
}

export const Appbar: React.FC<AppBarProps> = ({ drawerWidth, handleDrawerToggle }) => {
     const { spacing, palette } = useTheme();
     const dispatch = useAppDispatch();
     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
     const open = Boolean(anchorEl);
     const navigate = useNavigate();
     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
          setAnchorEl(null);
     };
     const LogoutUser = async () => {
          const data = await dispatch(LogOutAction());
          if (data.type === "auth/logout/fulfilled") {
               navigate("/", { replace: true });
               return enqueueSnackbar(data.payload);
          }
          if (data.type === "auth/logout/fulfilled") {
               return enqueueSnackbar(data.payload, { variant: "error" });
          }
     };
     return (
          <AppBar
               position="fixed"
               sx={{
                    zIndex: 10,
                    backgroundColor: "rgba(250,250,250,0.5)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "none",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    height: 90,
                    paddingLeft: {
                         lg: spacing(3),
                         xl: spacing(3),
                         md: spacing(3),
                         sm: spacing(2),
                         xs: spacing(1),
                    },
                    paddingRight: {
                         lg: spacing(3),
                         xl: spacing(3),
                         md: spacing(3),
                         sm: spacing(2),
                         xs: spacing(1),
                    },
                    display: "flex",
                    justifyContent: "center",
               }}
          >
               <Toolbar
                    sx={{
                         display: "flex",
                         justifyContent: "space-between",
                    }}
               >
                    <Box>
                         <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              edge="start"
                              onClick={handleDrawerToggle}
                              sx={{
                                   mr: 2,
                                   display: { sm: "none" },
                              }}
                         >
                              <MenuOpen sx={{ color: palette.grey[500] }} fontSize="large" />
                         </IconButton>

                         <Link to="/">
                              <IconButton>
                                   <Home />
                              </IconButton>
                         </Link>
                    </Box>
                    <Box component="div">
                         <IconButton size="large">
                              <Notifications fontSize="medium" />
                         </IconButton>
                         <IconButton size="small" onClick={handleClick}>
                              <Avatar
                                   alt="Cindy Baker"
                                   src="https://png.pngtree.com/png-clipart/20220806/ourmid/pngtree-bearded-man-logo-png-image_6100735.png"
                              />
                         </IconButton>
                    </Box>
                    <Menu
                         PaperProps={{ style: { width: 300 } }}
                         id="basic-menu"
                         anchorEl={anchorEl}
                         open={open}
                         onClose={handleClose}
                         MenuListProps={{
                              "aria-labelledby": "basic-button",
                         }}
                    >
                         <Link
                              to="/admin/profile"
                              style={{
                                   textDecoration: "none",
                                   color: palette.grey[500],
                              }}
                         >
                              <Box px={3} py={2}>
                                   <Typography color="GrayText" textTransform="capitalize" variant="subtitle1">
                                        dinesh salian
                                   </Typography>
                                   <Typography variant="subtitle2" color="grey">
                                        dineshsalian541@gmail.com
                                   </Typography>
                              </Box>
                         </Link>
                         <Divider />
                         <MenuItem
                              onClick={() => {
                                   navigate("/");
                                   handleClose();
                              }}
                         >
                              <Typography color="GrayText">Home</Typography>
                         </MenuItem>

                         <MenuItem
                              onClick={() => {
                                   navigate("/admin/profile");
                                   handleClose();
                              }}
                         >
                              <Typography color="GrayText">Profile</Typography>
                         </MenuItem>
                         {/* </Link> */}

                         <Divider />
                         <MenuItem onClick={LogoutUser}>
                              <Typography color="GrayText">Logout</Typography>
                         </MenuItem>
                    </Menu>
               </Toolbar>
          </AppBar>
     );
};
