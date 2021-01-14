import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
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
        product_id: data._id,
        product_name: data.name,
        product_image: data.image,
        product_price: data.price,
        product_countInStock: data.countInStock,
        product_quantity: quantity,
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
