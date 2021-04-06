import { Reducer } from 'redux';
import {
  UserDispatchTypes,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  IUserStateList,
} from '../types/UserTypes';

const INITIAL_STATE: IUserStateList = {
  users: [],
  error: '',
  loading: false,
};

const userListReducer: Reducer<IUserStateList> = (
  state = INITIAL_STATE,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
        error: '',
        users: [],
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        error: '',
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userListReducer;
