import React, { useState } from "react";
import Header from "components/header";
import { Outlet } from "react-router-dom";
import Footer from "components/footer";
import Slide from "components/slide";
// import styles
import "./layout.scss";
function Layout(props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="w-100 flex-column">
      <div>
        <Header>
          <button
            className="btn-mobile"
            onClick={() => {
              setCollapsed((prev) => !prev);
            }}
          >
            <img
              src={require("assets/icon-slide/menu-svgrepo-com.png")}
              alt=""
            ></img>
          </button>
        </Header>
      </div>
      <div className="d-flex">
        <Slide collapsed={collapsed} />
        <main
          onScroll={() => {
            setCollapsed(false);
          }}
          onClick={() => {
            setCollapsed(false);
          }}
          className="w-100 "
        >
          <div className="layout">
            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
