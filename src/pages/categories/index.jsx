import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table, message } from "antd";
import { getCategory, getCategoryDetail } from "api/categoryApi";
import Loading from "components/loading";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../products/Product.module.scss";
// COLUMNS  


function CategoryList() {
  const [isLoading, setIsLoading] = useState(null);
  const [category, setCategory] = useState([]);
  const [currentPage ,setCurrentPage ] = useState(1);
  const pageSize = 10 

  // GET API DELETE 
  const deleteCategory =useCallback((id) => async () => {
    console.log('id :>> ', id);
      try {
      const response = await axiosAdmin.patch(`/categories/delete/${id}`);
      message.success(response.data.message);
      window.location.reload();
      
    } catch (error) {
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa danh mục");
    }
  
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'No',
      key: 'no',
      width: '1%',

      render: function (text, record, index) {
        const pageIndex = (currentPage - 1) * pageSize + index + 1;
        return <span>{pageIndex}</span>;
      },
    },
    {
      title: "Tên danh mục",
      render: (record) => {  
        return (
            <div className="d-flex align-items-center img-products">
                        <div className="mx-2">
                <p className="m-0 fw-bold">{record.name}</p>
              </div>
            </div>
        );
      },
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Ngày tạo",
      render: (record) => {
        return <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link to={`/categories/${record.id}`}>
              <button className={styles.main}
            onConfirm={() => getCategoryDetail(record.id)}>
                            <EditOutlined/>
  
            </button>
            
          </Link>
          <Popconfirm
              title="Bạn có muốn xóa không?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={deleteCategory(record.id)}
            >
              <button className={styles.main}>
              <DeleteOutlined/>
              </button>
            </Popconfirm>
        </div>
      ),
    },
  ];

 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getCategory();
      setCategory(res?.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ minWidth: "600px" }} className="d-flex justify-content-between my-1">
        <h3>Danh sách danh mục</h3>
        <div>
      
          <Link to="/add_category">
            <button type="button" className="btn" style={{backgroundColor:'#AE1A28', color:'white'}}>
              Tạo mới danh mục
            </button>
          </Link>
        </div>
      </div>
      {!isLoading ? (
        <Table
          rowKey="_id"
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={category}
         pagination=
          {{
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default CategoryList;