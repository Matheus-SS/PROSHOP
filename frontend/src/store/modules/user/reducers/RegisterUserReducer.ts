import { Reducer } from 'redux';
import {
  IUserState,
  UserDispatchTypes,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_REMOVE,
} from '../types/UserTypes';

const INITIAL_STATE: IUserState = {
  userInfo: null,
  error: '',
  loading: false,
};

const registerUserReducer: Reducer<IUserState> = (
  state = INITIAL_STATE,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        error: '',
        userInfo: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        error: '',
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        userInfo: null,
        loading: false,
        error: action.payload,
      };
    case USER_REGISTER_REMOVE:
      return {
        userInfo: null,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};

export default registerUserReducer;
