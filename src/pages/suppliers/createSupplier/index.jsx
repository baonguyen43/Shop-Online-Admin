import { Button, Form, Input } from "antd";
import { onAddSupplier } from "api/supplierApi";
import { memo, useCallback } from "react";

function CreateSupplier() {
 

  const [form] = Form.useForm();
  

  const onFinish = useCallback(async (values) => {
    try {
      const result = await onAddSupplier(values);
      console.log("nhà cung cấp đã được thêm:", result);
      // Xử lý thành công (nếu cần)
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
      // Xử lý lỗi (nếu có)
    }
  }, []);
    return (
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <h4>Thêm mới nhà cung cấp</h4>
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
              label="Tên nhà cung cấp"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
                { max: 50, message: "Maximum 50 characters" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: "PhoneNumber is required" },
            { type: "phone", message:  "Invalid phoneNumber format"},
            ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ "
              name="address"
              rules={[
                { required: true, message: "Address is required" },
                { type: "address", message: "Invalid address format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
              <div className="d-flex justify-content-between align-items-center">
                <Button type="primary" htmlType="update">
                  Lưu 
                </Button>
              
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
}

export default memo(CreateSupplier);
