import { message } from "antd";
import { axiosAdminMan } from "helper/axios";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
const getListUserApi = async (params) => {
  try {
    const result = await axiosAdminMan.get("/customers", params);
    return result;
  } catch (error) {
    return error;
  }
};

const addUserApi = async (params) => {
  try {
    const result = await axiosAdminMan.post("/customers", params);
    message.success(result.data.message);
   
    return result;
  } catch (error) {
    message.error("Thất bại");
    return false;
  }
};

const infoUserApi = async (id) => {
  try {
    const result = await axiosAdminMan.get("/customers/" + id);
    return result;
  } catch (error) {
    return error;
  }
};

// const updateUserApi = async (params) => {
//   try {
//     const result = await axiosAdminMan.put("/customers/" + params.id, params);
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

const updateUserApi = async (id, updatedData) => {
  try {
    const response = await axiosAdmin.put(`/customers/${id}`, updatedData);
    message.success(response.data.message);
    return response;
  } catch (error) {
    message.error(error.response.data.message);
    return false;
  }
};

const deleteUserApi = async (id) => {
  try {
    const result = await axiosAdminMan.patch("/customers/delete/" + id);
    return result;
  } catch (error) {
    return error;
  }
};

export {
  addUserApi,
  deleteUserApi,
  getListUserApi,
  infoUserApi,
  updateUserApi,
};