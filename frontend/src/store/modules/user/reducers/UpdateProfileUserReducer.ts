import { Reducer } from 'redux';
import {
  IUserState,
  UserDispatchTypes,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REMOVE,
} from '../types/UserTypes';

const INITIAL_STATE: IUserState = {
  userInfo: null,
  error: '',
  loading: false,
  success: false,
};

const UpdateProfileUserReducer: Reducer<IUserState> = (
  state = INITIAL_STATE,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        error: '',
        userInfo: null,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        error: '',
        userInfo: action.payload,
        success: true,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        success: false,
        userInfo: null,
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_PROFILE_REMOVE:
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

export default UpdateProfileUserReducer;
