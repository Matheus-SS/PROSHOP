import axios, { AxiosError, AxiosResponse } from 'axios';
import { History } from 'history';
import store from '../store';
import { logout } from '../store/modules/user/UserAction';

//handling error when token expires
//use that function when user login
const AxiosInitiation = (history: History) => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error: AxiosError) => {
      // if the token expires the user will be logged out and redirect to homepage
      if (error.response && error.response.status === 401) {
        history.replace({ pathname: '/' });
        store.dispatch<any>(logout());
      }
      return Promise.reject(error);
    }
  );
};

export default AxiosInitiation;
