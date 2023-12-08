import { LOCATIONS } from "constants/index";
const menuList = [
  {
    label: "New Order",
    active: false,
    src: LOCATIONS.ORDERs,
  },

  {
    label: "SẢN PHẨM",
    active: false,
    src: LOCATIONS.PRODUCTS,
    // sub: [
    //   { label: "Quản lý sản phẩm", src: LOCATIONS.PRODUCTS },
    // ],
  },
  {
    label: "DANH MỤC",
    active: false,
    src: LOCATIONS.CATEGORY,
    // sub: [{ label: "Quản lý danh mục", src: LOCATIONS.CATEGORY }],
  },
  {
    label: "NHÀ CUNG CẤP",
    active: false,
    src: LOCATIONS.SUPPLIER,
    // sub: [{ label: "Quản lý nhà cung cấp ", src: LOCATIONS.SUPPLIER }],
  },
  {
    label: "KHÁCH HÀNG",
    active: false,
    src: LOCATIONS.CUSTOMERS,
    // sub: [{ label: "Quản lý khách hàng", src: LOCATIONS.CUSTOMERS }],
  },
  {
    label: "Notifications",
    active: false,
    src: LOCATIONS.MESSAGES,
  },
  {
    label: "Setting",
    active: false,
    src: LOCATIONS.SETTING,
  },
  {
    label: "Sign Out",
    active: false,
    // icon: require("assets/icon-slide/door-svgrepo-com.png"),
    src: LOCATIONS.SIGNOUT,
  },
];
export default menuList;
