import { SearchOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import { getProductsCategory } from 'api/reportApi';
import numeral from 'numeral';
import { useEffect, useState } from 'react';

// const ReportProductCategory = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [data, setData] = useState([]);
  

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const result = await getProductsCategory();
//       setData(result?.data);
//           } catch (error) {
//             setError(error);
//           } finally {
//             setIsLoading(false);
//           }
//         };
    
//         fetchData();
//       }, []);
  
//     if (isLoading) {
//       return <div>Loading...</div>;
//     }
  
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     }
 

// return (
//     <div >
//       <h2>Tất cả sản phẩm theo danh mục SÁCH </h2>
//       <table style={{borderSpacing:'10px', borderCollapse:'separate'}}>
//         <thead >
//           <tr style={{padding:'10px'}}>
//             <th> Hình ảnh </th>
//             <th>Tên sản phẩm</th>
//             <th>Giá</th>
//             <th>Tồn kho</th>
//             <th>Giảm giá</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//                 <td> 
//                 <img
//             width={'40px'}
//             height={'40px'}

//             src={item.imagePath} 
//             alt=''
//           />
//                 </td>
//               <td>{item.name}</td>
//               <td>{numeral(item.price).format('0,0')}đ </td>
//               <td>{item.stock}</td>
//               <td>{item.discount} % </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportProductCategory;

const ReportProductCategory = () => {
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
      title: 'Danh mục sản phẩm',
      dataIndex: 'category',
      key: 'categoryName',
      render: function (text, record) {
         return record.category?.name;
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
        const result = await getProductsCategory(searchValue);
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
      <h2>Sản phẩm theo danh mục</h2>
      <Input.Search
        placeholder="Nhập danh mục"
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

export default ReportProductCategory;