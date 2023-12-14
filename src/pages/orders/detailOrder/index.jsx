import { getOrderDetail } from "api/orderAPI";
import "numeral/locales/vi";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Form, InputNumber, Select } from "antd";
import { getProduct } from "api/productApi";
import numeral from "numeral";
import styles from "./orderDetail.module.scss";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";

function OrdersDetail(props) {
  const params = useParams();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProduct] = useState([]);

  const [orderDetail, setOrderDetail] = useState({});
  const { Option } = Select;

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    orderDetail?.orderDetails?.forEach((item) => {
      const productPrice =
        ((item.product?.price * (100 - item.product?.discount)) / 100) *
        item.quantity;

      totalPrice += productPrice;
    });

    return totalPrice;
  };

  const getStyleStatus = useCallback((text) => {
    switch (text) {
      case "COMPLETED":
        return {
          "--bg-color": "rgba(34, 197, 94, 0.16)",
          "--color": "rgb(17, 141, 87)",
        };
      case "WAITING":
        return {
          "--bg-color": "rgba(255, 171, 0, 0.16)",
          "--color": "rgb(183, 110, 0)",
        };
      case "CANCELED":
        return {
          "--bg-color": "rgba(255, 86, 48, 0.16)",
          "--color": "rgb(183, 29, 24)",
        };

      default:
        return null;
    }
  }, []);
  
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const handleProductChange = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
  setSelectedProductId(productId);
  setSelectedProduct(selectedProduct);
  };
  useEffect(() => {
    const getData = async () => {
      const order = await getOrderDetail(params.id);
      const product = await getProduct();
      setProduct(product?.data);
      if (order?.data) {
        setOrderDetail(order.data);
      }
      console.log('product? :>> ', product?.data);
      console.log('order :>> ', order?.data);
    };
    getData();
  }, []);
 


 
  

  // const handleAddToCart = () => {
  //   if (selectedProduct && quantity > 0) {
  //     const newOrderDetail = {
  //       productId: selectedProduct.id,
  //       price: selectedProduct.price,
  //       discount: selectedProduct.discount,
  //       quantity: quantity
  //     };
  
  //     const updatedOrderData = {
  //       ...orderDetail,
  //       customerId: orderDetail?.customerId,
  //       employeeId: orderDetail?.employeeId,
  //       orderDetails: newOrderDetail
  //     };
  //     addOrder(updatedOrderData)
  //       .then(response => {
  //         console.log('OrderData updated successfully:', response);
  //       })
  //       .catch(error => {
  //         console.error('Failed to update OrderData:', error);
  //       });
  //   }

  // };
  
  const handleAddToCart = () => {
    if (selectedProduct && quantity > 0) {
      const newOrderDetail = {
        productId: selectedProductId,
        price: selectedProduct.price,
        discount: selectedProduct.discount,
        quantity: quantity,
      };
      const updatedOrderDetails = [...orderDetail, newOrderDetail];
      setOrderDetail(updatedOrderDetails);
  
      // Gọi API để cập nhật OrderDetails
      const orderId = setOrderDetail 
      axiosAdmin.put(`order/${orderId}`, updatedOrderDetails)
        .then(response => {
          console.log('Cập nhật OrderDetails thành công:', response.data);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật OrderDetails:', error);
        });
      setSelectedProductId(null);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };


  return (
    <>
      
      <div className={`container-fluid ${styles.order_detail}`}>
        {/* title */}
        <div className={`row ${styles.custom_row} ${styles.title}`}>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${styles.custom_col}`}
          >
            <div className={styles.left_title}>
              <div className={styles.cover_title}>
                <span> Mã đơn hàng:</span>
                <span className={styles.order_id}>#{orderDetail?.id}</span>
              </div>

             
              <div style={{ display: "flex" }}>
              <span> Ngày giao hàng: </span>
              <span
                className={styles.create_date}
              >
                <i> {`${orderDetail?.createdDate?.substring(
                0,
                10
              )} ${orderDetail?.createdDate?.substring(11, 19)}`}</i>
               </span>
              </div>

              <div style={{ display: "flex" }}>
                <span>Trạng thái: </span>
                <span
                  className={styles.status}
                  style={getStyleStatus(orderDetail?.status)}
                >
                  {orderDetail?.status}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${styles.custom_col}`}
          >
            {/* <div className={styles.right_title}>
              <button
                onClick={() => setIsOpenEditOrder(true)}
                className={styles.btn_edit}
              >
                <EditIcon /> Edit
              </button>
            </div> */}

            {/* HEADER  */}
            <div className="d-flex justify-content-between align-item-center">
        <h4>CHI TIẾT ĐƠN HÀNG</h4>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => window.history.back()}
        >
          Trở lại
        </button>
            </div>
          </div>
        </div>

        <div className={`row ${styles.custom_row}`}>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 ${styles.custom_col}`}
          >
            <div className={styles.cover_detail_history}>
              <div className={styles.detail}>
                <div className={styles.cover_detail_edit}>
                  <span className={styles.detail_title}>ĐƠN HÀNG</span>
                </div>
                <div style={{ display: "flex", paddingTop: "24px" }}>
                  <div style={{ flex: 3 }}>Sản phẩm</div>
                  <div
                    style={{
                      display: "flex",
                      gap: "85px",
                      paddingLeft: "300px",
                    }}
                  >
                    <p>Số lượng</p>
                    <p>Đơn giá</p>
                    <p>Thành tiền</p>{" "}
                  </div>
                </div>

 {/* orderDetail Data  */}
                <div className={styles.cover_products}>
                  {orderDetail?.orderDetails?.map((item, index) => {
                    const showQuantityColumn = index < 5;
                    return (
                      <div key={item.id} className={styles.cover_product_item}>
                        <div className={styles.cover_product_name_category}>
                          {showQuantityColumn && <span>{index + 1}</span>}

                          <span className={styles.product_name}>
                            {item?.product?.name}
                          </span>
                          <span className={styles.product_category}>
                            {item?.product?.category?.name}
                          </span>
                        </div>

                        <div className={styles.cover_item_quantity_price}>
                          <span className={styles.item_quantity}>
                            x{item.quantity}
                          </span>

                          <span className={styles.item_origin_price}>
                            <del>
                              {" "}
                              {numeral(item.product?.price).format(
                                "0,0"
                              )} đ{" "}
                            </del>
                          </span>

                          <span className={styles.item_price}>
                            {numeral(
                              ((item.product?.price *
                                (100 - item.product?.discount)) /
                                100) *
                                item.quantity
                            ).format("0,0")}{" "}
                            đ
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.cover_total}>
                  <div className={styles.cover_field}>
                    <span className={styles.total}>TỔNG CỘNG</span>
                  </div>

                  <div className={styles.cover_price}>
                    <span className={styles.total_price}>
                      {numeral(calculateTotalPrice()).format("0,0")} vnđ
                    </span>
                  </div>
                </div>
              </div>


{/* THÊM orderDetails  */}
                     <div className="{styles.main_form}">
              <div style={{paddingLeft:'100px'}}> THÊM </div>
          <div style={{display:'flex'}}> 
          <span style={{width:'-webkit-fill-available'}}> Sản phẩm: </span>

          <Select
          value={selectedProductId}
          onChange={handleProductChange}
          style={{ width: "100%" }}
        >
          {products.map((product) => (
            <Option key={product.id} value={product.id}>
              {product.name}
            </Option>
          ))}
        </Select>
          </div> 
       
        {selectedProduct && (
          <div>
            <p>Giá: {selectedProduct.price}</p> 
            <p>Giảm giá: {selectedProduct.discount}%</p>
          </div>
        )}
        <div style={{display:'flex'}}> 
          <span style={{width:'-webkit-fill-available'}}> Số lượng: </span>

          <InputNumber
          value={quantity}
          min={1}
          onChange={handleQuantityChange}
          style={{ width: "100%" }}
        />
        </div> 
        <div style={{paddingTop:'15px' }}>
        <Button onChange={handleAddToCart} style={{ backgroundColor:' #dc3545', color:'white' }}> Thêm vào giỏ hàng </Button>
          
          </div> 
      </div>

            </div>
          </div>


          {/* CUSTOMER  */}
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ${styles.custom_col}`}
          >
            <div className={styles.customer}>
              <div className={styles.cover_detail_edit}>
                <span className={styles.detail_title}>Khách hàng</span>
              </div>

              <div className={styles.cover_customer}>
                <div className={styles.cover_customer_info}>
                  <div className={styles.cover_address}>
                    <span className={styles.address_field}>Ông/bà: </span>

                    <span className={styles.address}>
                      {orderDetail?.customer?.firstName +
                        orderDetail?.customer?.lastName}
                    </span>
                  </div>
                  <div className={styles.cover_address}>
                    <span className={styles.address_field}>Email:</span>

                    <span className={styles.address}>
                      {orderDetail?.customer?.email}
                    </span>
                  </div>

                  <div className={styles.cover_address}>
                    <span className={styles.address_field}>Số điện thoại:</span>

                    <span className={styles.address}>
                      {orderDetail?.customer?.phoneNumber}
                    </span>
                  </div>
                  <div className={styles.cover_address}>
                  <span className={styles.address_field}>Địa chỉ: </span>

                  <span className={styles.address}>
                    {orderDetail?.customer?.address}
                  </span>
                </div>
                </div>
              </div>

              <div className={styles.hr_bottom}></div>
              <div className={styles.cover_detail_edit}>
                <span className={styles.detail_title}>Thanh toán</span>
              </div>

              <div className={styles.cover_address}>
                <span className={styles.address_field}>Phương thức:</span>

                <span className={styles.address}>
                  {orderDetail?.paymentType &&
                    orderDetail.paymentType.toUpperCase()}
                </span>
              </div>

              <div className={styles.hr_bottom}></div>
                <div className={styles.cover_detail_edit}>
                  <span className={styles.detail_title}>Giao hàng </span>
                </div>

                <div className={styles.cover_address}>
                  <span className={styles.address_field}>Đơn vị vận chuyển: </span>

                  <span className={styles.address}>  {orderDetail?.shippingCity &&
                    orderDetail.shippingCity.toUpperCase()}  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersDetail;
