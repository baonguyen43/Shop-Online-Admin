import { message } from "antd";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
const getSupplier = async () => {
  try {
    const result = await axiosAdmin.get("/suppliers");
    return result;
  } catch (error) {
    return error;
  }
};

const getSupplierDetail = async (id) => {
  try {
    const result = await axiosAdmin.get(`/suppliers/${id}`);
    console.log('««««« result »»»»»', result);
    return result;
  } catch (error) {
    console.log('««««« err »»»»»', error);
    return error;
  }
};

const updateSupplier = async (id, updatedData) => {
  try {
    console.log('««««« id »»»»»', id);
    const response = await axiosAdmin.put(`/suppliers/${id}`, updatedData);
    message.success(response.data.message);
    return response;
  } catch (error) {
    message.error(error.response.data.message);
    // throw new Error(error.response?.data?.message 
    return false;
  }
};

const onAddSupplier = async (supplierData) => {
  try {
    const result = await axiosAdmin.post("/suppliers", supplierData);
    message.success(result.data.message);
    return result;
  } catch (error) {
    message.error(error.response.data.message);
    return error;
  }
};

const deleteSupplier = async (id) => {
  try {
    const response = await axiosAdmin.patch(`/suppliers/delete/${id}`);
    message.success(response.data.message);
    window.location.reload();
    return response.data;
  } catch (error) {
    message.error(error.response.data.message);
    throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi xóa ");
  }};

export { getSupplier, getSupplierDetail, updateSupplier,onAddSupplier, deleteSupplier};
