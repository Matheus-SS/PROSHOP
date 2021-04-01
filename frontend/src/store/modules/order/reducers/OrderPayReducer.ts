import { Reducer } from 'redux';
import {
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ICreateOrderState,
  OrderDispatchTypes,
  ORDER_PAY_RESET,
} from '../types/OrderType';

const INITIAL_STATE: ICreateOrderState = {
  order: null,
  error: '',
  loading: false,
  success: false,
};

const OrderPayReducer: Reducer<ICreateOrderState> = (
  state = INITIAL_STATE,
  action: OrderDispatchTypes
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        error: '',
        success: true,
        order: action.payload,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        order: null,
      };
    case ORDER_PAY_RESET:
      return {
        loading: false,
        error: '',
        success: false,
        order: null,
      };
    default:
      return state;
  }
};

export default OrderPayReducer;
