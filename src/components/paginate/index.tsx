import React from 'react'
import ReactPaginate from 'react-paginate'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import { Container } from './styles'

interface IPaginateProps {
    onNextPageHandler: (event: any) => void;
    pageCount: number;
    pageRangeDisplayed: number;
    forcePage: number;
}

const Paginate: React.FC<IPaginateProps> = ({
    onNextPageHandler,
    pageCount,
    pageRangeDisplayed,
    forcePage
}) => {

    if (pageCount === 0) return null

    return (
        <Container>
            <ReactPaginate
                breakLabel='...'
                nextLabel={<AiOutlineArrowRight />}
                onPageChange={onNextPageHandler}
                pageRangeDisplayed={pageRangeDisplayed}
                pageCount={pageCount}
                previousLabel={<AiOutlineArrowLeft />}
                containerClassName='paginate_container'
                pageClassName='paginate_li'
                activeClassName='paginate_li_active'
                previousClassName='paginate_previous'
                nextClassName='paginate_next'
                forcePage={forcePage}
            />
        </Container>
    )
}

export default Paginate