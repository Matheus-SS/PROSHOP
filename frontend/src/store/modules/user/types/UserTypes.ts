export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
export const USER_REGISTER_REMOVE = 'USER_REGISTER_REMOVE';

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST';
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';
export const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL';
export const USER_DETAILS_REMOVE = 'USER_DETAILS_REMOVE';

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL';
export const USER_UPDATE_PROFILE_REMOVE = 'USER_UPDATE_PROFILE_REMOVE';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

// State types of the user
export interface IUserState {
  readonly userInfo: IUser | null;
  readonly loading: boolean;
  readonly error: string;
  readonly success?: boolean;
}

export interface IUserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

export interface IUserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: IUser;
}

export interface IUserLoginFail {
  type: typeof USER_LOGIN_FAIL;
  payload: string;
}

export interface IUserLogOut {
  type: typeof USER_LOGOUT;
}

export interface IUserRegisterRequest {
  type: typeof USER_REGISTER_REQUEST;
}

export interface IUserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: IUser;
}

export interface IUserRegisterFail {
  type: typeof USER_REGISTER_FAIL;
  payload: string;
}

export interface IUserRegisterRemove {
  type: typeof USER_REGISTER_REMOVE;
}

export interface IUserDetailsrRequest {
  type: typeof USER_DETAILS_REQUEST;
}

export interface IUserDetailsSuccess {
  type: typeof USER_DETAILS_SUCCESS;
  payload: IUser;
}

export interface IUserDetailsFail {
  type: typeof USER_DETAILS_FAIL;
  payload: string;
}

export interface IUserDetailsRemove {
  type: typeof USER_DETAILS_REMOVE;
}

export interface IUserUpdateProfileRequest {
  type: typeof USER_UPDATE_PROFILE_REQUEST;
}

export interface IUserUpdateProfileSuccess {
  type: typeof USER_UPDATE_PROFILE_SUCCESS;
  payload: IUser;
}

export interface IUserUpdateProfileFail {
  type: typeof USER_UPDATE_PROFILE_FAIL;
  payload: string;
}

export interface IUserUpdateProfileRemove {
  type: typeof USER_UPDATE_PROFILE_REMOVE;
}

export type UserDispatchTypes =
  | IUserLoginRequest
  | IUserLoginFail
  | IUserLoginSuccess
  | IUserLogOut
  | IUserRegisterRequest
  | IUserRegisterSuccess
  | IUserRegisterFail
  | IUserRegisterRemove
  | IUserDetailsrRequest
  | IUserDetailsSuccess
  | IUserDetailsFail
  | IUserDetailsRemove
  | IUserUpdateProfileRequest
  | IUserUpdateProfileSuccess
  | IUserUpdateProfileFail
  | IUserUpdateProfileRemove;
