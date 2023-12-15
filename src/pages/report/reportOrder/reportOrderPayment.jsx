import { SearchOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import { getCustomerAge, getOrderPayment } from 'api/reportApi';
import numeral from 'numeral';
import { useEffect, useState } from 'react';

const ReportOrderPayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = [
   
    {
      title: 'Hình ảnh',
      dataIndex: 'imagePath',
      key: 'imagePath',
      render: function (text, record) {
        return <img width={40} height={40} src={text} alt="" />;
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
       {
      title: 'Giá ',
      dataIndex: 'price',
      key: 'price',
      render: function(text){
        return  <del>{numeral(text).format('0,0')}đ</del>
      }
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      render: function (text) {
        return <strong>{`${text}%`}</strong>;
      },
    },
    {
      title: 'Giá bán',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      render: function (text, record) {
        const discountedPrice = record.price * (100 - record.discount) / 100;
        return <strong>{numeral(discountedPrice).format('0,0')}đ</strong>;
      },
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      render: function (text) {
        return <i>{numeral(text).format('0,0')}</i>;
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrderPayment(searchValue);
        setData(result?.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>HÌnh thức thanh toán  </h2>
      <Input.Search
        placeholder="Nhập thanh toán "
        allowClear
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
       <h4>thanh toán  {numeral(searchValue).format('0,0')}đ</h4>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize,
          onChange: (page) => {
            setCurrentPage(page);
          },
        }}
      />
    </div>
  );
};

export default ReportOrderPayment;