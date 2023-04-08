import DefaultLayout from "../layout/DefaultLayout";
import AuthLayout from "../layout/AuthLayout";

import AuthLogin from "../views/auth/Login";
import Dashboard from "../views/pages/Dashboard";
import UserSetting from "../views/pages/UserSetting";
import Setting from "../views/pages/Setting";
import EditSetting from "../views/pages/Setting/edit";
import Product from "../views/pages/Product";
import CreateProduct from "../views/pages/Product/createProduct";
import EditProduct from "../views/pages/Product/editProduct";

import Categories from "../views/pages/Categories";
import CreateCategories from "../views/pages/Categories/createCategories";
import EditCategories from "../views/pages/Categories/editCategories";

import Category from "../views/pages/Category";
import CreateCategory from "../views/pages/Category/createCategory";
import EditCategory from "../views/pages/Category/editCategory";

import User from "../views/pages/User";
import CreateUser from "../views/pages/User/createUser";
import EditUser from "../views/pages/User/editUser";

import News from "../views/pages/News";
import CreateNews from "../views/pages/News/createNews";
import EditNews from "../views/pages/News/editNews";

import Transaction from "../views/pages/Transaction";
import EditTransaction from "../views/pages/Transaction/editTransaction";

const publicRoutes = [
  { path: "/login", component: AuthLogin, layout: AuthLayout },
];

const privateRoutes = [
  { path: "/", component: Dashboard, layout: DefaultLayout },
  { path: "/user-setting", component: UserSetting, layout: DefaultLayout },
  { path: "/setting", component: Setting, layout: DefaultLayout },
  { path: "/setting-update", component: EditSetting, layout: DefaultLayout },
  { path: "/product", component: Product, layout: DefaultLayout },
  {
    path: "/product/create-product",
    component: CreateProduct,
    layout: DefaultLayout,
  },
  {
    path: "/product/edit-product/:id",
    component: EditProduct,
    layout: DefaultLayout,
  },

  { path: "/categories", component: Categories, layout: DefaultLayout },
  {
    path: "/categories/create-categories",
    component: CreateCategories,
    layout: DefaultLayout,
  },
  {
    path: "/categories/edit-categories/:id",
    component: EditCategories,
    layout: DefaultLayout,
  },

  { path: "/category", component: Category, layout: DefaultLayout },
  {
    path: "/category/create-category",
    component: CreateCategory,
    layout: DefaultLayout,
  },
  {
    path: "/category/edit-category/:id",
    component: EditCategory,
    layout: DefaultLayout,
  },

  { path: "/user", component: User, layout: DefaultLayout },
  {
    path: "/user/create-user",
    component: CreateUser,
    layout: DefaultLayout,
  },
  {
    path: "/user/edit-user/:id",
    component: EditUser,
    layout: DefaultLayout,
  },

  { path: "/news", component: News, layout: DefaultLayout },
  {
    path: "/news/create-news",
    component: CreateNews,
    layout: DefaultLayout,
  },
  {
    path: "/news/edit-news/:id",
    component: EditNews,
    layout: DefaultLayout,
  },

  { path: "/transaction", component: Transaction, layout: DefaultLayout },
  {
    path: "/transaction/edit-transaction/:id",
    component: EditTransaction,
    layout: DefaultLayout,
  },
];

export { publicRoutes, privateRoutes };
