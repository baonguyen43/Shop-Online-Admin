import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "api/productApi";
import { Link } from "react-router-dom";
import { Rate, Progress } from "antd";
import Loading from "components/loading";
// Import style
import "./productDetail.scss";
import numeral from "numeral";
const url = process.env.REACT_APP_BASE_URL;
function ProductDetail(props) {
  
 
  const [isLoading, setIsLoading] = useState(null);
  const [currentTab, setCurrentTab] = useState("btn-desc");
  const [product, setProduct] = useState([]);
  const params = useParams();
  const handleProductStock = useCallback((stock) => {
    if (stock >= 100) return <p className="text-success fw-bold">Còn hàng</p>;
    if (stock < 100 && stock > 0)
      return <p className="text-warning fw-bold">Sắp hết hàng</p>;
    return <p className="text-danger fw-bold">Hết hàng</p>;
  }, []);
  
   const selectTab = (event) => {
    setCurrentTab(event.target.name);
  };
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await getProductDetail(params.id);
        console.log('res :>> ', res);
      if (res?.data) {
        setProduct(res.data);
        console.log('res.data :>> ', res.data);
        setIsLoading(false);
      } else setIsLoading(0);
    };
    getData();
  }, []);
  if (isLoading === true) {
    return <Loading />;
  }
  if (isLoading === false) {
    return (
      <div className="container">
        {/* Detail section*/}
        <div className="d-flex justify-content-end">
         
            <button type="button" 
            onClick={() => window.history.back()}
             className="btn" style={{backgroundColor:'#dc3545', color:'white'}}>
            Trở lại
            </button>
        </div>
        <div className="d-flex border gap-2 my-2">
          <img
            className="img-product-detail"
            src={product.imagePath ? product.imagePath : require("assets/images/No-Image-Placeholder.png")}
            alt=''
          />

          <div className="m-3" style={{paddingTop:'20px'}}>
            {/* {handleStatusProduct(product.createdAt)} */}
            {handleProductStock(product.stock)}
            {/* {product.stock > 0 ? (
              <p className="text-success fw-bold">Còn hàng</p>
            ) : (
              <p className="text-danger fw-bold">Hết hàng</p>
            )} */}
            <h5>{product.name}</h5>
            <div className="d-flex gap-1 align-items-center">
              <div className="d-flex align-items-center gap-1 my-1">
                <Rate allowHalf disabled value={4.5} />
                <span>(330 review)</span>
              </div>
            </div>
            <h2>{numeral(product.price).format('0,0')}đ</h2>
            <div style={{paddingTop:'50px'}}>
                <h4>Thông tin chi tiết </h4>
                <div >
                <p>{product.description}</p>
                              
                </div>
                <h4>ĐỔI TRẢ THEO ĐÚNG QUY ĐỊNH CỦA SHOP</h4>
                <ul>
                <span>Điều kiện áp dụng (trong vòng 03 ngày kể từ khi nhận sản phẩm):</span>
                  <li>Hàng hoá vẫn còn mới, chưa qua sử dụng </li>
                  <li>Hàng hóa hư hỏng do vận chuyển hoặc do nhà sản xuất</li>
                </ul>

                <ul>
                <span>Trường hợp được chấp nhận::</span>
                  <li>Hàng không đúng size, kiểu dáng như quý khách đặt hàng </li>
                  <li>Không đủ số lượng, không đủ bộ như trong đơn hàng</li>
                </ul>
                <p>
                Ấn theo dõi để ủng hộ shop và tham khảo các sản phẩm mới của shop, rất hân hạnh được phục vụ quý khách.
                </p>
              </div>
          </div>
          
          
        </div>
        {/* Descripton section */}
        {/* <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                name="btn-desc"
                onClick={selectTab}
                className={` ${
                  currentTab === "btn-desc" ? "nav-link active" : "nav-link"
                }`}
              >
                Mô tả 
              </button>
            </li>
            <li className="nav-item">
              <button
                name="btn-review"
                onClick={selectTab}
                className={` ${
                  currentTab === "btn-review" ? "nav-link active" : "nav-link"
                }`}
              >
                Review
              </button>
            </li>
            <li className="nav-item">
    <a clasNames="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
          </ul>

          <div>
            {currentTab === "btn-desc" ? (
              <div className="p-2">
                <h4>Thông tin chi tiết </h4>
                <div >
                <p>{product.description}</p>
                              
                </div>
                <h4>ĐỔI TRẢ THEO ĐÚNG QUY ĐỊNH CỦA SHOP</h4>
                <ul>
                <span>Điều kiện áp dụng (trong vòng 03 ngày kể từ khi nhận sản phẩm):</span>
                  <li>Hàng hoá vẫn còn mới, chưa qua sử dụng </li>
                  <li>Hàng hóa hư hỏng do vận chuyển hoặc do nhà sản xuất</li>
                </ul>

                <ul>
                <span>Trường hợp được chấp nhận::</span>
                  <li>Hàng không đúng size, kiểu dáng như quý khách đặt hàng </li>
                  <li>Không đủ số lượng, không đủ bộ như trong đơn hàng</li>
                </ul>
                <p>
                Ấn theo dõi để ủng hộ shop và tham khảo các sản phẩm mới của shop, rất hân hạnh được phục vụ quý khách.
                </p>
              </div>
            ) : (
              <div>
                <div className="rate-box">
                  <div className="rate-score d-flex flex-column align-items-center justify-content-center">
                    <p className="mb-1">Average rating</p>
                    <h3 className="mb-1">4.5/5</h3>
                    <Rate className="mb-1" allowHalf disabled value={4.5} />
                    <p>(3k reviews)</p>
                  </div>
                  <div className="rate-rank d-flex align-items-center flex-column justify-content-center">
                    <Progress percent={46} size="small" showInfo={false} />
                    <Progress percent={29} size="small" showInfo={false} />
                    <Progress percent={11} size="small" showInfo={false} />
                    <Progress percent={10} size="small" showInfo={false} />
                    <Progress percent={4} size="small" showInfo={false} />
                  </div>
                  <div className="rate-review d-flex align-items-center justify-content-center">
                    <button type="button" className="btn btn-outline-secondary">
                      Write you review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div> */}
      </div>
    );
  }

  return <div className="alert alert-warning py-2">No products</div>;
}

export default ProductDetail;
