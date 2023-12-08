import { message } from "antd";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

const getEmployee = async () => {
  try {
    const result = await axiosAdmin.get("/employees");
    return result;
  } catch (error) {
    return error;
  }
};

const getEmployeeDetail = async (id) => {
  try {
    const result = await axiosAdmin.get(`/employees/${id}`);
    console.log('««««« result »»»»»', result);
    return result;
  } catch (error) {
    console.log('««««« err »»»»»', error);
    return error;
  }
};
const onAddEmployee = async (categoryData) => {
  try {
    const result = await axiosAdmin.post("/employees", categoryData);
    message.success(result.data.message);
    return result;
  } catch (error) {
    message.error(error.response.data.message);
    return error;
  }
};
const updateEmployee = async (id, updatedData) => {
  try {
    console.log('««««« id »»»»»', id);
    const response = await axiosAdmin.put(`/employees/${id}`, updatedData);
    message.success(response.data.message);
    return response;
  } catch (error) {
    message.error(error.response.data.message);
    // throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật danh mục");
    return false;
  }
};



export { getEmployee, getEmployeeDetail, onAddEmployee, updateEmployee };
