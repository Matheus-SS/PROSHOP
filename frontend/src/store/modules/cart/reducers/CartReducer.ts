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
} from '../types/CartTypes';

const INITIAL_STATE: ICartState = {
  cartItems: [],
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
    default:
      return state;
  }
};

export default cartReducer;
