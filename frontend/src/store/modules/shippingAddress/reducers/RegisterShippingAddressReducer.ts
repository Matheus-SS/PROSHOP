import { Reducer } from 'redux';
import {
  REGISTER_SHIPPING_ADDRESS_FAIL,
  REGISTER_SHIPPING_ADDRESS_SUCCESS,
  REGISTER_SHIPPING_ADDRESS_REQUEST,
  REGISTER_SHIPPING_ADDRESS_REMOVE,
  ShippingAddressDispatchTypes,
  IShippingAddressState,
} from '../types/ShippingAddressTypes';

const INITIAL_STATE: IShippingAddressState = {
  shippingAddressInfo: null,
  error: '',
  loading: false,
  success: false,
};

const RegisterShippingAddress: Reducer<IShippingAddressState> = (
  state = INITIAL_STATE,
  action: ShippingAddressDispatchTypes
) => {
  switch (action.type) {
    case REGISTER_SHIPPING_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SHIPPING_ADDRESS_SUCCESS:
      return {
        shippingAddressInfo: action.payload,
        loading: false,
        error: '',
        success: true,
      };
    case REGISTER_SHIPPING_ADDRESS_FAIL:
      return {
        shippingAddressInfo: null,
        loading: false,
        error: action.payload,
        success: false,
      };
    case REGISTER_SHIPPING_ADDRESS_REMOVE:
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

export default RegisterShippingAddress;
