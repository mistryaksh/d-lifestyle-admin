import React, { useState } from "react";
import { DefaultLayout } from "../../layout";
import { useGeneralSelector } from "../../features/slice";
import { AppTitleBar } from "../../component";
import {
     Avatar,
     Box,
     Card,
     CardActions,
     CardContent,
     CardHeader,
     Collapse,
     Grid,
     IconButton,
     IconButtonProps,
     TablePagination,
     Typography,
     useTheme,
} from "@mui/material";
import { Delete, ExpandMore as ExploreMoreIcon, Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import styled from "@emotion/styled";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features";
import { DeleteCustomerAction, GetContactAction, MakeFavoriteAction } from "../../features/action";
import { enqueueSnackbar } from "notistack";

interface ExpandMoreProps extends IconButtonProps {
     expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
     const { expand, ...other } = props;
     return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
     transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
     marginLeft: "auto",
     transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
     }),
}));

const GetContact = () => {
     const general = useGeneralSelector();
     const { shadows, palette } = useTheme();
     const [expanded, setExpanded] = useState(false);
     const [rowsPerPage, setRowsPerPage] = useState<number>(10);
     const [page, setPage] = React.useState(0);
     const dispatch = useDispatch<AppDispatch>();

     const handleExpandClick = () => {
          setExpanded(!expanded);
     };

     const handleChangePage = (event: unknown, newPage: number) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const MakingFavorite = async (props: string) => {
          const data = await dispatch(MakeFavoriteAction(props));
          if (data.type === "general/contact_favorite/fulfilled") {
               enqueueSnackbar(data.payload, { variant: "success" });
               await dispatch(GetContactAction());
          }
     };

     const DeleteCustomer = async (props: string) => {
          const data = await dispatch(DeleteCustomerAction(props));
          if (data.type === "general/contact_delete/fulfilled") {
               enqueueSnackbar(data.payload, { variant: "success" });
               await dispatch(GetContactAction());
          }
     };

     return (
          <DefaultLayout pagetitle="Your customer's contact you">
               <AppTitleBar
                    title="Customer's Query for you"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "home",
                         },
                         {
                              pagepath: "/general/contact",
                              activepage: false,
                              activetitle: "general",
                         },
                         {
                              pagepath: "general/contact",
                              activepage: true,
                              activetitle: "my customers",
                         },
                    ]}
               />
               {general.contacts.length !== 0 && (
                    <Box mt={5}>
                         <Grid container spacing={3}>
                              {general.contacts
                                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                   .map(({ name, createdAt, body, email, phone, favorite, _id }, i) => (
                                        <Grid item xs={12} sm={12} md={6} xl={4} lg={4} key={i}>
                                             <Card sx={{ maxWidth: 345 }}>
                                                  <CardHeader
                                                       avatar={
                                                            <Avatar
                                                                 sx={{ bgcolor: palette.primary.main }}
                                                                 aria-label="recipe"
                                                            >
                                                                 <Typography textTransform="uppercase">
                                                                      {name[0]}
                                                                 </Typography>
                                                            </Avatar>
                                                       }
                                                       title={
                                                            <Typography textTransform="capitalize">{name}</Typography>
                                                       }
                                                       subheader={moment(createdAt).format("LLLL")}
                                                  />

                                                  <CardContent>
                                                       <Typography variant="body2" color="text.secondary">
                                                            {email}
                                                       </Typography>
                                                       <Typography variant="body2" color="text.secondary">
                                                            {phone}
                                                       </Typography>
                                                  </CardContent>
                                                  <CardActions disableSpacing>
                                                       <IconButton
                                                            aria-label="add to favorites"
                                                            onClick={() => MakingFavorite(_id as string)}
                                                       >
                                                            {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
                                                       </IconButton>
                                                       <IconButton
                                                            onClick={() => DeleteCustomer(_id as string)}
                                                            aria-label="add to favorites"
                                                       >
                                                            <Delete />
                                                       </IconButton>
                                                       {body && (
                                                            <ExpandMore
                                                                 expand={expanded}
                                                                 onClick={handleExpandClick}
                                                                 aria-expanded={expanded}
                                                                 aria-label="show more"
                                                            >
                                                                 <ExploreMoreIcon />
                                                            </ExpandMore>
                                                       )}
                                                  </CardActions>
                                                  {body && (
                                                       <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                            <CardContent>
                                                                 <Typography variant="h6">Message :-</Typography>
                                                                 <Typography paragraph>{body}</Typography>
                                                            </CardContent>
                                                       </Collapse>
                                                  )}
                                             </Card>
                                        </Grid>
                                   ))}
                         </Grid>
                         <TablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={general.contacts.length}
                              sx={{
                                   bgcolor: palette.primary.light,
                                   marginTop: 5,
                              }}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                         />
                    </Box>
               )}
               {general.contacts.length === 0 && (
                    <Box display="flex" mt={10} justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6" color={palette.grey[500]}>
                              No customer reaches to you
                         </Typography>
                    </Box>
               )}
          </DefaultLayout>
     );
};

export default GetContact;
