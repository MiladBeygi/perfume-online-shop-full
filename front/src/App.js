import './App.css';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './screens/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import ErrorPage from './screens/error404Page/ErrorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layout/mainLayout/MainLayout';
import HomePage from './screens/homePage/HomePage';
import Products from './screens/products/Products';
import AboutUs from './screens/about-us/AboutUs';
import AddProduct from './screens/add-product/addProduct';
import SingleProduct from './screens/single-product/SingleProduct';
import ProductsCategory from './screens/product-category/ProductCategory';
import ProductsSubCategory from './screens/product-sub-category/ProductsSubCategory';
import Cart from './screens/cart/Cart';
import BuyProcess from './screens/buy-process/BuyProcess';
import Payment from './screens/payment/Payment';
import SuccessfulPayment from './screens/successful-payment/SuccessfulPayment';
import FailedPayment from './screens/falied-payment/FailedPayment';
import { usersSliceActions } from './store/slices/usersSlice';
import AdminPanel from './screens/admin-panel/AdminPanel';
import ProductsList from './screens/products-list/ProductsList';
import OrdersList from './screens/orders-list/OrdersList';
import axios from 'axios';
import useHttp from './hooks/use-http';
import { productsSliceActions } from './store/slices/productsSlice';


export const publicRoutes = [
  {
    name: 'پنل ادمین',
    path: '/admin-panel',
    element: <AdminPanel />
  },
  {
    name: 'خانه',
    path: '/home',
    element: <HomePage />
  },
  {
    name: 'محصولات',
    path: '/products',
    element: <Products />
  },
  {
    hide: true,
    name: 'محصولات دسته‌بندی',
    path: '/products/:category',
    element: <ProductsCategory />
  },
  {
    hide: true,
    name: 'محصولات زیرگروه',
    path: '/products/:category/:subCategory',
    element: <ProductsSubCategory />
  },
  {
    hide: true,
    name: 'توضیح محصول ',
    path: `/:products/:category/:subCategory/:productId`,
    element: <SingleProduct />
  },
  {
    name: 'درباره ما',
    path: '/about-us',
    element: <AboutUs />
  },
  {
    hide: true,
    name: 'صفحه خطا',
    path: '/error-page',
    element: <ErrorPage />,
  },
  {
    hide: true,
    name: 'ورود به بخش مدیریت',
    path: 'login',
    element: <Login />
  },
  {
    hide: true,
    name: 'سبد خرید',
    path: 'cart',
    element: <Cart />
  },
  {
    hide: true,
    name: 'ادامه فرآیند خرید',
    path: 'cart/buy-process',
    element: <BuyProcess />
  },
  {
    hide: true,
    name: 'صفحه پرداخت',
    path: 'payment',
    element: <Payment />
  },
  {
    hide: true,
    name: 'پرداخت موفق ',
    path: 'payment/successful-payment',
    element: <SuccessfulPayment />
  },
  {
    hide: true,
    name: 'پرداخت ناموفق ',
    path: 'payment/failed-payment',
    element: <FailedPayment />
  },
  {
    hide: true,
    name: 'اضافه کردن محصول',
    path: 'admin-panel/add-product',
    element: <AddProduct />
  },
  {
    hide: true,
    name: 'کالاها',
    path: 'admin-panel/products-list',
    element: <ProductsList />
  },
  {
    hide: true,
    name: 'سفارش‌ها',
    path: 'admin-panel/orders',
    element: <OrdersList />
  }
];

function App() {
  const { isLoadingProducts, errorProducts, sendRequest: fetchTasksProducts } = useHttp();
  const isLogin = useSelector(state => state.users.isLogin);
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchTasksProducts({ url: "http://localhost:3002/products" }, (data) => {
      dispatch(productsSliceActions.setProducts(data));
    });

  }, [isLogin])
  return (
    <>
      <ToastContainer />
      <div className="App" dir='rtl'>
        <MainLayout>
          <Routes>

            <Route path='/' element={<Navigate to='/home' />} />
            {publicRoutes.map((item) => <Route key={item.path} path={item.path} element={item.element} />)}
          </Routes>
        </MainLayout>

      </div>
    </>
  );
}

export default App;
