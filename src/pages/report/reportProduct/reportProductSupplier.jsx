import { SearchOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import { getProductsSupplier } from 'api/reportApi';
import numeral from 'numeral';
import { useEffect, useState } from 'react';


const ReportProductSupplier = () => {
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
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'csupplierName',
      render: function (text, record) {
         return record.supplier?.name;
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
        const result = await getProductsSupplier(searchValue);
        setData(result?.data);
        console.log('result?.data :>> ', result?.data);
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
      <h2>Sản phẩm theo nhà cung cấp</h2>
      <Input.Search
        placeholder="Nhập nhà cung cấp"
        allowClear
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
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

export default ReportProductSupplier;