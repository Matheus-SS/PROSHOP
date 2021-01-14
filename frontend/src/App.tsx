import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

import PageNotFound from './screens/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/reset-password" component={ResetPasswordScreen} />
            <Route path="/forgot-password" component={ForgotPasswordScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/shipping" component={ShippingScreen} />

            <Route
              path="/register_shipping"
              component={RegisterShippingScreen}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
