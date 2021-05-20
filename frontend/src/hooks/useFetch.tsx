import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IResponse {
  data: any;
  error: string;
  loading: boolean;
}
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    axios
      .get<T>(url, {
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError('');
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(err.message);
        } else {
          setError(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
          setLoading(false);
        }
      });

    return () => {
      source.cancel('axios request cancelled');
    };
  }, [url]);
  return { data, error, loading };
}
