import axios from "axios";
import { NewToursTravelProps, UpdateToursTravelProps } from "../../interface";

class ToursTravelServices {
     public async GetToursTravel() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/tours-travel`);
     }

     public async GetToursTravelById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`);
     }
     public async AddToursTravel({
          SubCategory,
          code,
          displayName,
          duration,
          place,
          theme,
          description,
          images,
     }: NewToursTravelProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/tours-travel/`,
               {
                    SubCategory,
                    code,
                    displayName,
                    duration,
                    place,
                    theme,
                    description,
                    images,
               },
               {
                    withCredentials: true,
               }
          );
     }
     public async UpdateToursTravelById({ data, id }: UpdateToursTravelProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/tours-travel/${id}`,
               {
                    SubCategory: data.SubCategory,
                    code: data.code,
                    displayName: data.displayName,
                    duration: data.duration,
                    place: data.place,
                    theme: data.theme,
                    description: data.description,
                    image: data.image,
                    moreItems: data.moreItems,
               },
               {
                    withCredentials: true,
               }
          );
     }

     public async DeleteToursTravelById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`, {
               withCredentials: true,
          });
     }
}

export default new ToursTravelServices();
