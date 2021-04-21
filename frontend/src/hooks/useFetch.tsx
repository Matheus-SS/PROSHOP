import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IResponse {
  data: any;
  error: string;
}
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<T>(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError('');
      })
      .catch((err) => {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
        setLoading(false);
      });
  }, [url]);
  return { data, error, loading };
}
