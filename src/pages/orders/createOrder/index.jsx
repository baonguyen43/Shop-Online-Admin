import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { getEmployee } from "api/employeeApi";
import { getProduct } from "api/productApi";
import { getListUserApi } from "api/userApi";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { memo, useCallback, useEffect, useState } from "react";

const { Option } = Select;
const { Item: FormItem } = Form;
function CreateOrder(props) {
  const [CreateOrder] = Form.useForm();
  // const orderStatus = [
  //   {
  //     value: "WAITTING",
  //     label: "WAITTING",
  //   },
  //   {
  //     value: "COMPLETED",
  //     label: "COMPLETED",
  //   },
  //   {
  //     value: "CANCELED",
  //     label: "CANCELED",
  //   },
  // ];

  //  const orderPaymentType = [
  //   {
  //     value: "CASH",
  //     label: "CASH",
  //   },
  //   {
  //     value: "CREDITCARD",
  //     label: "CREDITCARD",
  //   },
  // ];
  const [isLoading, setIsLoading] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [customers, setCustomer] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [products, setProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const customer = await getListUserApi();
      setCustomer(customer?.data);
      const employee = await getEmployee();
      setEmployee(employee?.data);
      const product = await getProduct();
      setProduct(product?.data);
      setIsLoading(false);
    };
    getData();
  }, []);
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const handleProductChange = (value) => {
    setSelectedProductId(value);

    const product = products.find((item) => item.id === value);
    setSelectedProduct(product);
  };

  // const onFinish = useCallback(async (values) => {
  //   try {
  //   console.log('values :>> ', values);
  //    await axiosAdmin
  //       .post("/orders", values)
  //       .then((res) => {
  //         message.success("Thành công")
  //       })
  //       .catch(async (err) => {
  //         message.error("Thất bại")
  //       });
  //   } catch (error) {
  //     message.error("Lỗi ");
  //   }
  // }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <h4>THÊM ĐƠN HÀNG</h4>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => window.history.back()}
        >
          Trở lại
        </button>
      </div>

      <div className="{styles.main_form}">
        <Select
          value={selectedProductId}
          onChange={handleProductChange}
          style={{ width: "100%" }}
        >
          {products.map((product) => (
            <Option key={product.id} value={product.id}>
              {product.name}
            </Option>
          ))}
        </Select>

        {selectedProduct && (
          <div>
            <h4>Giá: {selectedProduct.price}</h4>
            <h4>Giảm giá: {selectedProduct.discount}</h4>
          </div>
        )}
        <InputNumber
          value={quantity}
          min={1}
          onChange={handleQuantityChange}
          style={{ width: "100%", marginTop: 16 }}
        />
      </div>

      {/* <Form
        form={CreateOrder}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        size="large"
      >
        <h4 className="text-center my-3">Tạo mới đơn hàng</h4>
        <Form.Item
          label="Khách hàng"
          name="customerId"
          rules={[
            {
              required: true,
              message: "Chọn id khách hàng",
            },
          ]}
        >
          <Select>
            {isLoading === false ? (
              customers.map((s) => (
                <Option key={s.id || s._id} value={s.id || s._id}>
                  {s.id}
                </Option>
              ))
            ) : (
              <Option>Loading..</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Nhân viên"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Chọn id nhân viên",
            },
          ]}
        >
          <Select>
            {isLoading === false ? (
              employees.map((s) => (
                <Option key={s.id || s._id} value={s.id || s._id}>
                  {s.id}
                </Option>
              ))
            ) : (
              <Option>Loading..</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Sản phẩm"
          name="productId"
          rules={[
            {
              required: true,
              message: "Chọn id  sản pha63mn ",
            },
          ]}
        >
          {orderDetails.map((orderDetail, index) => (
            <div key={index}>
              <label>Product:</label>
              <Select
                value={orderDetail.productId}
                onChange={(value) => handleAddOrderDetail(value, index)}
              >
                <Option value="">Select a product</Option>
                {products.map((product) => (
                  <Option key={product.id} value={product.id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </div>
          ))}
        </Form.Item>

        <Form.Item
          label="Ngày tạo"
          name="createdDate"
          rules={[{ required: true, message: "Ngày tạo is required" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Ngày giao"
          name="shippedDate"
          rules={[{ required: true, message: "Ngày giao is required" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="shippingAddress"
          rules={[
            { required: true, message: "Address is required" },
            { type: "address", message: "Invalid address format" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Đơn vị giao hàng"
          name="shippingCity"
          rules={[
            { required: true, message: "shippingCity is required" },
            { type: "address", message: "Invalid address format" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please type status" }]}
        >
          <Select
            // showSearch
            style={{
              width: "100%",
            }}
            placeholder="Select Status"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={orderStatus}
          />
        </Form.Item>

        <Form.Item
          label="Payment Type"
          name="paymentType"
          rules={[{ required: true, message: "Please type Payment Type" }]}
        >
          <Select
            // showSearch
            style={{
              width: "100%",
            }}
            placeholder="Select Payment Type"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={orderPaymentType}
          />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea style={{ minHeight: "100px" }} />
        </Form.Item>

        <Form.Item>
          <div className="d-flex " style={{ gap: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="btn"
              style={{ backgroundColor: "#dc3545", color: "white" }}
            >
              Lưu
            </Button>
          </div>
        </Form.Item>
      </Form> */}
    </>
  );
}

export default memo(CreateOrder);
