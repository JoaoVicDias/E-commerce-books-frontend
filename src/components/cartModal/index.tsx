import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io'

import useCart from '../../hooks/cartHook';
import useUser from '../../hooks/userContext';

import api, { getApi } from '../../services/api';

import ParseCurrency from '../../utils/parseCurrency';
import MessageModal from '../messageModal';

import Modal from '../modal'

import { Container, List, ListItem, DivImage, Informations, TotalContainer, ContainerButton } from './styles'

interface ICartModal {
    isOpen: boolean;
    onClose: () => void;
    onOpenAuthModal: () => void;
}

interface IModals {
    error: boolean;
    success: boolean;
}

const CartModal: React.FC<ICartModal> = ({ isOpen, onClose, onOpenAuthModal }) => {

    const [modals, setModals] = useState<IModals>({ error: false, success: false })
    const [error, setError] = useState('')

    const {
        cart,
        onIncreaseAmontHandler,
        onDecreaseAmontHandler,
        onClearCartHandler,
        onDeleteCartStorage,
        onRemoveItemInCartHandler
    } = useCart()

    const { isLogged } = useUser()

    const subTotal = useMemo(() => {
        return cart.reduce((cb, value) => cb += (value.price * value.amount), 0)
    }, [cart])

    const onCloseModalHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: false }))
    }, [])

    const onOpenModalHandler = useCallback((key: string) => {
        return setModals(prevState => ({ ...prevState, [key]: true }))
    }, [])

    const onCreateCheckout = useCallback(async () => {
        try {
            const products = cart.map(item => ({ id: item.id, amount: item.amount }))

            await api.post('/checkout', { products })

            onClearCartHandler()
            onDeleteCartStorage()
            onOpenModalHandler('success')
        } catch (error: any) {
            setError(error.response.data.message || "Algo deu errado, por favor tente novamente!")
            onOpenModalHandler('error')
        }

        onClose()
    }, [cart, onClearCartHandler, onClose, onDeleteCartStorage, onOpenModalHandler])

    return (
        <>
            <MessageModal
                isOpen={modals.error}
                message={error}
                onClose={() => onCloseModalHandler('error')}
                type='error'
            />
            <MessageModal
                isOpen={modals.success}
                message="Pedido finalizado com successo, espero que goste!"
                onClose={() => onCloseModalHandler('success')}
                type='success'
            />
            <Modal isOpen={isOpen} onClose={onClose} >
                <Container>
                    <h1> Meu Carrinho </h1>
                    <List>
                        {cart.length === 0 && <h4 style={{ textAlign: 'center', marginTop: '100px', fontSize: '2rem' }}> Nenhum item no carrinho! </h4>}
                        {
                            cart.map(item => (
                                <ListItem key={item.id}>
                                    <IoMdClose onClick={() => onRemoveItemInCartHandler(item.id)} />
                                    <DivImage path={getApi(`/${item.img}`).replace(/[\\]/g, '/')}></DivImage>
                                    <Informations>
                                        <h4> {item.title} </h4>
                                        <span> {ParseCurrency(item.price)} </span>
                                        <div>
                                            <div>
                                                <button onClick={() => onDecreaseAmontHandler(item.id)}>-</button>
                                                <span>{item.amount}</span>
                                                <button onClick={() => onIncreaseAmontHandler(item.id)}>+</button>
                                            </div>
                                        </div>
                                    </Informations>
                                </ListItem>
                            ))
                        }
                    </List>
                    <TotalContainer>
                        <span> Total: {ParseCurrency(subTotal)}  </span>
                    </TotalContainer>
                    <ContainerButton>
                        {
                            !isLogged
                                ? <button onClick={() => { onOpenAuthModal(); onClose() }}> Fazer login </button>
                                : cart.length === 0 ? <Link to="/" onClick={onClose}> Procurar produto </Link>
                                    : <button onClick={onCreateCheckout}>Fazer pedido</button>
                        }
                    </ContainerButton>
                </Container>
            </Modal>
        </>
    )
}

export default CartModal