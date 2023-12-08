import { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { routers } from "router/router";

function App() {
  
  // const token = localStorage.getItem('TOKEN');
  // const navigate = useNavigate(); //khai báo sử dụng hàm chuyển trang
  
  // useEffect(() => {
  //   if (!token){ //nếu không tồn tại token trên localStorage
  //     navigate(LOCATIONS.LOGIN); //chuyển hướng về trang login
  //   }
  // }, [navigate, token]);

  // const renderRoutes = useCallback((routers) => {
  //   if (!token) { //router khi chưa đăng nhập
  //     return unAuthRouter.map((route, index) => {
  //       if (route.children && route.children.length > 0) {
  //         return (
  //           <Route path={route.path} element={route.element} key={index}>

  //             {renderRoutes(route.children)}

  //           </Route>
  //         );
  //       }

  //       if (route.isRoot) {
  //         return <Route index element={route.element} key={index} />
  //       }

  //       return <Route path={route.path} element={route.element} key={index} />;
  //     });
  //   }

  //   return routers.map((route, index) => { //router khi đã đăng nhập
  //     if (route.children && route.children.length > 0) {
  //       return (
  //         <Route path={route.path} element={route.element} key={index}>

  //           {renderRoutes(route.children)}

  //         </Route>
  //       );
  //     }

  //     if (route.isRoot) {
  //       return <Route index element={route.element} key={index} />
  //     }

  //     return <Route path={route.path} element={route.element} key={index} />;
  //   });
  // }, []);


  const renderRoutes = useCallback((routers) => {
    return routers.map((route, index) => {
      if (route.children && route.children.length > 0) {
        return (
          <Route path={route.path} element={route.element} key={index}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
  
      if (route.isRoot) {
        return <Route index element={route.element} key={index} />;
      }
  
      return <Route path={route.path} element={route.element} key={index} />;
    });
  }, []);
  return <Routes>{renderRoutes(routers)}</Routes>;
}

export default App;