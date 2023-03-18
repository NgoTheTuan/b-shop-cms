import DefaultLayout from "../layout/DefaultLayout";
import AuthLayout from "../layout/AuthLayout";
import { lazy } from "react";

import AuthLogin from "../views/auth/Login";
import AuthRegister from "../views/auth/Register";
import Dashboard from "../views/pages/Dashboard";
import UserSetting from "../views/pages/UserSetting";
import Setting from "../views/pages/Setting";
import EditSetting from "../views/pages/Setting/edit";
import Product from "../views/pages/Product";
import CreateProduct from "../views/pages/Product/createProduct";

const publicRoutes = [
  { path: "/login", component: AuthLogin, layout: AuthLayout },
  { path: "/register", component: AuthRegister, layout: AuthLayout },
];

const privateRoutes = [
  { path: "/", component: Dashboard, layout: DefaultLayout },
  { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
  { path: "/user-setting", component: UserSetting, layout: DefaultLayout },
  { path: "/setting", component: Setting, layout: DefaultLayout },
  { path: "/setting-update", component: EditSetting, layout: DefaultLayout },
  { path: "/product", component: Product, layout: DefaultLayout },
  {
    path: "/product/create-product",
    component: CreateProduct,
    layout: DefaultLayout,
  },
];

export { publicRoutes, privateRoutes };
