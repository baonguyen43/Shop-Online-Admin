import React, { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import menuList from "data/menuList";
// import style
import "./slide.scss";
function Slide(props) {
  const { collapsed } = props;
  const [list, setList] = useState(menuList);

  const [prevIndex, setPrevIndex] = useState(0);
  const activeSubItem = useCallback(
    (index) => {
      const newList = [...list];

      if (prevIndex !== index) {
        newList[prevIndex].isExtend = false;
        newList[index].isExtend = true;
      } else {
        const isExtend = newList[index].isExtend;
        newList[index].isExtend = !isExtend;
      }
      setPrevIndex(index);
      // if (newList[index].isExtend) {
      //   newList[index].isExtend = false;
      // } else {
      //   newList[index].isExtend = true;
      // }
      // newList[index].isExtend =
      // console.log('◀◀◀ newList ▶▶▶',newList);

      setList(newList);
    },
    [list, prevIndex]
  );

  return (
    <>
      <div className={`${collapsed ? "slide active" : "slide"}`}>
        <div className="d-flex flex-column justify-content-center  ">
          <ul className="menu-slide d-flex flex-column list-unstyled">
            {list.map((item, idx) => {
              if (item.sub) {
                // to={`${item.src}`}
                return (
                  <li className="px-3" key={idx}>
                    <Link onClick={() => activeSubItem(idx)}>
                    <div className="d-flex gap-2">
                        {/* <img
                          style={{ width: "24px", height: "24px" }}
                          src={`${item.icon}`}
                          alt=""
                        /> */}
                        {item.label}
                      </div>
                      {/* <img
                        style={{ width: "20px", height: "20px" }}
                        src={require("assets/icon-slide/arrow-down-svgrepo-com.png")}
                        alt=""
                      /> */}
                    </Link>
                    <ul
                      className={`${
                        !item.isExtend ? "d-none" : "sub-menu"
                      }  flex-column gap-2 list-unstyled`}
                    >
                      {item.sub.map((sub, index) => {
                        return (
                          <li className="sub-list" key={index}>
                            <NavLink to={`${sub.src}`}>{sub.label}</NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }

              return (
                <li className="px-3" key={idx}>
                  <NavLink to={`${item.src}`}>
                    <div className="d-flex gap-2">
                      {/* <img
                        style={{ width: "24px", height: "24px" }}
                        src={`${item.icon}`}
                        alt=""
                      /> */}
                      {item.label}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Slide;
