import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { deleteSupplier, getSupplier, getSupplierDetail } from "api/supplierApi";
import Loading from "components/loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../products/Product.module.scss";



function SupplierList() {

  const [currentPage ,setCurrentPage ] = useState(1);
  const pageSize = 10 

  const [isLoading, setIsLoading] = useState(null);
  const [supplier, setSupplier] = useState([]);

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
      title: "Tên nhà cung cấp",
      render: (record) => {
          return (
            <div className="mx-2">
              <p className="m-0 fw-bold">{record.name}</p>
            </div>
          );
      },
    },
  
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
  
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link to={`/suppliers/${record.id}`}>
          <button className={styles.main}
              onConfirm={() => getSupplierDetail(record.id)}>
                              <EditOutlined/>
    
              </button>
              
            </Link>
            <Popconfirm
                title="Bạn có muốn xóa không?"
                okText="Đồng ý"
                cancelText="Đóng"
                onConfirm={() => deleteSupplier(record._id)}
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
      const res = await getSupplier();
      setSupplier(res.data);
      setIsLoading(false); 
    };
    fetchData();
  }, []);
  
  return (
  <>
      <div style={{ minWidth: "600px" }} className="d-flex justify-content-between my-1">
        <h3>Danh sách nhà cung cấp</h3>
        <div>
          <Link to="/add_supplier">
            <button type="button" className="btn" style={{backgroundColor:'#AE1A28', color:'white'}}>Tạo mới nhà cung cấp</button>
          </Link>
        </div>
      </div>

      {!isLoading ? (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={supplier}
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

export default SupplierList;
