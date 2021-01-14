import { Reducer } from 'redux';
import {
  UPDATE_SHIPPING_ADDRESS_FAIL,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_REQUEST,
  UPDATE_SHIPPING_ADDRESS_REMOVE,
  ShippingAddressDispatchTypes,
  IShippingAddressState,
} from '../types/ShippingAddressTypes';

const INITIAL_STATE: IShippingAddressState = {
  shippingAddressInfo: null,
  error: '',
  loading: false,
  success: false,
};

const UpdateShippingAddress: Reducer<IShippingAddressState> = (
  state = INITIAL_STATE,
  action: ShippingAddressDispatchTypes
) => {
  switch (action.type) {
    case UPDATE_SHIPPING_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return {
        shippingAddressInfo: action.payload,
        loading: false,
        error: '',
        success: true,
      };
    case UPDATE_SHIPPING_ADDRESS_FAIL:
      return {
        shippingAddressInfo: null,
        loading: false,
        error: action.payload,
        success: false,
      };

    case UPDATE_SHIPPING_ADDRESS_REMOVE:
      return {
        ...state,
        loading: false,
        error: '',
        success: false,
      };
    default:
      return state;
  }
};

export default UpdateShippingAddress;
