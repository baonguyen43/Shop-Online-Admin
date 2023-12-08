import { Button, DatePicker, Form, Input } from "antd";
import { infoUserApi, updateUserApi } from "api/userApi";
import Loading from "components/loading";
import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "helper/formatDocuments";

function UpdateCustomer() {
  const { id } = useParams();
  const customerId = id;
  const [customer, setCustomer] = useState([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(null);

  console.log('formatDate :>> ', formatDate(customer.birthday));
  console.log('formatDate :>> ', customer.birthday);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("««««« customerId »»»»»", customerId);
        const response = await infoUserApi(customerId);

        setCustomer(response.data);

        console.log("««««« response.data »»»»»", response.data);

        setLoading(false);
      } catch (error) {
        console.error("err ", error);
      }
    };
    fetchData();
  }, [customerId]);

  const onFinish = useCallback(
    async (values) => {
      console.log("««««« values data »»»»»", values);
      try {
        const result = await updateUserApi(customerId, values);
        console.log("cập nhật thành công:", result);
      } catch (error) {
        console.error("Lỗi khi update ", error);
      }
    },
    [customerId]
  );

  if (loading === false) {
    return (
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <h4>Cập nhật khách hàng</h4>
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Họ"
              name="firstName"
              initialValue={customer.firstName}
              rules={[
                {
                  required: true,
                  message: "First name is required",
                },
                { max: 50, message: "Maximum 50 characters" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="lastName"
              initialValue={customer.lastName}
              rules={[
                {
                  required: true,
                  message: "Last name is required",
                },
                { max: 50, message: "Maximum 50 characters" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="birthday"
              initialValue={formatDate(customer.birthday)}
              // initialValue={customer.birthday}
              rules={[
                { required: true, message: "PhoneNumber is required" },
                { type: "phone", message: "Invalid phoneNumber format" },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              initialValue={customer.phoneNumber}
              rules={[
                { required: true, message: "PhoneNumber is required" },
                { type: "phone", message: "Invalid phoneNumber format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              initialValue={customer.address}
              rules={[
                { required: true, message: "Address is required" },
                { type: "address", message: "Invalid address format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              initialValue={customer.email}
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              initialValue={customer.password}
              rules={[
                { required: true, message: "Password is required" },
                { type: "password", message: "" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
              <div className="d-flex justify-content-between align-items-center">
                <Button type="primary" htmlType="update">
                  Lưu
                </Button>

                <Button
                  type="primary"
                  onClick={() => form.resetFields()}
                  danger
                >
                  Cài lại
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  return <Loading />;
}

export default memo(UpdateCustomer);
