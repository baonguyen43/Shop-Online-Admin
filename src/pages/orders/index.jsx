import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table, message } from "antd";
import { getOrder, getOrderDetail } from "api/orderAPI";
import Loading from "components/loading";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../products/Product.module.scss";
import { LOCATIONS } from "constants";
// COLUMNS  


function Order(props) {
  const { orderList } = props;
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const filterCustomer = () => {
      const listCustomer = [];
      orderList?.forEach((item, index) => {
        if (!listCustomer.includes(item.customer.fullName)) {
          listCustomer.push(item.customer.fullName);
        }
      });
      return listCustomer;
    };
    const listCustomer = filterCustomer()?.map((item, index) => {
      return {
        text: item,
        value: item,
      };
    });

    setCustomers(listCustomer);
  }, [orderList]);

  const [isLoading, setIsLoading] = useState(null);
  const [category, setCategory] = useState([]);
  const [currentPage ,setCurrentPage ] = useState(1);
  const pageSize = 10 


  const updateStatus =useCallback((id) => async () => {
    console.log('id :>> ', id);
      try {
      const response = await axiosAdmin.patch(`/orders/status/${id}`);
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
      title: "Order",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a._id.localeCompare(b.id),
      render: (text, record, index) => (
        <span className="link_id">
          <Link
            rel="noopener noreferrer"
            to={`${LOCATIONS.ORDERs}/${record.id}`}
          >
            {text}
          </Link>
        </span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      filters: customers,
      onFilter: (value, record) =>
        record.customer.lastName.indexOf(value) === 0 ||
        record.customer.firstName.indexOf(value) === 0,
      sorter: (a, b) =>
        a.customer.lastName.localeCompare(b.customer.lastName) ||
        a.customer.firstName.localeCompare(b.customer.firstName),
      render: (text, record, index) => (
        <div className="cover_cus_info">
          <div className="cover_cus_name">
            <span>{record?.customer?.firstName} {record?.customer?.lastName}</span>
            {/* <span className="cus_phoneNumber">
              {record?.customer?.phoneNumber}
            </span> */}
          </div>
        </div>
      ),
    },
   
    {
      title: "Ngày tạo",
      key: "createdDate",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {new Date(record.createdDate).toLocaleDateString("en-GB")}
          {/* {format(new Date(record.birthday), "yyyy-MM-dd")} */}
        </div>
      ),
    },
    {
      title: "Ngày giao",
      key: "shippedDate",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {new Date(record.shippedDate).toLocaleDateString("en-GB")}
          {/* {format(new Date(record.birthday), "yyyy-MM-dd")} */}
        </div>
      ),
    },
   
    {
      title: "Địa chỉ",
      dataIndex: "shippingAddress",
      key:"shippingAddress",
      sorter: (a, b) => a.shippingAddress - b.shippingAddress,
      width:"15%"
    },

    // {
    //   title: "Đơn vị vận chuyển",
    //   dataIndex: "shippingCity",
    //   key:"shippingCity",
    //   sorter: (a, b) => a.shippingCity - b.shippingCity,
    //   width:"15%"
    // },
    // {
    //   title: "Thanh toán",
    //   dataIndex: "paymentType",
    //   key:"paymentType",
    //   sorter: (a, b) => {
    //     const paymentTypeA = a.paymentType.toUpperCase();
    //     const paymentTypeB = b.paymentType.toUpperCase();
      
    //     if (paymentTypeA === "CASH" && paymentTypeB === "CREDIT CARD") {
    //       return -1;
    //     } else if (paymentTypeA === "CREDIT CARD" && paymentTypeB === "CASH") {
    //       return 1;
    //     } else {
    //       return paymentTypeA.localeCompare(paymentTypeB);
    //     }
    //   },
    //   render: (text, record, index) => (
    //     <span>{text.toUpperCase()}</span>
    //   ),
    //   width:"15%"

    // },
    {
      title: "Ghi chú",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, record, index) => (
        <span className={`${styles.table} ${styles[`table_${text.toUpperCase()}`]}`}>{text.toUpperCase()}</span>
      ),
    },

  //   <Form.Item
  //   label="Thanh toán"
  //   name="paymentType"
  //   rules={[{ required: true, message: "Please type Payment Type" }]}
  // >
  //   <Select
  //     style={{
  //       width: "100%",
  //     }}
  //     placeholder="Select Payment Type"
  //     optionFilterProp="children"
  //     filterOption={(input, option) =>
  //       (option?.label ?? "").includes(input)
  //     }
  //     filterSort={(optionA, optionB) =>
  //       (optionA?.label ?? "")
  //         .toLowerCase()
  //         .localeCompare((optionB?.label ?? "").toLowerCase())
  //     }
  //     options={orderPaymentType}
  //   />
  // </Form.Item>

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link to={`/orders_update/${record.id}`}>
              <button className={styles.main}
            onConfirm={() => getOrderDetail(record.id)}>
                            <EditOutlined/>
            </button>
          </Link>
          
        </div>
      ),
    },
  ];

 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getOrder();
      setCategory(res?.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ minWidth: "600px" }} className="d-flex justify-content-between my-1">
        <h3>Danh sách đơn hàng</h3>
        <div>
      
          <Link to="/create_order">
            <button type="button" className="btn" style={{backgroundColor:'#AE1A28', color:'white'}}>
              Tạo mới đơn hàng
            </button>
          </Link>
        </div>
      </div>
      {!isLoading ? (
        <Table
          rowKey="_id"
          // rowSelection={rowSelection}
          columns={columns}
          // dataSource={category}
          dataSource={[...category].reverse()} 
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

export default Order;