import { message } from "antd";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
const getProduct = async () => {
  try {
    const result = await axiosAdmin.get("/products");
    return result;
  } catch (error) {
    return error;
  }
};
const getProductDetail = async (id) => {
    try {
      const result = await axiosAdmin.get(`/products/${id}`);
      return result;
    } catch (error) {
      return error;
    }
  };
  const updateProduct = async (id, updatedData) => {
    try {
      console.log('««««« id »»»»»', id);
      
      const response = await axiosAdmin.put(`/products/${id}`, updatedData);
      message.success(response.data.message);
      console.log('««««« response »»»»»', response);
      return response;
    } catch (error) {
      message.error(error.response.data.message);
      console.log('««««« data.error »»»»»', error);
      return false;
    }
  };
export { getProduct,getProductDetail,updateProduct };
