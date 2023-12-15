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

  const getProductsPricelDiscounted = async (total) => {
    try {
      const result = await axiosAdmin.get("/product-pricediscount",{params:{total}});
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

  const getCustomerAddress =async (address) => {
    try {
      const result = await axiosAdmin.get("/customers-address",{params:{address}});
      return result;
    } catch (error) {
      return error;
    }
  };

  const getCustomerAge = async (minAge, maxAge) => {
    try {
      const result = await axiosAdmin.get("/customers-age",{params:{minAge, maxAge}});
      return result;
    } catch (error) {
      return error;
    }
  };

  const getOrderStatus = async (date, status) => {
    try {
      const result = await axiosAdmin.get("/customers-age",{params:{date, status}});
      return result;
    } catch (error) {
      return error;
    }
  };
  const getOrderPayment = async (paymentMethod, status) => {
    try {
      const result = await axiosAdmin.get("/orders-payment",{params:{paymentMethod, status}});
      return result;
    } catch (error) {
      return error;
    }
  };
export {getOrderPayment,getOrderStatus, getCustomerAge, getCustomerAddress, getProductsDiscount, getProductsCategory, getProductsPricelDiscounted, getProductsStockless, getProductsSupplier};
