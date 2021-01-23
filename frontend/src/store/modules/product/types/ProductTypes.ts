export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST';
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS';
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL';

export interface IProduct {
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  user: string;
  __v: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
}
// State types of the reducer product list
export interface IProductState {
  readonly products: IProduct[];
  readonly loading: boolean;
  readonly error: string;
}

export const initialDataForProduct = {
  rating: 0,
  numReviews: 0,
  price: 0,
  countInStock: 0,
  _id: '1',
  name: 'test',
  image: 'test',
  description: 'test',
  brand: 'test',
  category: 'test',
  user: 'user',
  __v: 0,
  reviews: ['test'],
  createdAt: '2000-10-10',
  updatedAt: '2000-10-10',
};

// State types of the reducer product detail
export interface IProductDetailState {
  readonly product: IProduct;
  readonly loading: boolean;
  readonly error: string;
}

// Type for reducer product list
export interface ProductListRequest {
  type: typeof PRODUCT_LIST_REQUEST;
}

// Type for reducer product list
export interface ProductListSuccess {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: IProduct[];
}

// Type for reducer product list
export interface ProductListFail {
  type: typeof PRODUCT_LIST_FAIL;
  payload: string;
}

// Type for reducer product detail
export interface ProductDetailRequest {
  type: typeof PRODUCT_DETAILS_REQUEST;
}

// Type for reducer product detail
export interface ProductDetailSuccess {
  type: typeof PRODUCT_DETAILS_SUCCESS;
  payload: IProduct;
}

// Type for reducer product detail
export interface ProductDetailFail {
  type: typeof PRODUCT_DETAILS_FAIL;
  payload: string;
}

// type for action of the products reducers
export type ProductDispatchTypes =
  | ProductListRequest
  | ProductListSuccess
  | ProductListFail
  | ProductDetailRequest
  | ProductDetailSuccess
  | ProductDetailFail;
