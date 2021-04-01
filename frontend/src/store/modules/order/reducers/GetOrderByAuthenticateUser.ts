import { Reducer } from 'redux';
import {
  ORDER_LIST_ME_FAIL,
  ORDER_LIST_ME_REQUEST,
  ORDER_LIST_ME_SUCCESS,
  IOrderState,
  OrderDispatchTypes,
} from '../types/OrderType';

const INITIAL_STATE: IOrderState = {
  order: null,
  error: '',
  loading: false,
  success: false,
};

const GetOrderByAuthenticateUser: Reducer<IOrderState> = (
  state = INITIAL_STATE,
  action: OrderDispatchTypes
) => {
  switch (action.type) {
    case ORDER_LIST_ME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_ME_SUCCESS:
      return {
        loading: false,
        error: '',
        success: true,
        order: action.payload,
      };
    case ORDER_LIST_ME_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        order: null,
      };

    default:
      return state;
  }
};

export default GetOrderByAuthenticateUser;
