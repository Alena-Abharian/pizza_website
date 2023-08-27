import React from 'react';

import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss'

type TPaginationProps = {
    currentPage:number;
    onChangePage: (page: number) => void
}

const Pagination:React.FC<TPaginationProps> = ({currentPage, onChangePage}) => {
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
                forcePage={currentPage - 1}
                renderOnZeroPageCount={null}
            />
        </>
    );
};

export default Pagination;