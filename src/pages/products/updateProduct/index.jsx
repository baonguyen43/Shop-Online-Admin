import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { getCategory } from "api/categoryApi";
import { getProductDetail, updateProduct } from "api/productApi";
import { getSupplier } from "api/supplierApi";
import Loading from "components/loading";
import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./updateProduct.module.scss";

function UpdateProduct() {
  const { id } = useParams();
  const params = useParams();
  const productId = id;
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [data, setData] = useState([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [imagePath, setImagePath] = useState("");
 
  const [loading, setLoading] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("««««« productIdsss »»»»»", productId);
        const response = await getProductDetail(productId);
        const data = response.data;
        console.log("««««« data »»»»»", data);
        setData(response.data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setDiscount(data.discount);
        setStock(data.stock);
        setImagePath(data.imagePath);
    
        setLoading(false);
      } catch (error) {
        console.error("err categoryId", error);
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {

    const getData = async () => {
      setIsLoading(true);
      const category = await getCategory();
      setCategory(category.data);
      const supplier = await getSupplier();
      setSupplier(supplier.data);
      setIsLoading(false);
    console.log("««««« setCategory »»»»»", supplier.data);

    };
    getData();
  }, []);

  const onFinish = useCallback(async (values) => {
    console.log("««««« values data »»»»»", values);
    try {
      const result = await updateProduct(productId, values);
      // navigate("/products");
      console.log("Update thành công:", result);
    } catch (error) {
      console.error("cập nhật thất bại:", error);
    }
  }, [productId]);
    

  if (loading === false) {
    return (
      <>
        <div className="d-flex justify-content-between align-item-center">
        <h4>CẬP NHẬT</h4>
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
          form={form}
          onFinish={onFinish}
          // onFinish={updateProduct}
          size="large"
          layout="vertical"
        >
          <h4 className="text-center my-3">Cập nhật sản phẩm</h4>
          <div className="row">
          <div className="col-xs-12 col-lg-6 col-sm-6">
          <Form.Item
            label="Supplier"
            name="supplierId"
            initialValue={data.supplier?.name}
            rules={[
              {
                required: true,
                message: "Please choose supplier",
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
            label="Category"
            name="categoryId"
            initialValue={data.category?.name}
            rules={[
              {
                required: true,
                message: "Please choose category",
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
                label="Product Name"
                name="name"
                initialValue={name}
                rules={[
                  { required: true, message: "Name is required" },
                  { max: 150, message: "Maximum 150 characters" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Price"
                initialValue={price}
                name="price"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    message: "Please enter a price from 0 ",
                  },
                  { required: true, message: "Discount is required" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </div>
          </div>


           <div className="row">
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Stock"
                name="stock"
                initialValue={stock}
                rules={[
                  { required: true, message: "Name is required" },
                  {
                    type: "number",
                    min: 1,
                    message: "Please enter a stock from 1",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Discount (%)"
                name="discount"
                initialValue={discount}
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 75,
                    message: "Please enter a discount from 0 to 75",
                  },
                  { required: true, message: "Discount is required" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className=" col-xs-12 col-lg-6 col-sm-6">
              <Form.Item
                label="Đường dẫn ảnh sản phẩm (nếu có)"
                name="imagePath"
                initialValue={imagePath}
                           >
                  <Input />
              </Form.Item>
            </div> 
          </div>
        
         

          <Form.Item 
          label="Mô tả" 
          name="description"
          initialValue={description}>
            <TextArea style={{ minHeight: "100px" }} />
          </Form.Item>

     

          <Form.Item >
          <div className="d-flex " style={{gap:'20px'}} >
            <Button type="primary" htmlType="submit" className="btn" style={{backgroundColor:'#dc3545', color:'white'}} >
              Lưu 
            </Button>
            {/* <Button type="primary" onClick={() => form.resetFields()} danger className="btn btn-danger">
              Đóng
            </Button> */}
            </div>
          </Form.Item>
        </Form>
      </div>
      </>
    );
  }
  return <Loading />;
}

export default memo(UpdateProduct);
