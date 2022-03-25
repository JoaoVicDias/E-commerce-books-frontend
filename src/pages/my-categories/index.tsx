import React, { useCallback, useEffect, useState, useMemo } from 'react'
import qs from 'qs'
import ReactPaginate from 'react-paginate'

import PageTitle from '../../components/pageTitle'
import FormModal from '../../components/formModal'
import MessageModal from '../../components/messageModal'
import GridItemList from '../../components/gridCategorieslist'
import Filter from '../../components/filter'

import { useForm } from '../../hooks/formReduce'

import api from '../../services/api'

import { Container, Settings, BlueButton } from './styles'

interface IDataState {
    id: string;
    name: string;
    userId: string;
}

interface IModalsState {
    create: boolean;
    edit: boolean;
    success: boolean;
    error: boolean;
}


const MyCategories: React.FC = () => {

    const itemsPerPage = 5;

    const [data, setData] = useState<IDataState[]>([])
    const [totalData, setTotalData] = useState(0)
    const [modals, setModals] = useState<IModalsState>({
        create: false,
        edit: false,
        success: false,
        error: false
    })
    const [filter, setFilter] = useState({})
    const [triedSubmit, setTriedSubmit] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterIsOpen, setFilterisOpen] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(0)

    const createForm = useForm({
        name: {
            type: "text",
            bodyValue: "",
            value: "",
            errorMessage: "Nome da categoria incorreto, por favor digite um nome valido!",
            isValid: false,
            label: "Nome",
            name: "name",
            placeHolder: "Economia",
            validationRules: {
                required: true
            }
        }
    })

    const editForm = useForm({
        id: {
            type: "hidden",
            bodyValue: "",
            value: "",
            isValid: true,
            name: "id",
        },

        name: {
            type: "text",
            bodyValue: "",
            value: "",
            errorMessage: "Nome da categoria incorreto, por favor digite um nome valido!",
            isValid: false,
            label: "Nome",
            name: "name",
            placeHolder: "Economia",
            validationRules: {
                required: true
            }
        }
    })

    const filterConfigs = useMemo(() => ([
        {
            label: 'Filtrar por nome',
            objectKey: 'name',
            type: 'text'
        }
    ]), [])

    const onCloseModalHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: false }))
    }, [])

    const onOpenModalHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: true }))
    }, [])

    const onClearFormInputsHandle = useCallback(() => {
        let newInputsState = createForm.formState.formInputs;

        for (let key in createForm.formState.formInputs) {
            newInputsState = {
                ...newInputsState,
                [key]: {
                    ...createForm.formState.formInputs[key],
                    bodyValue: '',
                    value: '',
                    isValid: false
                }
            }
        }

        return createForm.onSetInputsHandler(newInputsState)
    }, [createForm])

    const onFetchCategoriesHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await api.get(`/category?${qs.stringify(filter)}&offset=${offset}&limit=${itemsPerPage}`)
            setData(res.data.results)
            setLoading(false)
            setPageCount(Math.ceil(res.data.count / itemsPerPage))
            setTotalData(res.data.count)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [filter, offset])

    const onSubmitCreateCategoryHandler = useCallback(async (event: React.FormEvent) => {
        event.preventDefault()
        setTriedSubmit(true)
        if (!createForm.formStateIsValid) return

        try {
            await api.post('/category', { name: createForm.formState.formInputs.name.bodyValue })

            onFetchCategoriesHandler()
            onOpenModalHandler('success')
            onCloseModalHandler('create')
        } catch (error: any) {
            console.log(error)
            onCloseModalHandler('create')
            onOpenModalHandler('error')
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
        }

        onClearFormInputsHandle()
        setTriedSubmit(false)
    }, [createForm.formState.formInputs.name.bodyValue, createForm.formStateIsValid, onClearFormInputsHandle, onCloseModalHandler, onFetchCategoriesHandler, onOpenModalHandler])

    const onDeleteCategoryByIdHandler = useCallback(async (id: string) => {
        try {
            await api.delete(`/category/${id}`)
            onFetchCategoriesHandler()
        } catch (error: any) {
            console.log(error)
            onOpenModalHandler('error')
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
        }
    }, [onFetchCategoriesHandler, onOpenModalHandler])

    const onClickEditButtonHandler = useCallback((data: { id: string, name: string }) => {
        onOpenModalHandler('edit')

        editForm.onSetInputsHandler({
            id: {
                ...editForm.formState.formInputs['id'],
                value: data.id,
                bodyValue: data.id,
                isValid: true
            },
            name: {
                ...editForm.formState.formInputs['name'],
                value: data.name,
                bodyValue: data.name,
                isValid: true
            }
        })
    }, [editForm, onOpenModalHandler])

    const onEditCategoryByIdHandler = useCallback(async () => {
        try {
            await api.patch(`/category/${editForm.formState.formInputs.id.bodyValue}`, { name: editForm.formState.formInputs.name.bodyValue })

            onFetchCategoriesHandler()
            onCloseModalHandler('edit')
        } catch (error: any) {
            onOpenModalHandler('error')
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
        }
    }, [editForm.formState.formInputs.id.bodyValue, editForm.formState.formInputs.name.bodyValue, onCloseModalHandler, onFetchCategoriesHandler, onOpenModalHandler])

    const onCloseFilterHandler = useCallback(() => {
        return setFilterisOpen(false)
    }, [])

    const onOpenFilterHandler = useCallback(() => {
        return setFilterisOpen(true)
    }, [])

    const onNextPageHandler = useCallback((event) => {
        return setOffset((event.selected * itemsPerPage) % totalData)
    }, [totalData])

    useEffect(() => {
        onFetchCategoriesHandler()
    }, [onFetchCategoriesHandler])

    return (
        <Container>
            <MessageModal
                isOpen={modals.success}
                message="Categoria criada com sucesso!"
                onClose={() => onCloseModalHandler('success')}
                type='success'
            />
            <MessageModal
                isOpen={modals.error}
                message={error}
                onClose={() => onCloseModalHandler('error')}
                type='error'
            />
            <FormModal
                title='Criar uma categoria'
                closeButtonLabel='Cancelar'
                submitButtonLabel='Criar'
                onSubmit={onSubmitCreateCategoryHandler}
                isOpen={modals.create}
                onClose={() => onCloseModalHandler('create')}
                inputsList={createForm.formStateList}
                onChangeHandler={createForm.onChangeInputHandler}
                showErrorMessage={triedSubmit && !createForm.formStateIsValid}
            />

            <FormModal
                title='Editar categoria'
                closeButtonLabel='Cancelar'
                submitButtonLabel='Editar'
                onSubmit={onEditCategoryByIdHandler}
                isOpen={modals.edit}
                onClose={() => onCloseModalHandler('edit')}
                inputsList={editForm.formStateList}
                onChangeHandler={editForm.onChangeInputHandler}
                showErrorMessage={triedSubmit && !editForm.formStateIsValid}
            />

            <PageTitle> Minhas categorias </PageTitle>
            <Settings>
                <BlueButton onClick={() => onOpenModalHandler('create')}> Criar categoria </BlueButton>
                <Filter
                    filterConfigs={filterConfigs}
                    isOpen={filterIsOpen}
                    onClose={onCloseFilterHandler}
                    onOpen={onOpenFilterHandler}
                    setFilter={setFilter}
                />
                <div></div>
            </Settings>
            <GridItemList
                items={data}
                isEmpty={data.length === 0}
                loading={loading}
                onDeleteItem={onDeleteCategoryByIdHandler}
                onEdit={onClickEditButtonHandler}
            />
            <ReactPaginate
                nextLabel=">"
                onPageChange={onNextPageHandler}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
            />
        </Container>
    )
}

export default MyCategories