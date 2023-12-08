import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosAdminMan } from "helper/axios";

function Login(props) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await axiosAdminMan.post("/authEmployees/login", values);

      localStorage.setItem("TOKEN", result.data.token);

      localStorage.setItem("REFRESH_TOKEN", result.data.refreshToken);

      // navigate("/dashboard");
      window.location.reload();
      
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
    setTimeout(() => setLoading(false), 3000);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN")

    if (token) {
      navigate("/dashboard")
    }
  }, [navigate]);

  return (
    <div className="d-flex" style={{ minHeight: "400px" }}>
      <div className="w-100 d-none d-sm-block py-3">
        <h2 className="text-center">Hi, Welcome back</h2>
        <div className="h-100 d-flex align-items-center justify-content-center">
          <img
            className={styles.img_cover}
            src={require("assets/images/login_img.png")}
            alt="img_login"
          />
        </div>
      </div>
      <div className={styles.login_form}>
        <h4>Sign in to E-Shop</h4>
        {/* <div>New user? Create an account</div> */}
        {/* <div className="alert bg-info">
            Use email : demo@minimals.cc / password : demo1234
          </div> */}
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          auto
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                type: "email",
                message: "Email is not valid",
              },
            ]}
          >
            <Input className="py-3" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be greater than 6 characters",
              },
            ]}
          >
            <Input.Password
              className="py-3"
              visibilityToggle={false}
              placeholder="Password"
            />
          </Form.Item>

          <div className="mb-4 mx-1 text-end text-black-50 text-decoration-underline">
            <Link to="#">Forgot password?</Link>
          </div>
          <Form.Item>
            <button
              type="submit"
              className="btn btn-secondary w-100 py-3"
              disabled={loading}
            >
              Login
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
