import { Reducer } from 'redux';
import {
  UserDispatchTypes,
  IUserState,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../types/UserTypes';

const INITIAL_STATE: IUserState = {
  userInfo: null,
  error: '',
  loading: false,
};

const userDeleleReducer: Reducer<IUserState> = (
  state = INITIAL_STATE,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        userInfo: null,
        loading: false,
        success: true,
        error: '',
      };
    case USER_DELETE_FAIL:
      return {
        userInfo: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userDeleleReducer;
