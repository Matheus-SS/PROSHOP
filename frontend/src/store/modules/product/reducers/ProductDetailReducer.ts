import { Reducer } from 'redux';
import {
  ProductDispatchTypes,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  IProductDetailState,
  initialDataForProduct,
} from '../types/ProductTypes';

// Initial Data
const INITIAL_STATE: IProductDetailState = {
  product: initialDataForProduct,
  loading: false,
  error: '',
};

const productDetailReducer: Reducer<IProductDetailState> = (
  state = INITIAL_STATE,
  action: ProductDispatchTypes
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case PRODUCT_DETAILS_SUCCESS:
      return { product: action.payload, loading: false, error: '' };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        product: initialDataForProduct,
      };
    default:
      return state;
  }
};

export default productDetailReducer;
