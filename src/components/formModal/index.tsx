import React from 'react'
import { IoMdClose } from 'react-icons/io'

import Modal from '../modal'
import FormDefault from '../formDefault'

import { Container, Content, Footer, Header, CloseButtonContainer } from './styles'

interface IFormModalState {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (event: React.FormEvent) => void;
    closeButtonLabel: string;
    submitButtonLabel: string;
    inputsList: {
        type: string;
        value: string;
        placeHolder?: string;
        errorMessage: string;
        isValid: boolean;
        label: string;
        name: string;
        isTouched: boolean;
    }[],
    showErrorMessage: boolean;
    onChangeHandler: (value: any, name: string) => void;
    onBlurHandler: (name: string) => void;
}

const FormModal: React.FC<IFormModalState> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    closeButtonLabel,
    submitButtonLabel,
    inputsList,
    showErrorMessage,
    onChangeHandler,
    onBlurHandler
}) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container>
                <Header>
                    <CloseButtonContainer> <IoMdClose onClick={onClose} /> </CloseButtonContainer>
                    <h4> {title} </h4>
                </Header>
                <Content>
                    <FormDefault
                        inputsList={inputsList}
                        shouldNotUseButton
                        showErrorMessage={showErrorMessage}
                        onChangeHandler={onChangeHandler}
                        onBlurHandler={onBlurHandler}
                    />
                </Content>
                <Footer>
                    <button className='footer__cancel__button' onClick={onClose}>{closeButtonLabel}</button>
                    <button className='footer__create__button' onClick={onSubmit}>{submitButtonLabel}</button>
                </Footer>
            </Container>
        </Modal>
    )
}

export default FormModal 