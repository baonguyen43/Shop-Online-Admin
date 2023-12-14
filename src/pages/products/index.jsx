import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table, Typography, message } from "antd";
import { getProduct, getProductDetail } from "api/productApi";
import Loading from "components/loading";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import numeral from "numeral";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.scss";
const {Text} = Typography;  



function ProductList() {
  
  const [currentPage ,setCurrentPage ] = useState(1);
  const pageSize = 10 
  // GET API DELETE 
  const deleteProduct = useCallback((id) => async () => {
    console.log('id :>> ', id);
    try {
      const response = await axiosAdmin.patch(`/products/delete/${id}`);
     
      message.success(response.data.message);
      window.location.reload();

      return response.data;
    } catch (error) {
      message.error(
        error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm"
      );
    
    }
  });

  // COLUMNS
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
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      sorter: (a,b) => a.name.localeCompare(b.name), 
      render: function (text, record) {
      return <Link  to={`/product_detail/${record.id}`}>{text}</Link>;
      },
    },
    {
      title: 'Danh mục sản phẩm',
      dataIndex: 'category',
      key: 'categoryName',
      render: function (text, record) {
        return (
          <Link to={`categories/${record.category?.id}`}>
            {record.category?.name}
          </Link>
        );
      },
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
      sorter: (a,b) => a.price - b.price, 
      render: function (text) {
        return  <Text delete>{numeral(text).format('0,0')}đ</Text>;
      },
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a,b) => a.discount - b.discount, 
      render: function (text) {
        return <strong>{`${text}%`}</strong>;
      },
    },
    {
      title: 'Giá bán ',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      sorter: (a,b) => a.discountedPrice - b.discountedPrice, 
      render: function (text, record) {
        const discountedPrice = record.price * (100 - record.discount) / 100;
        return <strong>{numeral(discountedPrice).format('0,0')}đ</strong>;
      },
    },
   
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a,b) => a.stock - b.stock, 
      render: function (text) {
        return <i>{numeral(text).format('0,0')}</i>;
      },
    },
      
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Link to={`/update_product/${record.id}`}>
            <button className={styles.main}
             onConfirm={() => getProductDetail(record.id)}>
              {/* <EditIcon /> */}
              <EditOutlined/>
            </button>
          </Link>

          <Popconfirm
            title="Bạn có muốn xóa không?"
            okText="Đồng ý"
            cancelText="Đóng"
            onConfirm={deleteProduct(record.id)}
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
  const [product, setProduct] = useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getProduct();
      setProduct(res?.data);
      console.log('res?.data :>> ', res?.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{ minWidth: "600px" }}
        className="d-flex justify-content-between my-1"
      >
        <h3>Danh sách sản phẩm</h3>
        <div>
          <Link to="/add_product">
            <button type="button" className="btn" style={{backgroundColor:'#AE1A28', color:'white'}}>
              Tạo mới sản phẩm
            </button>
          </Link>
        </div>
      </div>
      {!isLoading ? (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={product}
          pagination={{
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
export default ProductList;
