import React from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { Box, Grid, useTheme } from "@mui/material";
import { Formik } from "formik";
import { CarouselInitial, CarouselValidateSchema } from "../../../validation";
import { NewCarouselProps } from "../../../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { AddNewCarousel } from "../../../features/action";
import { useNavigate } from "react-router-dom";

export const AddCarousel = () => {
     const { shadows, palette } = useTheme();
     const dispatch = useDispatch<AppDispatch>();
     const navigate = useNavigate();
     const CreateCarouselData = (e: NewCarouselProps) => {
          dispatch(AddNewCarousel(e));
          navigate("/content/manage/carousel", { replace: true });
     };
     return (
          <DefaultLayout pagetitle="Create new banner">
               <AppTitleBar
                    title="create carousels for website"
                    breadcrubms={[
                         {
                              pagepath: "home",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/content/manage",
                              activepage: false,
                              activetitle: "content",
                         },
                         {
                              pagepath: "/content/manage",
                              activepage: false,
                              activetitle: "manage",
                         },
                         {
                              pagepath: "/content/add-new/carousels",
                              activepage: true,
                              activetitle: "carousels",
                         },
                    ]}
               />
               <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                    <Box
                         width="60%"
                         mt={5}
                         boxShadow={shadows[15]}
                         borderRadius={1}
                         p={3}
                         border={`2px solid ${palette.grey[400]}`}
                    >
                         <Formik
                              initialValues={CarouselInitial}
                              validationSchema={CarouselValidateSchema}
                              onSubmit={CreateCarouselData}
                         >
                              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                                   <form onSubmit={handleSubmit}>
                                        <Grid container spacing={0}>
                                             <Grid item xs={12} sm={12}>
                                                  <AppInput
                                                       fullWidth
                                                       margin="dense"
                                                       label="Paste image URL here!"
                                                       value={values.dataImage}
                                                       onChange={handleChange("dataImage")}
                                                       onBlur={handleBlur("dataImage")}
                                                       error={!values.dataImage && touched.dataImage}
                                                       helperText={touched.dataImage && errors.dataImage}
                                                  />
                                             </Grid>
                                             <Grid sx={{ mt: 2 }} item xs={12} sm={12}>
                                                  <AppInput
                                                       fullWidth
                                                       margin="dense"
                                                       label="Enter image title"
                                                       value={values.dataAlt}
                                                       onChange={handleChange("dataAlt")}
                                                       onBlur={handleBlur("dataAlt")}
                                                       error={!values.dataAlt && touched.dataAlt}
                                                       helperText={touched.dataAlt && errors.dataAlt}
                                                  />
                                             </Grid>
                                        </Grid>
                                        <Box mt={2} display="flex" flexDirection="row" justifyContent="end">
                                             <AppButton type="submit">Create carousel</AppButton>
                                        </Box>
                                   </form>
                              )}
                         </Formik>
                    </Box>
               </Box>
          </DefaultLayout>
     );
};
