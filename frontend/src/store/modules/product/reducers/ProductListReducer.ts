import { Reducer } from 'redux';
import {
  ProductDispatchTypes,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  IProductState,
} from '../types/ProductTypes';

// Initial Data
const INITIAL_STATE: IProductState = {
  products: [],
  loading: false,
  error: '',
};

const productListReducer: Reducer<IProductState> = (
  state = INITIAL_STATE,
  action: ProductDispatchTypes
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        error: '',
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return { products: action.payload, loading: false, error: '' };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        products: [],
      };
    default:
      return state;
  }
};

export default productListReducer;
