import { IShippingAddress } from '../../shippingAddress/types/ShippingAddressTypes';

export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL';

interface IOrderItems {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
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
}

// State types of the Order
export interface ICreateOrderState {
  readonly order: IOrder | null;
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

export type OrderDispatchTypes =
  | IOrderCreateRequest
  | IOrderCreateSuccess
  | IOrderCreateFail
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFail;
