import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Table, Upload, message } from "antd";
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/loading";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./updateSupplier.module.scss";
import { getSupplierDetail, updateSupplier } from "api/supplierApi";

function UpdateSupplier() {
 
  const { id } = useParams();
  const supplierId = id;
  const [supplier, setSupplier] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("««««« categoryIdsss »»»»»", supplierId);
        const response = await getSupplierDetail(supplierId);
       
        setSupplier(response.data);

        console.log("««««« response.data »»»»»", response.data);
      
        setLoading(false);
      } catch (error) {
        console.error("err supplierId", error);
      }
    };
    fetchData();
  }, [supplierId]);

    const onFinish = useCallback(async (values) => {
      console.log("««««« values data »»»»»", values);
      try {
        const result = await updateSupplier(supplierId, values);
        console.log("cập nhật thành công:", result);
      } catch (error) {
        console.error("Lỗi khi update danh mục", error);
      }
    }, [supplierId]);

  if (loading === false) {
    return (
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <h4>Cập nhật nhà cung cấp</h4>
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
              initialValue={supplier.name}
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
              initialValue={supplier.email}
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
              initialValue={supplier.phoneNumber}
              rules={[{ required: true, message: "PhoneNumber is required" },
            { type: "phone", message:  "Invalid phoneNumber format"},
            ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              initialValue={supplier.address}
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
                <Button
                  type="primary"
                  onClick={() => form.resetFields()}
                  danger
                >
                  Đóng
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

export default memo(UpdateSupplier);
