import React from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import { GiConfirmed } from 'react-icons/gi'

import Modal from '../modal'
import Button from '../button'

import { Container, Content, Footer } from './styles'

interface IMessageModalProps {
    type: "error" | "success";
    onClose: () => void;
    isOpen: boolean;
    message: string;
}

const MessageModal: React.FC<IMessageModalProps> = ({ isOpen, onClose, message, type }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container>
                <Content>
                    {type === "error" ? <BiErrorCircle className="svg-error" /> : <GiConfirmed className="svg-success" />}
                    <p> {message} </p>
                </Content>
                <Footer>
                    <Button type="button" className="footer_btn" onClick={onClose}> Fechar </Button>
                </Footer>
            </Container>
        </Modal>
    )
}

export default MessageModal