import React from 'react';
import Pagination from 'react-js-pagination';
import '../../styles/paging.css';

// Client Side Pagination
function CSPagination({ page, pageSize, count, setPage }) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={pageSize}
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
  );
}

export default CSPagination;
