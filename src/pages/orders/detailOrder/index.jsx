import { getOrderDetail } from "api/orderAPI";
import "numeral/locales/vi";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Form, Modal } from "antd";
import EditIcon from "components/svg/edit";
import styles from "./orderDetail.module.scss";
import numeral from "numeral";

function OrdersDetail(props) {
  const params = useParams();

  const [editOrderFrom] = Form.useForm();

  const [orderDetail, setOrderDetail] = useState({});

  const [isOpenEditOrder, setIsOpenEditOrder] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await getOrderDetail(params.id);
      console.log("res :>> ", res);
      if (res?.data) {
        setOrderDetail(res.data);
        console.log("res.data :>> ", res.data);
      }
    };
    getData();
  }, []);

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

  // const rederTotalOriginPrice = useCallback(() => {
  //   let total = 0;

  //   orderDetail?.orderDetails?.forEach((item) => {
  //     total +=
  //       (parseInt(item.price) *
  //         parseInt(item.quantity) *
  //         (100 - parseInt(item.discount))) /
  //       100;
  //   });

  //   return total;
  // }, [orderDetail?.orderDetails]);

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

  const closeModal = useCallback(() => {
    setIsOpenEditOrder(false);
  }, []);

  return (
    <>
      {/* <Modal
        open={isOpenEditOrder}
        centered
        title="Add Shipping Address"
        onCancel={() => {
          setIsOpenEditOrder(false);
          editOrderFrom.resetFields();
        }}
        cancelText="Close"
        okButtonProps={{ style: { display: "none" } }}
      >
        <FormEditOrder
          editOrderFrom={editOrderFrom}
          orderDetail={orderDetail}
          closeModal={closeModal}
        />
      </Modal> */}

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

           
            </div>
          </div>

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
