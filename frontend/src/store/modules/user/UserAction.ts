import axios from 'axios';
import { Dispatch } from 'redux';
import { RootStore } from '../../../store';
import {
  UserDispatchTypes,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REMOVE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REMOVE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REMOVE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REMOVE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REMOVE,
} from './types/UserTypes';

import {
  SHIPPING_ADDRESS_INFORMATION_REMOVE,
  ShippingAddressDispatchTypes,
} from '../shippingAddress/types/ShippingAddressTypes';
import { IUser as IUpdateUser } from './types/UserTypes';

interface IUser {
  id: string | undefined;
  name: string;
  email: string;
  password: string;
}

type newUpdateUserType = Omit<IUpdateUser, 'token'>;
// this async is because is using redux thunk
export const login = (email: string, password: string) => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    });

    // set Token when user logins
    axios.defaults.headers['Authorization'] = `Bearer ${data.token}`;

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('@ProShop:userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const logout = () => async (
  dispatch: Dispatch<UserDispatchTypes | ShippingAddressDispatchTypes>
) => {
  localStorage.removeItem('@ProShop:userInfo');
  localStorage.removeItem('@ProShop:paymentMethod');
  localStorage.removeItem('@ProShop:cartItems');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_REGISTER_REMOVE });
  dispatch({ type: USER_DETAILS_REMOVE });
  dispatch({ type: USER_UPDATE_PROFILE_REMOVE });
  dispatch({ type: SHIPPING_ADDRESS_INFORMATION_REMOVE });
  dispatch({ type: USER_LIST_REMOVE });
  document.location.href = '/login';
};

// this async is because is using redux thunk
export const registerUser = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await axios.post('/api/users', {
      name,
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('@ProShop:userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// this async is because is using redux thunk
export const getUserDetails = (id: string) => async (
  dispatch: Dispatch<UserDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// this async is because is using redux thunk
export const updateUserProfile = (user: IUser) => async (
  dispatch: Dispatch<UserDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('@ProShop:userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const listUsers = () => async (
  dispatch: Dispatch<UserDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const deleteUser = (id: string) => async (
  dispatch: Dispatch<UserDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// this async is because is using redux thunk
export const updateUser = (user: newUpdateUserType) => async (
  dispatch: Dispatch<UserDispatchTypes>,
  getState: () => RootStore
) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
