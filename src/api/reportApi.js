import { message } from "antd";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

const getProductsDiscount = async (discount) => {
    try {
      const result = await axiosAdmin.get("/product-discount", {params:{discount}});
      return result;
    } catch (error) {
      return error;
    }
  };

  const getProductsStockless = async (stock) => {
    try {
      const result = await axiosAdmin.get("/product-stockless",{params:{stock}});
      return result;
    } catch (error) {
      return error;
    }
  };

  const getProductsPriceless100000 = async () => {
    try {
      const result = await axiosAdmin.get("/product-priceless100000");
      return result;
    } catch (error) {
      return error;
    }
  };

  const getProductsCategory = async (category) => {
    try {
      const result = await axiosAdmin.get("/product-category",{params:{category}});
      return result;
    } catch (error) {
      return error;
    }
  };

  const getProductsSupplier = async (supplier) => {
    try {
      const result = await axiosAdmin.get("/product-supplier",{params:{supplier}});
      return result;
    } catch (error) {
      return error;
    }
  };
export { getProductsDiscount, getProductsCategory, getProductsPriceless100000, getProductsStockless, getProductsSupplier};
