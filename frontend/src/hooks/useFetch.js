import { useState, useEffect } from 'react';
import api from '../api';

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(url, { params });
        setData(data);
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params]);

  return { data, loading, error };
};

export default useFetch;
