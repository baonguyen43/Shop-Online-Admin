import { message } from "antd";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

const getOrder = async () => {
  try {
    const result = await axiosAdmin.get("/orders");
    return result;
  } catch (error) {
    return error;
  }
};

const getOrderDetail = async (id) => {
  try {
    const result = await axiosAdmin.get(`/orders/${id}`);
    console.log('««««« result »»»»»', result);
    return result;
  } catch (error) {
    console.log('««««« err »»»»»', error);
    return error;
  }
};
const addOrder = async (orderData) => {
  try {
    const result = await axiosAdmin.post("/orders", orderData);
    message.success(result.data.message);
    return result;
  } catch (error) {
    message.error(error.response.data.message);
    return error;
  }
};
const updateOrder = async (id, updatedData) => {
  try {
    console.log('««««« id »»»»»', id);
    const response = await axiosAdmin.put(`/orders/${id}`, updatedData);
    message.success(response.data.message);
    return response;
  } catch (error) {
    message.error(error.response.data.message);
    // throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật danh mục");
    return false;
  }
};

const updateStatus = async (id, updateStatus) => {
  try {
    console.log('««««« id »»»»»', id);
    const response = await axiosAdmin.put(`/orders/status/${id}`, updateStatus);
    message.success(response.data.message);
    return response;
  } catch (error) {
    message.error(error.response.data.message);
    // throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật danh mục");
    return false;
  }
};

export { addOrder, getOrder, getOrderDetail, updateOrder, updateStatus };
