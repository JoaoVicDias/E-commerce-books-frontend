import React from 'react'
import { IoMdClose } from 'react-icons/io'

import { getApi } from '../../services/api';

import ParseCurrency from '../../utils/parseCurrency';

import Modal from '../modal'

import { Container, CloseButtonContainer, Content, DivImage, Informations } from './styles'

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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container>
                <CloseButtonContainer>
                    <IoMdClose onClick={onClose} />
                </CloseButtonContainer>
                <Content>
                    <DivImage path={getApi(`/${img}`).replace(/[\\]/g, '/')} >  </DivImage>
                    <Informations>
                        <div>
                            <h1> {title} </h1>
                            <span> {ParseCurrency(price)} </span>
                            <p> {description} </p>
                        </div>
                        <button> Adicionar no carrinho </button>
                    </Informations>
                </Content>
            </Container>
        </Modal>
    )
}

export default ZoomModal