import {
  Form,
  Input,
  InputNumber,
  Select,
  message
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { getCategory } from "api/categoryApi";
import { getSupplier } from "api/supplierApi";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { memo, useCallback, useEffect, useState } from "react";
// import styles
import styles from "./createProduct.module.scss";
const { Option } = Select;

function CreateProduct(props) {

  const [productForm] = Form.useForm();
  const [categories, setCategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
 
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const category = await getCategory();
      setCategory(category?.data);
      const supplier = await getSupplier();
      setSupplier(supplier?.data);
      setIsLoading(false);
    };
    getData();
  }, []);
  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array); // eslint-disable-line
    }
  };
  const onFinish = useCallback(async (values) => {
    try {
      const productData = {
        name: values.name,
        price: values.price,
        discount: values.discount,
        stock: values.stock,
        imagePath: values.imagePath,
        description: values.description,
        categoryId: values.categoryId,
        supplierId: values.supplierId,
      };
      await axiosAdmin
        .post("/products", productData)
        .then((res) => {
          message.success("Thêm sản phẩm thành công")
        })
        .catch(async (err) => {
          message.error("Thêm sản phẩm thất bại")
        });
    } catch (error) {
      message.error("Lỗi khi thêm sản phẩm")
    }

     }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <h4>THÊM MỚI SẢN PHẨM</h4>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => window.history.back()}
        >
          Trở lại
        </button>
      </div>

      <div className={styles.main_form}>
        <Form
          layout="vertical"
          form={productForm}
          size="large"
          // className={className}
          // name={formName}

          onFinish={onFinish}
        >
          <h4 className="text-center my-3">Tạo mới sản phẩm</h4>
          <div className="row">
            <div className="col-xs-12 col-lg-6 col-sm-6">
              {" "}
              <Form.Item
                label="Nhà cung cấp"
                name="supplierId"
                rules={[
                  {
                    required: true,
                    message: "Chọn nhà cung cấp",
                  },
                ]}
              >
                <Select>
                  {isLoading === false ? (
                    suppliers.map((s) => (
                      <Option key={s.id || s._id} value={s.id || s._id}>
                        {s.name}
                      </Option>
                    ))
                  ) : (
                    <Option>Loading..</Option>
                  )}
                </Select>
              </Form.Item>
            </div>
            <div className="col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[
                  {
                    required: true,
                    message: "Chọn danh mục",
                  },
                ]}
              >
                <Select>
                  {isLoading === false ? (
                    categories.map((s) => (
                      <Option key={s.id || s._id} value={s.id || s._id}>
                        {s.name}
                      </Option>
                    ))
                  ) : (
                    <Option>Loading..</Option>
                  )}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Name is required" },
                  { max: 50, message: "Maximum 50 characters" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Giá "
                name="price"
                rules={[
                  { required: true, message: 'Giá không được bỏ trống' },
                  {type: "number", min: 0, message: 'Giá không thể âm' },
                ]}
              >
               <InputNumber />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Số lượng"
                name="stock"
                rules={[
                  { required: true, message: "Stock is required" },
                  {
                    type: "number",
                    min: 1,
                    message: "Please enter a stock from 1",
                  },
                ]}
              >
                 <InputNumber />
              </Form.Item>
            </div>
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Giảm giá (%)"
                name="discount"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 75,
                    message: "Chọn % giảm giá từ 0 tới 75",
                  },
                  { required: true, message: "Discount is required" },
                ]}
              >
                  <InputNumber />
              </Form.Item>
            </div>
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Đường dẫn ảnh sản phẩm (nếu có)"
                name="imagePath"
                           >
                  <Input />
              </Form.Item>
            </div>
          </div>
          
          <Form.Item label="Mô tả" name="description"  rules={[
                  {
                    type:"string",
                    min: 5,
                    max: 300,
                    message: "Mô tả không được ngắn hơn 5 và dài hơn 300 ký tự ",
                  },
                  { required: true, message: "Discount is required" },
                ]}>
            <TextArea style={{ minHeight: "100px" }} />
          </Form.Item>
      
          
          <Form.Item>
            <div className="d-flex"style={{gap:'2px'}}>
              <button type="submit" className="btn btn-dark" >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => productForm.resetFields()}
                className="btn btn-danger"
              >
                Cài lại
              </button>
            </div>
          </Form.Item>
        </Form>
        
      </div>
    </>
  );
}

export default memo(CreateProduct);
