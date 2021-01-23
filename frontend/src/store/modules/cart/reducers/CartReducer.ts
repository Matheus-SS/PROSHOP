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
        (cartItem) => cartItem.product_id === item.product_id
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product_id === existItem.product_id
              ? {
                  ...cartItem,
                  product_quantity: item.product_quantity,
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
          (cartItem) => cartItem.product_id !== action.payload
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

    default:
      return state;
  }
};

export default cartReducer;
