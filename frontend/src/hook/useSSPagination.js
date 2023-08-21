import { useEffect, useState } from 'react';
import { usePagination } from 'react-use-pagination';
import { request } from '../utils/axios';
import CSPagination from '../components/util/pagination';
import { useRecoilValue } from 'recoil';
import { user } from '../store/atom/user';

function useSSPagination(uri, body, pageSize) {
  const [length, setLength] = useState(0); // 전체 데이터 길이
  const [curPageItem, setCurPageItem] = useState([]); // 현재 페이지 아이템

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userinfo = useRecoilValue(user);

  const { currentPage, setPage } = usePagination({
    totalItems: length,
    initialPageSize: pageSize,
  });

  const fetchData = async page => {
    setLoading(true);
    try {
      const response = await request('get', `${uri}?page=${page}`, body, {
        Authorization: `Bearer ${userinfo.accessToken}`,
      });
      setLength(response.data_length);
      return response.information;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 필요한 정보가 데이터 총 길이, 현재 아이템
    const loadData = async () => {
      const result = await fetchData(currentPage);
      setCurPageItem(result);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // 페이지 변동 함수
  const onSetPage = page => {
    setPage(page - 1);
  };

  const renderSSPagination = () => {
    return (
      <CSPagination
        page={currentPage + 1}
        pageSize={pageSize}
        count={length}
        setPage={onSetPage}
      />
    );
  };

  return {
    loading,
    error,
    curPageItem,
    renderSSPagination,
  };
}

export default useSSPagination;
