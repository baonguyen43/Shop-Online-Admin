import Layout from 'components/layout';
import { LOCATIONS } from 'constants/index';
import NotFoundPage from 'pages/notFoundPage';
import ProductList from 'pages/products';
import CreateProduct from 'pages/products/createProduct';
import ProductDetail from 'pages/products/productDetail';
import UpdateProduct from 'pages/products/updateProduct';


import CategoryList from 'pages/categories';
import CreateCategory from 'pages/categories/createCategory';
import UpdateCategory from 'pages/categories/updateCategory/categoryDetail';


import Login from 'pages/auth/login';
import CustomerList from 'pages/customers';
import CreateCustomer from 'pages/customers/createCustomer';
import UpdateCustomer from 'pages/customers/updateCustomer';
import Order from 'pages/orders';
import CreateOrder from 'pages/orders/createOrder';
import OrdersDetail from 'pages/orders/detailOrder';
import UpdateOrder from 'pages/orders/updateOrder';
import SupplierList from 'pages/suppliers';
import CreateSupplier from 'pages/suppliers/createSupplier';
import UpdateSupplier from 'pages/suppliers/updateSupplier';


export const routers = [
      {
        isRoot: true,
        path: LOCATIONS.LOGIN,
        name: "Login",
        element: <Login />,
      },
    {
        path: LOCATIONS.HOME_PAGE,
        name: "Layout",
        element: < Layout />,
        children: [
            { path: LOCATIONS.ORDERs, name: "New order", element: <Order /> },
            { path: LOCATIONS.ORDERs_DETAIL, name: "orders detail", element: <OrdersDetail /> },
            { path: LOCATIONS.ORDERs_UPDATE, name: "orders Update", element: <UpdateOrder /> },
            { path: LOCATIONS.ORDERs_CREATE, name: "orders CREATE", element: <CreateOrder /> },



            // { path: LOCATIONS.SIGNOUT, name: "Product List", element: <Login /> },
            
            { path: LOCATIONS.PRODUCTS, name: "Product List", element: <ProductList /> },
            { path: LOCATIONS.PRODUCT_DETAIL, name: "Product Detail", element: <ProductDetail /> },
            { path: LOCATIONS.ADD_PRODUCT, name: "Product Detail", element: <CreateProduct /> },
            { path: LOCATIONS.UPDATE_PRODUCT, name: "Product Update", element: <UpdateProduct /> },
            { path: LOCATIONS.CUSTOMERS, name: "List User", element: <CustomerList /> },
            { path: LOCATIONS.ADD_CUSTOMER, name: "Add User", element: <CreateCustomer /> },
            { path: LOCATIONS.UPDATE_CUSTOMER, name: "Update User", element: <UpdateCustomer /> },
            {
              path: LOCATIONS.ADD_CATEGORY,
              name: "Add Category ",
              element: <CreateCategory />,
            },
            {
              path: LOCATIONS.UPDATE_CATEGORY,
              name: "Update Category",
              element: <UpdateCategory />,
            },
            {
              path: LOCATIONS.CATEGORY,
              name: "Category List",
              element: <CategoryList />,
            },
            {
              path: LOCATIONS.ADD_SUPPLIER,
              name: "Add Supplier",
              element: <CreateSupplier />,
            },
            {
              path: LOCATIONS.UPDATE_SUPPLIER,
              name: "Supplier Detail",
              element: <UpdateSupplier />,
            },
            {
              path: LOCATIONS.SUPPLIER,
              name: "Supplier List",
              element: <SupplierList />,
            },
            { path: '*', name: "Not Found Page", element: <NotFoundPage /> }

        ]
    },
    // {
    //   path: LOCATIONS.LOGIN,
    //     name: "Login",
    //     element: <Login/>,
    // }
]

// export const unAuthRouter = [
//   { isRoot: true, element: <Login /> },
//   {
//     path: LOCATIONS.LOGIN,
//       name: "Login",
//       element: <Login/>,
//   }
// ]