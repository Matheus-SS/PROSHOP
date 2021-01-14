import { Reducer } from 'redux';
import {
  IUserState,
  UserDispatchTypes,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_REMOVE,
} from '../types/UserTypes';

const INITIAL_STATE: IUserState = {
  userInfo: null,
  error: '',
  loading: false,
};

const detailsUserReducer: Reducer<IUserState> = (
  state = INITIAL_STATE,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        error: '',
        userInfo: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        userInfo: null,
        loading: false,
        error: action.payload,
      };
    case USER_DETAILS_REMOVE:
      return {
        userInfo: null,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};

export default detailsUserReducer;
