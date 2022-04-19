import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import qs from 'qs'

import PageTitle from '../../components/pageTitle'
import FormModal from '../../components/formModal'
import MessageModal from '../../components/messageModal'
import MyProductsList from '../../components/myProductsList'
import SettingsFilters from '../../components/settingsFilters'
import Paginate from '../../components/paginate'

import { useCategory } from '../../hooks/categoryHook'
import { useForm } from '../../hooks/formReduce'

import api, { getApi } from '../../services/api'

import { Settings, BlueButton } from './styles'

interface IModalsState {
    create: boolean;
    success: boolean;
    error: boolean;
    edit: boolean;
    edit_success: boolean;
    filter: boolean;
    categoryError: boolean;
}

const MyProducts: React.FC = () => {

    const itemsPerPage = 5
    const [products, setProducts] = useState([])
    const [modals, setModals] = useState<IModalsState>({
        create: false,
        success: false,
        error: false,
        edit: false,
        edit_success: false,
        filter: false,
        categoryError: false,
    })
    const [triedSubmit, setTriedSubmit] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState({})
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalData, setTotalData] = useState(0)

    const { onFetchCategorysHandler, categorys } = useCategory()

    const createProduct = useForm({
        img: {
            type: "file",
            bodyValue: null,
            value: null,
            isValid: false,
            name: "img",
            isTouched: false,
            validationRules: {
                required: true
            }
        },
        title: {
            type: "text",
            bodyValue: "",
            value: "",
            errorMessage: "Título incorreto, por favor digite um título valido!",
            isValid: false,
            label: "Título",
            name: "title",
            isTouched: false,
            placeHolder: "Senhor dos aneis",
            validationRules: {
                required: true
            }
        },
        price: {
            type: "price",
            bodyValue: "",
            value: "",
            errorMessage: "Preço incorreto, por favor digite um preço valido!",
            isValid: false,
            label: "Preço",
            name: "price",
            isTouched: false,
            placeHolder: "R$ 100,00",
            validationRules: {
                required: true
            }
        },
        amount: {
            type: "number",
            bodyValue: "",
            value: "",
            errorMessage: "Quantidade incorreta, por favor digite uma quantidade valida!",
            isValid: false,
            label: "Quantidade",
            name: "amount",
            isTouched: false,
            placeHolder: "1",
            validationRules: {
                required: true
            }
        },
        category: {
            type: "select",
            bodyValue: "",
            value: "",
            errorMessage: "Categoria incorreta, por favor digite uma categoria valida!",
            isValid: false,
            label: "Categoria",
            name: "category",
            isTouched: false,
            placeHolder: "Aventura",
            optionsItems: onFetchCategorysHandler,
            validationRules: {
                required: true
            }
        },
        description: {
            type: "textarea",
            bodyValue: "",
            value: "",
            errorMessage: "Descrição incorreto, por favor digite uma descrição valida!",
            isValid: false,
            label: "Descrição",
            name: "description",
            isTouched: false,
            placeHolder: "A história narra o conflito contra o mal que se alastra pela Terra-média, através da luta de várias raças - Humanos, Anãos, Elfos, Ents e Hobbits - contra Orques, para evitar que o 'Anel do Poder' volte às mãos de seu criador Sauron, o Senhor Sombrio.",
            validationRules: {
                required: true
            }
        },
    })

    const editProduct = useForm({
        id: {
            type: "hidden",
            bodyValue: null,
            value: null,
            isValid: false,
            name: "id",
            isTouched: false,
            validationRules: {
            }
        },
        title: {
            type: "text",
            bodyValue: "",
            value: "",
            errorMessage: "Título incorreto, por favor digite um título valido!",
            isValid: false,
            label: "Título",
            name: "title",
            isTouched: false,
            placeHolder: "Senhor dos aneis",
            validationRules: {
                required: true
            }
        },
        price: {
            type: "price",
            bodyValue: "",
            value: "",
            errorMessage: "Preço incorreto, por favor digite um preço valido!",
            isValid: false,
            label: "Preço",
            name: "price",
            isTouched: false,
            placeHolder: "R$ 100,00",
            validationRules: {
                required: true
            }
        },
        amount: {
            type: "number",
            bodyValue: "",
            value: "",
            errorMessage: "Quantidade incorreta, por favor digite uma quantidade valida!",
            isValid: false,
            label: "Quantidade",
            name: "amount",
            isTouched: false,
            placeHolder: "1",
            validationRules: {
                required: true
            }
        },
        description: {
            type: "textarea",
            bodyValue: "",
            value: "",
            errorMessage: "Descrição incorreto, por favor digite uma descrição valida!",
            isValid: false,
            label: "Descrição",
            name: "description",
            isTouched: false,
            placeHolder: "A história narra o conflito contra o mal que se alastra pela Terra-média, através da luta de várias raças - Humanos, Anãos, Elfos, Ents e Hobbits - contra Orques, para evitar que o 'Anel do Poder' volte às mãos de seu criador Sauron, o Senhor Sombrio.",
            validationRules: {
                required: true
            }
        },
    })

    const filterConfigMemo = useMemo(() => ([
        {
            label: 'Título',
            objectKey: 'title',
            type: 'text'
        },
        {
            label: 'Preço',
            objectKey: { min: 'priceGt', max: 'priceLt' },
            type: 'price',
            min: 0,
            max: 2000
        }
    ]), [])

    const orderByItemsMemo = useMemo(() => ([
        { label: 'Maior preço', value: '["price DESC"]' },
        { label: 'Menor preço', value: '["price ASC"]' },
        { label: 'Mais recentes', value: '["createdAt DESC"]' },
        { label: 'Menos recentes', value: '["createdAt ASC"]' },
    ]), [])

    const onResetPaginationHandler = useCallback(() => {
        setCurrentPage(0)
        setOffset(0)
    }, [])

    const onCloseModalsHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: false }))
    }, [])

    const onOpenModalsHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: true }))
    }, [])

    const onClearCreateFormHandler = useCallback(() => {
        let newForm = {}

        for (let key in createProduct.formState.formInputs) {
            newForm = {
                ...newForm,
                [key]: {
                    ...createProduct.formState.formInputs[key],
                    value: '',
                    bodyValue: '',
                    isValid: false,
                    isTouched: false
                }
            }
        }

        return createProduct.onSetInputsHandler(newForm)
    }, [createProduct])

    const onFetchProductsHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await api.get(`/product?${qs.stringify(filter)}&offset=${offset}&limit=${itemsPerPage}`)
            setProducts(res.data.results)
            setPageCount(Math.ceil(res.data.count / itemsPerPage))
            setTotalData(res.data.count)
            if (offset === res.data.count || offset > res.data.count) {
                onResetPaginationHandler()
            }
        } catch (error: any) {
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
            onOpenModalsHandler('error')
        }

        setLoading(false)
    }, [filter, offset, onOpenModalsHandler, onResetPaginationHandler])

    const onCreateProductHandler = useCallback(async (event: React.FormEvent) => {
        event.preventDefault()
        setTriedSubmit(true)
        if (!createProduct.formStateIsValid) return

        try {
            const formData = new FormData()

            formData.append('title', createProduct.formState.formInputs.title.bodyValue)
            formData.append('price', createProduct.formState.formInputs.price.bodyValue)
            formData.append('amount', createProduct.formState.formInputs.amount.bodyValue)
            formData.append('description', createProduct.formState.formInputs.description.bodyValue)
            formData.append('categorys', createProduct.formState.formInputs.category.bodyValue)
            formData.append('image', createProduct.formState.formInputs.img.bodyValue)

            await axios.post(
                getApi('/product'),
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': `Beare ${localStorage.getItem('e-commerce-books-user-token')}`
                    }
                })

            onOpenModalsHandler('success')
            onClearCreateFormHandler()
            onFetchProductsHandler()
        } catch (error: any) {
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
            onOpenModalsHandler('error')
        }

        onCloseModalsHandler('create')
        setTriedSubmit(false)
    }, [createProduct.formState.formInputs.amount.bodyValue, createProduct.formState.formInputs.category.bodyValue, createProduct.formState.formInputs.description.bodyValue, createProduct.formState.formInputs.img.bodyValue, createProduct.formState.formInputs.price.bodyValue, createProduct.formState.formInputs.title.bodyValue, createProduct.formStateIsValid, onClearCreateFormHandler, onCloseModalsHandler, onFetchProductsHandler, onOpenModalsHandler])

    const onDeleteProductById = useCallback(async (id: string) => {
        try {
            await api.delete(`/product/${id}`)
            onFetchProductsHandler()
        } catch (error: any) {
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
            onOpenModalsHandler('error')
        }
    }, [onFetchProductsHandler, onOpenModalsHandler])

    const onEditProductHandler = useCallback(async (event: React.FormEvent) => {
        event.preventDefault()
        setTriedSubmit(true)
        if (!editProduct.formStateIsValid) return

        try {
            const formData = {
                title: editProduct.formState.formInputs.title.bodyValue,
                price: editProduct.formState.formInputs.price.bodyValue,
                amount: editProduct.formState.formInputs.amount.bodyValue,
                description: editProduct.formState.formInputs.description.bodyValue,
            }

            await api.patch(getApi(`/product/${editProduct.formState.formInputs.id.bodyValue}`), formData)

            onFetchProductsHandler()
            onOpenModalsHandler('edit_success')
        } catch (error: any) {
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
            onOpenModalsHandler('error')
        }

        setTriedSubmit(false)
        onCloseModalsHandler('edit')
    }, [editProduct.formState.formInputs.amount.bodyValue, editProduct.formState.formInputs.description.bodyValue, editProduct.formState.formInputs.id.bodyValue, editProduct.formState.formInputs.price.bodyValue, editProduct.formState.formInputs.title.bodyValue, editProduct.formStateIsValid, onCloseModalsHandler, onFetchProductsHandler, onOpenModalsHandler])

    const onOpenEditModalHandler = useCallback(async (data: any) => {
        let newState = editProduct.formState.formInputs

        for (let key in editProduct.formState.formInputs) {
            newState = {
                ...newState,
                [key]: {
                    ...editProduct.formState.formInputs[key],
                    value: data[key],
                    bodyValue: data[key],
                    isValid: true
                }

            }
        }

        editProduct.onSetInputsHandler(newState)
        onOpenModalsHandler('edit')
    }, [editProduct, onOpenModalsHandler])

    const onNextPageHandler = useCallback((event) => {
        setCurrentPage(event.selected)
        return setOffset((event.selected * itemsPerPage) % totalData)
    }, [totalData])

    useEffect(() => {
        onFetchProductsHandler()
    }, [onFetchProductsHandler])

    return (
        <>
            <MessageModal
                isOpen={modals.categoryError}
                message='Você precisa criar uma categoria primeiro'
                onClose={() => onCloseModalsHandler('categoryError')}
                type='error'
            />
            <MessageModal
                isOpen={modals.success}
                message='Livro cadastrado com sucesso!'
                onClose={() => onCloseModalsHandler('success')}
                type='success'
            />
            <MessageModal
                isOpen={modals.edit_success}
                message='Livro editado com sucesso!'
                onClose={() => onCloseModalsHandler('edit_success')}
                type='success'
            />
            <MessageModal
                isOpen={modals.error}
                message={error}
                onClose={() => onCloseModalsHandler('error')}
                type="error"

            />
            <FormModal
                title='Cadastrar livro'
                isOpen={modals.create}
                onClose={() => onCloseModalsHandler('create')}
                onSubmit={(event) => onCreateProductHandler(event)}
                closeButtonLabel='cancelar'
                submitButtonLabel='Criar'
                showErrorMessage={triedSubmit && !createProduct.formStateIsValid}
                inputsList={createProduct.formStateList}
                onBlurHandler={createProduct.onBlurHandler}
                onChangeHandler={createProduct.onChangeInputHandler}
            />

            <FormModal
                title='Editar livro'
                isOpen={modals.edit}
                onClose={() => onCloseModalsHandler('edit')}
                onSubmit={(event) => onEditProductHandler(event)}
                closeButtonLabel='cancelar'
                submitButtonLabel='Editar'
                showErrorMessage={triedSubmit && !editProduct.formStateIsValid}
                inputsList={editProduct.formStateList}
                onBlurHandler={editProduct.onBlurHandler}
                onChangeHandler={editProduct.onChangeInputHandler}
            />
            <PageTitle> Meus livros </PageTitle>
            <Settings>
                <BlueButton onClick={() => onOpenModalsHandler(`${categorys.length === 0 ? 'categoryError' : 'create'}`)}> Cadastrar um livro </BlueButton>
                <SettingsFilters
                    filterConfigs={filterConfigMemo}
                    isOpen={modals.filter}
                    onClose={() => onCloseModalsHandler('filter')}
                    onOpen={() => onOpenModalsHandler('filter')}
                    setFilter={setFilter}
                    itemsCategories={onFetchCategorysHandler}
                    objectKeyCategories='category'
                    placeHolderCategories='Categorias'
                    itemsOrderBy={orderByItemsMemo}
                    objectKeyOrderBy='orderBy'
                    placeHolderOrderBy='Ordernar por'
                />
                <div></div>
            </Settings>
            <MyProductsList
                isEmpty={products.length === 0}
                loading={loading}
                products={products}
                onDelete={onDeleteProductById}
                onEdit={onOpenEditModalHandler}
            />
            <Paginate
                forcePage={currentPage}
                onNextPageHandler={onNextPageHandler}
                pageCount={pageCount}
                pageRangeDisplayed={itemsPerPage}

            />
        </>
    )
}

export default MyProducts
