import React, { useEffect, useState } from "react";

import { Toolbar, Drawer, CssBaseline, Box, useTheme } from "@mui/material";
import Head from "react-helmet";
import { Appbar, DrawerItems } from "../../component";
import { useDispatch } from "react-redux";
import { useAuthSelector } from "../../redux";

interface LayoutProps {
     pagetitle: string;
}

var drawerWidth: number = 280;

export const DefaultLayout: React.FC<LayoutProps> = ({ children, pagetitle }) => {
     const { spacing } = useTheme();
     const [mobileOpen, setMobileOpen] = useState<boolean>(false);
     const [collapsible, setCollapsible] = useState<boolean>(false);
     const auth = useAuthSelector();

     const handleDrawerToggle = () => {
          setMobileOpen(!mobileOpen);
     };

     const handleCollapsible = () => {
          setCollapsible(!collapsible);
     };
     return (
          <Box sx={{ display: "flex" }}>
               <Head>
                    <title>{pagetitle} | DLifeStyle</title>
               </Head>
               <CssBaseline />
               <Appbar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
               <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    <Drawer
                         variant="temporary"
                         open={mobileOpen}
                         onClose={handleDrawerToggle}
                         ModalProps={{
                              keepMounted: true,
                         }}
                         sx={{
                              display: { xs: "block", sm: "none" },
                              "& .MuiDrawer-paper": {
                                   boxSizing: "border-box",
                                   width: drawerWidth,
                              },
                         }}
                    >
                         <DrawerItems
                              user={{ email: auth.user.email, name: `${auth.user.firstName} ${auth.user.lastName}` }}
                              collapsible={collapsible}
                              handleCollapsible={handleCollapsible}
                         />
                    </Drawer>
                    <Drawer
                         variant="permanent"
                         sx={{
                              padding: spacing(2),
                              display: { xs: "none", sm: "block" },
                              "& .MuiDrawer-paper": {
                                   boxSizing: "border-box",
                                   borderRightStyle: "dashed",
                                   width: drawerWidth,
                              },
                         }}
                         open
                    >
                         <DrawerItems
                              user={{ email: auth.user.email, name: `${auth.user.firstName} ${auth.user.lastName}` }}
                              collapsible={collapsible}
                              handleCollapsible={handleCollapsible}
                         />
                    </Drawer>
               </Box>
               <Box
                    component="main"
                    sx={{
                         flexGrow: 1,
                         paddingTop: {
                              sm: spacing(5),
                              xs: spacing(5),
                         },
                         paddingLeft: {
                              sm: spacing(2),
                              xs: spacing(2),
                         },

                         paddingRight: {
                              sm: spacing(2),
                              xs: spacing(2),
                         },
                         padding: {
                              lg: spacing(4),
                              xl: spacing(4),
                              md: spacing(3),
                         },
                         width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
               >
                    <Toolbar />
                    {children}
               </Box>
          </Box>
     );
};
