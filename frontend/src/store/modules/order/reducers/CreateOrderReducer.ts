import { Reducer } from 'redux';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ICreateOrderState,
  OrderDispatchTypes,
} from '../types/OrderType';

const INITIAL_STATE: ICreateOrderState = {
  order: null,
  error: '',
  loading: false,
  success: false,
};

const CreateOrder: Reducer<ICreateOrderState> = (
  state = INITIAL_STATE,
  action: OrderDispatchTypes
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        error: '',
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
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

export default CreateOrder;
