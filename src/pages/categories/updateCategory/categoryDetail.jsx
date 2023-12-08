import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  getCategoryDetail,
  updateCategory
} from "api/categoryApi";
import Loading from "components/loading";
import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateCategory() {
  const { id } = useParams();
  const categoryId = id;
  const [category, setCategory] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("««««« categoryIdsss »»»»»", categoryId);
        const response = await getCategoryDetail(categoryId);
        const data = response.data;
        console.log("««««« data »»»»»", data);
        setCategory(response.data);
        console.log("««««« response.data »»»»»", response.data);

        setLoading(false);
      } catch (error) {
        console.error("err categoryId", error);
      }
    };
    fetchData();
  }, [categoryId]);

  const onFinish = useCallback(
    async (values) => {
      console.log("««««« values data »»»»»", values);
      try {
        const result = await updateCategory(categoryId, values);

        console.log("cập nhật thành công:", result);
      } catch (error) {
        console.error("Lỗi khi update danh mục", error);
      }
    },
    [categoryId]
  );

  // const values = {
  //   id
  // };

  // onFinish(values);

  if (loading === false) {
    return (
      <div>
        <div className="d-flex justify-content-between align-item-center">
          <h4>CẬP NHẬT DANH MỤC</h4>
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
              label="Tên danh mục"
              name="name"
              initialValue={category.name}
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
                { max: 50, message: "Maximum 50 characters" },
              ]}
            >
              <Input style={{ maxWidth: "80%" }} />
              {/* <Input onChange={(e) => setName(e.target.value)}/> */}
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              initialValue={category.description}
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
            >
              <TextArea style={{ minHeight: "100px", maxWidth: "80%" }} />
            </Form.Item>
            <Form.Item
              label="Đường dẫn ảnh danh mục (nếu có)"
              name="iconPath"
              initialValue={category.iconPath}
            >
              <Input style={{ maxWidth: "80%" }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
              <div className="d-flex ">
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
          </Form>
        </div>
      </div>
    );
  }
  return <Loading />;
}

export default memo(UpdateCategory);
