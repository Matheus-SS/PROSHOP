import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import ProductListReducer from './store/modules/product/reducers/ProductListReducer';
import ProductDetailReducer from './store/modules/product/reducers/ProductDetailReducer';
import CartReducer from './store/modules/cart/reducers/CartReducer';
import AuthenticationUserReducer from './store/modules/user/reducers/AuthenticationUserReducer';
import RegisterUserReducer from './store/modules/user/reducers/RegisterUserReducer';
import DetailsUserReducer from './store/modules/user/reducers/DetailsUserReducer';
import UpdateProfileUserReducer from './store/modules/user/reducers/UpdateProfileUserReducer';
import UserListReducer from './store/modules/user/reducers/UserListReducer';
import UserDeleteReducer from './store/modules/user/reducers/UserDeleteReducer';
import UserUpdateReducer from './store/modules/user/reducers/UpdateUserReducer';

import DetailsShippingAddressReducer from './store/modules/shippingAddress/reducers/DetailsShippingAddressReducer';
import RegisterShippingAddressReducer from './store/modules/shippingAddress/reducers/RegisterShippingAddressReducer';
import UpdateShippingAddressReducer from './store/modules/shippingAddress/reducers/UpdateShippingAddressReducer';
import OrderCreateReducer from './store/modules/order/reducers/CreateOrderReducer';
import OrderDetailsReducer from './store/modules/order/reducers/GetOrderByIdReducer';
import OrderPayReducer from './store/modules/order/reducers/OrderPayReducer';
import GetOrderByAuthenticateUser from './store/modules/order/reducers/GetOrderByAuthenticateUser';

import { ICart } from './store/modules/cart/types/CartTypes';
import { IUser } from './store/modules/user/types/UserTypes';
import axios from 'axios';

const rootReducer = combineReducers({
  productList: ProductListReducer,
  productDetail: ProductDetailReducer,
  cart: CartReducer,
  userLogin: AuthenticationUserReducer,
  userRegister: RegisterUserReducer,
  userDetails: DetailsUserReducer,
  userUpdateProfile: UpdateProfileUserReducer,
  userList: UserListReducer,
  userDelete: UserDeleteReducer,
  userUpdate: UserUpdateReducer,
  shippingAddressInformation: DetailsShippingAddressReducer,
  registerShippingAddress: RegisterShippingAddressReducer,
  updatedShippingAddress: UpdateShippingAddressReducer,
  orderCreate: OrderCreateReducer,
  orderDetails: OrderDetailsReducer,
  orderPay: OrderPayReducer,
  orderListMe: GetOrderByAuthenticateUser,
});

const cartItems = localStorage.getItem('@ProShop:cartItems');
let cartItemsFromStorage: ICart[] = [];

if (cartItems) {
  cartItemsFromStorage = [...JSON.parse(cartItems)];
}

const userInfo = localStorage.getItem('@ProShop:userInfo');
let userInfoFromStorage: IUser | null = null;

if (userInfo) {
  userInfoFromStorage = JSON.parse(userInfo);
  axios.defaults.headers[
    'Authorization'
  ] = `Bearer ${userInfoFromStorage?.token}`;
}

const middleware = [thunk];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage, loading: false, error: '' },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof rootReducer>;

export default store;
