import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Table, Upload, message } from "antd";
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/loading";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./createSupplier.module.scss";
import { getSupplierDetail, onAddSupplier, updateSupplier } from "api/supplierApi";

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
          <h4>Add new supplier</h4>
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
              label="Supplier Name"
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
              label="PhoneNumber"
              name="phoneNumber"
              rules={[{ required: true, message: "PhoneNumber is required" },
            { type: "phone", message:  "Invalid phoneNumber format"},
            ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
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

export default memo(CreateSupplier);
