import React from 'react'
import { BiErrorCircle } from 'react-icons/bi'

import Modal from '../modal'
import Button from '../button'

import { Container, Content, Footer } from './styles'

interface IErrorMessageModalProps {
    onClose: () => void;
    isOpen: boolean;
    message: string;
}

const ErrorMessageModal: React.FC<IErrorMessageModalProps> = ({ isOpen, onClose, message }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container>
                <Content>
                    <BiErrorCircle />
                    <p> {message} </p>
                </Content>
                <Footer>
                    <Button type="button" className="footer_btn" onClick={onClose}> Fechar </Button>
                </Footer>
            </Container>
        </Modal>
    )
}

export default ErrorMessageModal