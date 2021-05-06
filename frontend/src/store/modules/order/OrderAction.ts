import axios from 'axios';
import { Dispatch } from 'redux';
import { RootStore } from '../../../store';
import { CART_ITEM_REMOVE } from '../cart/types/CartTypes';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_ME_FAIL,
  ORDER_LIST_ME_REQUEST,
  ORDER_LIST_ME_SUCCESS,
  OrderDispatchTypes,
  IPaymentResult,
  IOrder,
} from './types/OrderType';

// this async is because is using redux thunk
export const createOrder = (order: IOrder) => async (
  dispatch: Dispatch<OrderDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_ITEM_REMOVE,
      payload: data,
    });
    localStorage.removeItem('@ProShop:cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const getOrderDetails = (id: string) => async (
  dispatch: Dispatch<OrderDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const payOrder = (
  orderId: string,
  paymentResult: IPaymentResult
) => async (
  dispatch: Dispatch<OrderDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const orderListMe = () => async (
  dispatch: Dispatch<OrderDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: ORDER_LIST_ME_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_ME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
