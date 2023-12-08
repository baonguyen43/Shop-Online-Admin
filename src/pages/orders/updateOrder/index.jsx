import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getOrderDetail, updateOrder, updateStatus } from "api/orderAPI";
import { getListUserApi } from "api/userApi";
import Loading from "components/loading";
import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "helper/formatDocuments";

function UpdateOrder(props) {
  const { id } = useParams();
  const orderId = id;
  const [order, setOrder] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(null);
  const [customers, setCustomer] = useState([]);

  // const { editOrderFrom, orderDetail, closeModal } = props;
  const orderStatus = [
    {
      value: "WAITING",
      label: "WAITING",
    },
    {
      value: "COMPLETED",
      label: "COMPLETED",
    },
    {
      value: "CANCELED",
      label: "CANCELED",
    },
  ];
  const orderPaymentType = [
    {
      value: "CASH",
      label: "CASH",
    },
    {
      value: "CREDITCARD",
      label: "CREDITCARD",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("««««« categoryIdsss »»»»»", orderId);
        const response = await getOrderDetail(orderId);
        const data = response.data;
        console.log("««««« data »»»»»", data);
        setOrder(response.data);
        console.log("««««« response.data »»»»»", response.data);

        setLoading(false);
      } catch (error) {
        console.error("err orderId", error);
      }
    };
    fetchData();
  }, [orderId]);

  useEffect(() => {
    const getData = async () => {
      const customer = await getListUserApi();
      setCustomer(customer.data);
    };
    getData();
  }, []);
  const onFinish = useCallback(
    async (values) => {
      console.log("««««« values data »»»»»", values);
      try {
        const result = await updateStatus(orderId, values);

        console.log("cập nhật thành công:", result);
      } catch (error) {
        console.error("Lỗi khi update danh mục", error);
      }
    },
    [orderId]
  );

  if (loading === false) {
    return (
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <h4>CẬP NHẬT ĐƠN HÀNG</h4>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => window.history.back()}
          >
            Trở lại
          </button>
        </div>
        <div className="{styles.main_form}">
          <Form
         
            form={form}
            name="Update Order"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            onFinish={onFinish}
          >
            <Form.Item label="Mã đơn hàng" name="id" initialValue={order.id}>
              <Input disabled />
            </Form.Item>
            {/* <Form.Item
              label="Ngày tạo"
              name="createdDate"
              initialValue={new Date(order.createdDate).toLocaleDateString(
                "en-GB"
              )}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Ngày giao"
              name="shippedDate"
              initialValue={new Date(order.shippedDate).toLocaleDateString(
                "en-GB"
              )}

            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              initialValue={order.customer.address}
              rules={[
                { type: "address", message: "Invalid address format" },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              initialValue={order.customer.phoneNumber}
              rules={[
                { type: "phone", message: "Invalid phoneNumber format" },
              ]}
            >
              <Input disabled/>
            </Form.Item> */}

            <Form.Item
              label="Status"
              name="status"
              initialValue={order.status}
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

            {/* <Form.Item
              label="Payment Type"
              name="paymentType"
              initialValue={order.paymentType}
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
            </Form.Item> */}

            {/* <Form.Item
              label="Mô tả"
              name="description"
              initialValue={order.description}
            >
              <TextArea style={{ minHeight: "100px" }} />
            </Form.Item> */}

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
                {/* <Button type="primary" onClick={() => form.resetFields()} danger className="btn btn-danger">
              Đóng
            </Button> */}
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  return <Loading />;
}

export default memo(UpdateOrder);
