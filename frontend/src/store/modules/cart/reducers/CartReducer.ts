import { Reducer } from 'redux';
import {
  CartDispatchTypes,
  ICartState,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_REQUEST,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_REQUEST,
  CART_SAVE_PAYMENT_METHOD_REQUEST,
  CART_SAVE_PAYMENT_METHOD_SUCCESS,
  CART_SAVE_PAYMENT_METHOD_FAIL,
  CART_ITEM_REMOVE,
} from '../types/CartTypes';

const INITIAL_STATE: ICartState = {
  cartItems: [],
  paymentMethod: '',
};

const cartReducer: Reducer<ICartState> = (
  state = INITIAL_STATE,
  action: CartDispatchTypes
) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
      };
    case CART_ADD_ITEM_SUCCESS:
      const item = action.payload;

      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product
              ? {
                  ...cartItem,
                  quantity: item.quantity,
                }
              : { ...cartItem }
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
      };

    case CART_REMOVE_ITEM_REQUEST:
      return {
        ...state,
      };

    case CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
        ),
      };

    case CART_REMOVE_ITEM_FAIL:
      return {
        ...state,
      };

    case CART_SAVE_PAYMENT_METHOD_REQUEST:
      return {
        ...state,
      };

    case CART_SAVE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD_FAIL:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_ITEM_REMOVE:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
