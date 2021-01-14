import { Reducer } from 'redux';
import {
  IUserState,
  UserDispatchTypes,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../types/UserTypes';

const INITIAL_STATE: IUserState = {
  userInfo: null,
  error: '',
  loading: false,
};

const authenticationUserReducer: Reducer<IUserState> = (
  state = INITIAL_STATE,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        error: '',
        userInfo: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: '',
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        userInfo: null,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        loading: false,
        error: '',
        userInfo: null,
      };
    default:
      return state;
  }
};

export default authenticationUserReducer;
