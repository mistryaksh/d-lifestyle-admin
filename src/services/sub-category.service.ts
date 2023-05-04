import axios from "axios";
import { NewSubCategoryProps, UpdateSubCategoryProps } from "../interface";

class SubCategoryService {
     public async GetSubCategory() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/sub-category`);
     }

     public async GetSubCategoryById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`);
     }

     public async AddSubCategory({ CategoryId, name }: NewSubCategoryProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/sub-category`,
               {
                    CategoryId,
                    name,
               },
               {
                    withCredentials: true,
               }
          );
     }

     public async UpdateSubCategoryById({ id, data }: UpdateSubCategoryProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/sub-category/${id}`,
               {
                    CategoryId: data.CategoryId,
                    name: data.name,
               },
               {
                    withCredentials: true,
               }
          );
     }
     public async DeleteSubCategoryById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/sub-category/${id}`, {
               withCredentials: true,
          });
     }

     public async GetSubCategoryWithCategoryId(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/sub-category/category/${id}`, {
               withCredentials: true,
          });
     }
}

export default new SubCategoryService();
