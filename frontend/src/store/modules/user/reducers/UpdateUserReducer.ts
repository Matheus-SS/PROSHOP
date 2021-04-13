import { Reducer } from 'redux';
import {
  IUserState,
  UserDispatchTypes,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_REMOVE,
} from '../types/UserTypes';

const INITIAL_STATE: IUserState = {
  userInfo: null,
  error: '',
  loading: false,
  success: false,
};

const UpdateUserReducer: Reducer<IUserState> = (
  state = INITIAL_STATE,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
        error: '',
        userInfo: null,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        error: '',
        userInfo: null,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        success: false,
        userInfo: null,
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_REMOVE:
      return {
        userInfo: null,
        error: '',
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default UpdateUserReducer;
