import axios from 'axios';
import { Dispatch } from 'redux';
import { RootStore } from '../../../store';
import {
  SHIPPING_ADDRESS_INFORMATION_FAIL,
  SHIPPING_ADDRESS_INFORMATION_REQUEST,
  SHIPPING_ADDRESS_INFORMATION_SUCCESS,
  REGISTER_SHIPPING_ADDRESS_FAIL,
  REGISTER_SHIPPING_ADDRESS_REQUEST,
  REGISTER_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_FAIL,
  UPDATE_SHIPPING_ADDRESS_REQUEST,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
  ShippingAddressDispatchTypes,
} from './types/ShippingAddressTypes';

interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// this async is because is using redux thunk
export const getAddressInformation =
  () =>
  async (
    dispatch: Dispatch<ShippingAddressDispatchTypes>,
    getState: () => RootStore
  ) => {
    try {
      dispatch({
        type: SHIPPING_ADDRESS_INFORMATION_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(`/api/address`, config);

      dispatch({
        type: SHIPPING_ADDRESS_INFORMATION_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SHIPPING_ADDRESS_INFORMATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// this async is because is using redux thunk
export const createShippingAddress =
  ({ address, city, country, postalCode }: IShippingAddress) =>
  async (
    dispatch: Dispatch<ShippingAddressDispatchTypes>,
    getState: () => RootStore
  ) => {
    try {
      dispatch({
        type: REGISTER_SHIPPING_ADDRESS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/address`,
        {
          address,
          city,
          postalCode,
          country,
        },
        config
      );

      dispatch({
        type: REGISTER_SHIPPING_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: REGISTER_SHIPPING_ADDRESS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// this async is because is using redux thunk
export const updateShippingAddress =
  ({ address, city, country, postalCode }: IShippingAddress) =>
  async (
    dispatch: Dispatch<ShippingAddressDispatchTypes>,
    getState: () => RootStore
  ) => {
    try {
      dispatch({
        type: UPDATE_SHIPPING_ADDRESS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/address`,
        {
          address,
          city,
          postalCode,
          country,
        },
        config
      );

      dispatch({
        type: UPDATE_SHIPPING_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_SHIPPING_ADDRESS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
