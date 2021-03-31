export const SHIPPING_ADDRESS_INFORMATION_REQUEST =
  'SHIPPING_ADDRESS_INFORMATION_REQUEST';
export const SHIPPING_ADDRESS_INFORMATION_SUCCESS =
  'SHIPPING_ADDRESS_INFORMATION_SUCCESS';
export const SHIPPING_ADDRESS_INFORMATION_FAIL =
  'SHIPPING_ADDRESS_INFORMATION_FAIL';
export const SHIPPING_ADDRESS_INFORMATION_REMOVE =
  'SHIPPING_ADDRESS_INFORMATION_REMOVE';

export const REGISTER_SHIPPING_ADDRESS_REQUEST =
  'REGISTER_SHIPPING_ADDRESS_REQUEST';
export const REGISTER_SHIPPING_ADDRESS_SUCCESS =
  'REGISTER_SHIPPING_ADDRESS_SUCCESS';
export const REGISTER_SHIPPING_ADDRESS_FAIL = 'REGISTER_SHIPPING_ADDRESS_FAIL';
export const REGISTER_SHIPPING_ADDRESS_REMOVE =
  'REGISTER_SHIPPING_ADDRESS_REMOVE';

export const UPDATE_SHIPPING_ADDRESS_REQUEST =
  'UPDATE_SHIPPING_ADDRESS_REQUEST';
export const UPDATE_SHIPPING_ADDRESS_SUCCESS =
  'UPDATE_SHIPPING_ADDRESS_SUCCESS';
export const UPDATE_SHIPPING_ADDRESS_FAIL = 'UPDATE_SHIPPING_ADDRESS_FAIL';

export const UPDATE_SHIPPING_ADDRESS_REMOVE = 'UPDATE_SHIPPING_ADDRESS_REMOVE';

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// State types of the shippingAddres
export interface IShippingAddressState {
  readonly shippingAddressInfo: IShippingAddress | null;
  readonly loading: boolean;
  readonly error: string;
  readonly success?: boolean;
}

export interface IShippingAddressInformationRequest {
  type: typeof SHIPPING_ADDRESS_INFORMATION_REQUEST;
}

export interface IShippingAddressInformationSuccess {
  type: typeof SHIPPING_ADDRESS_INFORMATION_SUCCESS;
  payload: IShippingAddress;
}

export interface IShippingAddressInformationFail {
  type: typeof SHIPPING_ADDRESS_INFORMATION_FAIL;
  payload: string;
}

export interface IShippingAddressInformationRemove {
  type: typeof SHIPPING_ADDRESS_INFORMATION_REMOVE;
}

export interface IShippingAddressRegisterRequest {
  type: typeof REGISTER_SHIPPING_ADDRESS_REQUEST;
}

export interface IShippingAddressRegisterSuccess {
  type: typeof REGISTER_SHIPPING_ADDRESS_SUCCESS;
  payload: IShippingAddress;
}

export interface IShippingAddressRegisterFail {
  type: typeof REGISTER_SHIPPING_ADDRESS_FAIL;
  payload: string;
}

export interface IShippingAddressRegisterRemove {
  type: typeof REGISTER_SHIPPING_ADDRESS_REMOVE;
  payload: string;
}

export interface IShippingAddressUpdateRequest {
  type: typeof UPDATE_SHIPPING_ADDRESS_REQUEST;
}

export interface IShippingAddressUpdateSuccess {
  type: typeof UPDATE_SHIPPING_ADDRESS_SUCCESS;
  payload: IShippingAddress;
}

export interface IShippingAddressUpdateFail {
  type: typeof UPDATE_SHIPPING_ADDRESS_FAIL;
  payload: string;
}

export interface IShippingAddressUpdateRemove {
  type: typeof UPDATE_SHIPPING_ADDRESS_REMOVE;
  payload: string;
}

export type ShippingAddressDispatchTypes =
  | IShippingAddressInformationRequest
  | IShippingAddressInformationSuccess
  | IShippingAddressInformationFail
  | IShippingAddressInformationRemove
  | IShippingAddressRegisterRequest
  | IShippingAddressRegisterSuccess
  | IShippingAddressRegisterFail
  | IShippingAddressRegisterRemove
  | IShippingAddressUpdateRequest
  | IShippingAddressUpdateSuccess
  | IShippingAddressUpdateFail
  | IShippingAddressUpdateRemove;
