import { IShippingAddress } from '../../shippingAddress/types/ShippingAddressTypes';

export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL';

export const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST';
export const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS';
export const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL';
export const ORDER_PAY_RESET = 'ORDER_PAY_RESET';

export const ORDER_LIST_ME_REQUEST = 'ORDER_LIST_ME_REQUEST';
export const ORDER_LIST_ME_SUCCESS = 'ORDER_LIST_ME_SUCCESS';
export const ORDER_LIST_ME_FAIL = 'ORDER_LIST_ME_FAIL';

interface IOrderItems {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
}

export interface IPaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrder {
  _id?: string;
  orderItems: IOrderItems[];
  user?: {
    name: string;
    email: string;
  };
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  shippingAddress?: IShippingAddress;
  paymentMethod?: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  createdAt?: Date;
}

// State types of the Order
export interface ICreateOrderState {
  readonly order: IOrder | null;
  readonly loading: boolean;
  readonly error: string;
  readonly success?: boolean;
}

// State types of the Order
export interface IOrderState {
  readonly order: IOrder[] | null;
  readonly loading: boolean;
  readonly error: string;
  readonly success?: boolean;
}

export interface IOrderCreateRequest {
  type: typeof ORDER_CREATE_REQUEST;
}

export interface IOrderCreateSuccess {
  type: typeof ORDER_CREATE_SUCCESS;
  payload: IOrder;
}

export interface IOrderCreateFail {
  type: typeof ORDER_CREATE_FAIL;
  payload: string;
}

export interface IOrderDetailsRequest {
  type: typeof ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccess {
  type: typeof ORDER_DETAILS_SUCCESS;
  payload: IOrder;
}

export interface IOrderDetailsFail {
  type: typeof ORDER_DETAILS_FAIL;
  payload: string;
}

export interface IOrderCreateFail {
  type: typeof ORDER_CREATE_FAIL;
  payload: string;
}

export interface IOrderPayRequest {
  type: typeof ORDER_PAY_REQUEST;
}

export interface IOrderPaySuccess {
  type: typeof ORDER_PAY_SUCCESS;
  payload: IOrder;
}

export interface IOrderPayFail {
  type: typeof ORDER_PAY_FAIL;
  payload: string;
}

export interface IOrderPayReset {
  type: typeof ORDER_PAY_RESET;
}

export interface IOrderListMeRequest {
  type: typeof ORDER_LIST_ME_REQUEST;
}

export interface IOrderListMeSuccess {
  type: typeof ORDER_LIST_ME_SUCCESS;
  payload: IOrder[];
}

export interface IOrderListMeFail {
  type: typeof ORDER_LIST_ME_FAIL;
  payload: string;
}

export type OrderDispatchTypes =
  | IOrderCreateRequest
  | IOrderCreateSuccess
  | IOrderCreateFail
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFail
  | IOrderPayRequest
  | IOrderPaySuccess
  | IOrderPayFail
  | IOrderPayReset
  | IOrderListMeRequest
  | IOrderListMeSuccess
  | IOrderListMeFail;
