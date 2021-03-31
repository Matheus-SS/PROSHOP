import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_SAVE_PAYMENT_METHOD_REQUEST,
  CART_SAVE_PAYMENT_METHOD_SUCCESS,
  CART_SAVE_PAYMENT_METHOD_FAIL,
  CartDispatchTypes,
} from './types/CartTypes';
import { RootStore } from '../../../store';

// this async is because is using redux thunk

export const addToCart = (id: string, quantity: number) => async (
  dispatch: Dispatch<CartDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: CART_ADD_ITEM_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity: quantity,
      },
    });

    localStorage.setItem(
      '@ProShop:cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (product_id: string) => async (
  dispatch: Dispatch<CartDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM_REQUEST,
    });

    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: product_id,
    });

    localStorage.setItem(
      '@ProShop:cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const cartSavePaymentMethod = (paymentMethod: string) => async (
  dispatch: Dispatch<CartDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD_REQUEST,
    });

    dispatch({
      type: CART_SAVE_PAYMENT_METHOD_SUCCESS,
      payload: paymentMethod,
    });

    localStorage.setItem(
      '@ProShop:paymentMethod',
      JSON.stringify(paymentMethod)
    );
  } catch (error) {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
