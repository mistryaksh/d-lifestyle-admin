import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { AccommodationProps } from "../../../interface";
import { GetAllAccommodation } from "../../action";

interface InitialAccommodationProps {
     loading: boolean;
     data: AccommodationProps[];
     error: string;
     success: string;
     images: {
          title: string;
          image: string;
     }[];
}

const InitialAccommodationState: InitialAccommodationProps = {
     loading: false,
     data: [],
     error: "",
     success: "",
     images: [
          {
               image: "https://dummyimage.com/1260x720/000/fff",
               title: "image size should be like this",
          },
     ],
};

const AccommodationSlice = createSlice({
     name: "accommodation",
     initialState: InitialAccommodationState,
     reducers: {
          addAccommodationImages: (state, action) => {
               state.images.push({
                    title: action.payload.title,
                    image: action.payload.image,
               });
               console.log("data", state.images);
          },
          removeAccommodationImage: (state, action) => {
               state.images.splice(action.payload, 1);
          },
          emptyAccommodationImage: (state) => {
               state.images = [
                    { image: "https://dummyimage.com/1260x720/000/fff", title: "image size should be like this" },
               ];
          },
     },
     extraReducers(builder) {
          builder
               .addCase(GetAllAccommodation.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
               })
               .addCase(GetAllAccommodation.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAllAccommodation.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const AccommodationReducer = AccommodationSlice.reducer;
export const { addAccommodationImages, emptyAccommodationImage, removeAccommodationImage } = AccommodationSlice.actions;
export const useAccommodationSelector = () =>
     useSelector((state: any) => {
          return state.accommodation;
     });
