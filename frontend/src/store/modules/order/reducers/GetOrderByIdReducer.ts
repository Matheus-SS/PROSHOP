import { Reducer } from 'redux';
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ICreateOrderState,
  OrderDispatchTypes,
} from '../types/OrderType';

const INITIAL_STATE: ICreateOrderState = {
  order: null,
  error: '',
  loading: false,
  success: false,
};

const GetOrderById: Reducer<ICreateOrderState> = (
  state = INITIAL_STATE,
  action: OrderDispatchTypes
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        error: '',
        success: true,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
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

export default GetOrderById;
