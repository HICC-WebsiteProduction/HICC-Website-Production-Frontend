import React from 'react';
import Pagination from 'react-js-pagination';
import '../../styles/paging.css';

export default function Paging({ page, count, setPage }) {
  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={1}
        totalItemsCount={count}
        pageRangeDisplayed={1}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={setPage}
      />
    </>
  );
}
