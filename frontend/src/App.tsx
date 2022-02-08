import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import RegisterShippingScreen from './screens/RegisterShippingScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

import PageNotFound from './screens/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
     <Header /> 
      <main className="py-3">
       <Container>
          <Routes>
            <Route  path="/" element={<HomeScreen/>} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={HomeScreen}
            />
            <Route path="/page/:pageNumber" element={<HomeScreen/>} />
            <Route path="/search/:keyword" element={<HomeScreen/>} />

            <Route path="/order/:id" element={<OrderScreen/>} />
            <Route path="/admin/orderList" element={<OrderListScreen/>} />

            <Route path="/placeorder" element={<PlaceOrderScreen/>} />
            <Route path="/payment" element={<PaymentScreen/>} />
            <Route path="/reset-password" element={<ResetPasswordScreen/>} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen/>} />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/product/:id" element={<ProductScreen/>} />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen/>}
            />
            <Route
              path="/admin/productList"
              element={<ProductListScreen/>}
            />
            <Route
              path="/admin/productList/page/:pageNumber"
              element={<ProductListScreen/>}
            />

            <Route path="/cart" element={<CartScreen/>} />
            <Route path="/admin/userList" element={<UserListScreen/>} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />

            <Route path="/shipping" element={<ShippingScreen/>} />

            <Route
              path="/register_shipping"
              element={<RegisterShippingScreen/>}
            />
            <Route element={<PageNotFound/>} />
          </Routes>
        </Container> 
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
