export const CART_ADD_ITEM_REQUEST = 'CART_ADD_ITEM_REQUEST';
export const CART_ADD_ITEM_SUCCESS = 'CART_ADD_ITEM_SUCCESS';
export const CART_ADD_ITEM_FAIL = 'CART_ADD_ITEM_FAIL';

export const CART_REMOVE_ITEM_REQUEST = 'CART_REMOVE_ITEM_REQUEST';
export const CART_REMOVE_ITEM_SUCCESS = 'CART_REMOVE_ITEM_SUCCESS';
export const CART_REMOVE_ITEM_FAIL = 'CART_REMOVE_ITEM_FAIL';

export interface ICart {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_countInStock: number;
  product_quantity: number;
}

// State types of the reducer CART
export interface ICartState {
  readonly cartItems: ICart[];
}

// Type for reducer CART
export interface CartAddItemRequest {
  type: typeof CART_ADD_ITEM_REQUEST;
}
// Type for reducer CART

export interface CartAddItemSuccess {
  type: typeof CART_ADD_ITEM_SUCCESS;
  payload: ICart;
}
// Type for reducer CART
export interface CartAddItemFail {
  type: typeof CART_ADD_ITEM_FAIL;
  payload: string;
}

export interface CartRemoveItemRequest {
  type: typeof CART_REMOVE_ITEM_REQUEST;
}
// Type for reducer CART

export interface CartRemoveItemSuccess {
  type: typeof CART_REMOVE_ITEM_SUCCESS;
  payload: string;
}
// Type for reducer CART
export interface CartRemoveItemFail {
  type: typeof CART_REMOVE_ITEM_FAIL;
  payload: string;
}

// type for action of the CART reducers
export type CartDispatchTypes =
  | CartAddItemRequest
  | CartAddItemSuccess
  | CartAddItemFail
  | CartRemoveItemRequest
  | CartRemoveItemSuccess
  | CartRemoveItemFail;
