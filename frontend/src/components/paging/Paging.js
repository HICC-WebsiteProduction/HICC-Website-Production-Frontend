import React from 'react';
import Pagination from 'react-js-pagination';
import '../../styles/paging.css';

export default function Paging({ page, count, setPage }) {
  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={'<'}
        nextPageText={'>'}
        linkClassFirst="first-button"
        linkClassPrev="prev-button"
        linkClassNext="next-button"
        linkClassLast="last-button"
        onChange={setPage}
      />
    </>
  );
}
