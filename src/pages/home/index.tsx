import QueryString from 'qs';
import React, { useState, useCallback, useEffect, useMemo } from 'react'

import HomeProductsList from '../../components/homeProductsList';
import MessageModal from '../../components/messageModal';
import Paginate from '../../components/paginate';
import SettingsFilters from '../../components/settingsFilters';
import ZoomModal from '../../components/zoomModal';

import Categorys from '../../hooks/categoryHook';

import api from '../../services/api'

import { Container, Settings } from './styles'

interface IDataState {
    id: string;
    amount: number;
    img: string;
    price: number;
    title: string;
    categorys: {
        Category: {
            id: string;
            name: string;
        }
    }[]
    description: string;
}

interface IModalsState {
    filter: boolean;
    error: boolean;
    zoom: boolean;
}

interface IZoomModalState {
    id: string;
    title: string;
    price: number;
    description: string;
    img: string;
}

const Home: React.FC = () => {
    const itemsPerPage = 12

    const [data, setData] = useState<IDataState[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({})
    const [modals, setModals] = useState<IModalsState>({ filter: false, error: false, zoom: false })
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalData, setTotalData] = useState(0)
    const [zoomModal, setZoomModal] = useState<IZoomModalState>({ description: '', id: '', price: 0, title: '', img: '' })

    const { onFetchCategorysHandler } = Categorys()

    const filterConfigs = useMemo(() => ([
        {
            type: 'text',
            objectKey: 'title',
            label: 'Filtrar por título'
        },
        {
            label: 'Filtrar por preço',
            objectKey: { min: 'priceGt', max: 'priceLt' },
            type: 'price',
            min: 0,
            max: 2000
        }
    ]), [])

    const itemsOrderby = useMemo(() => ([
        { label: 'Maior preço', value: '["price DESC"]' },
        { label: 'Menor preço', value: '["price ASC"]' },
        { label: 'Mais recentes', value: '["createdAt DESC"]' },
        { label: 'Menos recentes', value: '["createdAt ASC"]' },
    ]), [])

    const onResetPaginationHandler = useCallback(() => {
        setCurrentPage(0)
        setOffset(0)
    }, [])

    const onOpenModalHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: true }))
    }, [])

    const onCloseModalHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: false }))
    }, [])

    const onFetchDataHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await api.get(`/product/all?${QueryString.stringify(filter)}&offset=${offset}&limit=${itemsPerPage}`)
            setData(res.data.results)
            setPageCount(Math.ceil(res.data.count / itemsPerPage))
            setTotalData(res.data.count)
            if (offset === res.data.count || offset > res.data.count) {
                onResetPaginationHandler()
            }
        } catch (error: any) {
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
            onOpenModalHandler('error')
        }
        setLoading(false)
    }, [filter, offset, onOpenModalHandler, onResetPaginationHandler])

    const onNextPageHandler = useCallback((event) => {
        setCurrentPage(event.selected)
        return setOffset((event.selected * itemsPerPage) % totalData)
    }, [totalData])

    const onClickOpenZoomModal = useCallback((data: IZoomModalState) => {
        setZoomModal(data)
        return onOpenModalHandler('zoom')
    }, [onOpenModalHandler])

    useEffect(() => {
        onFetchDataHandler()
    }, [onFetchDataHandler])

    return (
        <Container>
            <ZoomModal
                description={zoomModal.description}
                isOpen={modals.zoom}
                onClose={() => onCloseModalHandler('zoom')}
                id={zoomModal.id}
                title={zoomModal.title}
                price={zoomModal.price}
                img={zoomModal.img}
            />
            <MessageModal
                isOpen={modals.error}
                message={error}
                onClose={() => onCloseModalHandler('error')}
                type='error'

            />
            <Settings>
                <SettingsFilters
                    setFilter={setFilter}
                    filterConfigs={filterConfigs}
                    isOpen={modals.filter}
                    onOpen={() => onOpenModalHandler('filter')}
                    onClose={() => onCloseModalHandler('filter')}
                    itemsCategories={onFetchCategorysHandler}
                    itemsOrderBy={itemsOrderby}
                    objectKeyCategories='category'
                    objectKeyOrderBy='orderBy'
                    placeHolderCategories='Categorias'
                    placeHolderOrderBy="Ordenar por"
                />
            </Settings>
            <HomeProductsList
                loading={loading}
                isEmpty={!loading && data.length === 0}
                products={data}
                onClick={onClickOpenZoomModal}
            />
            <Paginate
                forcePage={currentPage}
                onNextPageHandler={onNextPageHandler}
                pageCount={pageCount}
                pageRangeDisplayed={itemsPerPage}

            />
        </Container>
    )
}


export default Home