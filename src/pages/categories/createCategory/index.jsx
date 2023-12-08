import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getCategory, onAddCategory } from "api/categoryApi";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { memo, useCallback, useEffect, useState } from "react";

function CreateCategory(props) {
  const [CreateCategory] = Form.useForm();

  const onFinish = useCallback(async (values) => {
    try {
    
     await axiosAdmin
        .post("/categories", values)
        .then((res) => {
          message.success("Thêm danh mục thành công")
        })
        .catch(async (err) => {
          message.error("Thêm danh mục thất bại")
        });
    } catch (error) {
      message.error("Lỗi khi thêm danh mục");
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-item-center">
        <h4>THÊM DANH MỤC</h4>
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
          form={CreateCategory}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          size="large"
        >
          <h4 className="text-center my-3">Tạo mới danh mục</h4>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[
              { required: true, message: "Name is required" },
              { max: 50, message: "Maximum 50 characters" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="description" rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}>
            <TextArea
              style={{ minHeight: "150px" }}
              
            />
          </Form.Item>
          <Form.Item label="Đường dẫn ảnh thư mục (nếu có)" name="iconPath">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
            <div className="d-flex " style={{ gap: "2px" }}>
              <button type="submit" className="btn btn-dark">
                Lưu
              </button>
              <button
                type="button"
                onClick={() => CreateCategory.resetFields()}
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

export default memo(CreateCategory);
