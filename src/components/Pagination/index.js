import React from 'react';

import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss'

const Pagination = ({onChangePage}) => {
    return (
        <>
            <ReactPaginate
                className={style.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={e => onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                renderOnZeroPageCount={null}
            />
        </>
    );
};

export default Pagination;