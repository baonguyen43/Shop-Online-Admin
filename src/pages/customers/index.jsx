import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table, message } from "antd";
import { getListUserApi, updateUserApi } from "api/userApi";
import Loading from "components/loading";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../products/Product.module.scss";



function CustomerList() {
  
  const [currentPage ,setCurrentPage ] = useState(1);
  const pageSize = 10 

  const deleteUser =useCallback((id) => async () => {
    console.log('id :>> ', id);
      try {
      const response = await axiosAdmin.patch(`/customers/delete/${id}`);
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
      title: "Tên khách hàng",
      key: "fullName",
      render: (_, record) => (
        <div className="d-flex gap-1">{record.firstName} {record.lastName}</div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address - b.address,
      // render: (_, record) => (
      //  <span >{record?.address[0]?.address}-{record?.address[0]?.wardName}-{record?.address[0]?.districtName}-{record?.address[0]?.provinceName}</span>
      // ),
      width:"15%"
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "Ngày sinh",
      key: "birthday",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {new Date(record.birthday).toLocaleDateString("en-GB")}
          {/* {format(new Date(record.birthday), "yyyy-MM-dd")} */}
        </div>
      ),
    },
  
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {record.isDeleted ? "Đã xóa" : "Đang sử dụng"}
        </div>
      ),
    },
  
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link
            to={`/update_customer/${record.id}`}
          
          >
             <button className={styles.main}
            onConfirm={() => updateUserApi(record.id)}>
                            <EditOutlined/>
  
            </button>
            
          </Link>
          <Popconfirm
              title="Bạn có muốn xóa không?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={deleteUser(record.id)}
            >
              <button className={styles.main}>
              <DeleteOutlined/>
              </button>
            </Popconfirm>
        </div>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState(null);
  const [customer, setCustomer] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
      const res = await getListUserApi();
      setCustomer(res.data);
      setIsLoading(false); 
    };
    fetchData();
  }, []);
  
  return (
  <>
      <div style={{ minWidth: "600px" }} className="d-flex justify-content-between my-1">
        <h3>Danh sách khách hàng</h3>
        <div>
          <Link to="/add_customer">
            <button type="button" className="btn"style={{backgroundColor:'#AE1A28', color:'white'}}>Tạo mới khách hàng</button>
          </Link>
        </div>
      </div>

      {!isLoading ? (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={customer}
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
    )
}

export default CustomerList;
