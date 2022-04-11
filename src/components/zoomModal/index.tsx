import React from 'react'
import { IoMdClose } from 'react-icons/io'
import useCart from '../../hooks/cartHook';

import { getApi } from '../../services/api';

import ParseCurrency from '../../utils/parseCurrency';

import Modal from '../modal'

import { Container, Content, DivImage, Informations } from './styles'

interface IZoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    title: string;
    price: number;
    description: string;
    img: string;
}

const ZoomModal: React.FC<IZoomModalProps> = ({ description, id, isOpen, onClose, price, title, img }) => {

    const { onInsertItemInCartHandler } = useCart()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container>
                <IoMdClose onClick={onClose} />
                <Content>
                    <DivImage path={getApi(`/${img}`).replace(/[\\]/g, '/')} >  </DivImage>
                    <Informations>
                        <div>
                            <h1> {title} </h1>
                            <span> {ParseCurrency(price)} </span>
                            <p> {description} </p>
                        </div>
                        <button onClick={() => { onClose(); onInsertItemInCartHandler({ id, title, amount: 1, img, price })}}>
                            Adicionar no carrinho
                        </button>
                    </Informations>
                </Content>
            </Container>
        </Modal>
    )
}

export default ZoomModal