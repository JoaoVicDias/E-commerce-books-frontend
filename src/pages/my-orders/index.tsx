import QueryString from 'qs';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MessageModal from '../../components/messageModal';

import MyOrdersList from '../../components/myOrdersList'
import PageTitle from '../../components/pageTitle'
import Paginate from '../../components/paginate';
import SelectFilter from '../../components/selectFilter';

import api from '../../services/api'

import { Settings } from './styles'

interface Orders {
    id: string;
    createdAt: string;
    total_value: number;
    products: {
        amount: number;
        Product: {
            id: string;
            img: string;
            price: number;
            title: string
        }
    }[]
}

const MyOrders: React.FC = () => {

    const itemsPerPage = 5;

    const [orders, setOrders] = useState<Orders[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({})
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalData, setTotalData] = useState(0)
    const [error, setError] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' })

    const orderByItemsMemo = useMemo(() => ([
        { label: 'Maior preço', value: '["total_value DESC"]' },
        { label: 'Menor preço', value: '["total_value ASC"]' },
        { label: 'Mais recentes', value: '["createdAt DESC"]' },
        { label: 'Menos recentes', value: '["createdAt ASC"]' },

    ]), [])

    const onResetPaginationHandler = useCallback(() => {
        setCurrentPage(0)
        setOffset(0)
    }, [])

    const onFetchOrdersHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await api.get(`/checkout?${QueryString.stringify(filter)}&offset=${offset}&limit=${itemsPerPage}`)
            setOrders(res.data.results)
            setPageCount(Math.ceil(res.data.count / itemsPerPage))
            setTotalData(res.data.count)
            if (offset === res.data.count || offset > res.data.count) {
                onResetPaginationHandler()
            }
        } catch (error: any) {
            setError({ isOpen: true, message: error.response.data.message || "Algo deu errado, por favor tente novamente!" })
        }
        setLoading(false)
    }, [filter, offset, onResetPaginationHandler])

    const onNextPageHandler = useCallback((event) => {
        setCurrentPage(event.selected)
        return setOffset((event.selected * itemsPerPage) % totalData)
    }, [totalData])

    useEffect(() => { onFetchOrdersHandler() }, [onFetchOrdersHandler])

    return (
        <>
            <MessageModal 
                isOpen={error.isOpen}
                message={error.message}
                onClose={ () => setError(prevState => ({ ...prevState, isOpen: false })) }
                type="error"
            />
            <PageTitle>
                Meus pedidos
            </PageTitle>
            <Settings>
                <SelectFilter
                    items={orderByItemsMemo}
                    objectKey='orderBy'
                    placeHolder='Filtrar por ordem'
                    setFilter={setFilter}
                />
            </Settings>
            <MyOrdersList items={orders} loading={loading} />
            <Paginate
                onNextPageHandler={onNextPageHandler}
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                forcePage={currentPage}
            />
        </>
    )
}

export default MyOrders