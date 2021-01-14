import { Reducer } from 'redux';
import {
  SHIPPING_ADDRESS_INFORMATION_FAIL,
  SHIPPING_ADDRESS_INFORMATION_REMOVE,
  SHIPPING_ADDRESS_INFORMATION_REQUEST,
  SHIPPING_ADDRESS_INFORMATION_SUCCESS,
  ShippingAddressDispatchTypes,
  IShippingAddressState,
} from '../types/ShippingAddressTypes';

const INITIAL_STATE: IShippingAddressState = {
  shippingAddressInfo: null,
  error: '',
  loading: false,
  success: false,
};

const detailsShippingAddress: Reducer<IShippingAddressState> = (
  state = INITIAL_STATE,
  action: ShippingAddressDispatchTypes
) => {
  switch (action.type) {
    case SHIPPING_ADDRESS_INFORMATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SHIPPING_ADDRESS_INFORMATION_SUCCESS:
      return {
        shippingAddressInfo: action.payload,
        loading: false,
        error: '',
        success: true,
      };
    case SHIPPING_ADDRESS_INFORMATION_FAIL:
      return {
        shippingAddressInfo: null,
        loading: false,
        error: action.payload,
        success: false,
      };
    case SHIPPING_ADDRESS_INFORMATION_REMOVE:
      return {
        shippingAddressInfo: null,
        loading: false,
        error: '',
        success: false,
      };
    default:
      return state;
  }
};

export default detailsShippingAddress;
