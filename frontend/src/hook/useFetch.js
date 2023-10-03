import { useEffect, useState } from 'react';
import { request } from './../utils/axios';

// useFetch
// 서버로부터 get으로 정보를 받아올 때 사용
// parameter: url: base_url 제외한 뒷 부분
// return: data: 서버에서 받은 값, loading: 로딩 중, error: 에러
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await request('get', url);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
