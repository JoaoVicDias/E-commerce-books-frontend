import React, { useCallback, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { Container } from './styles'

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {

    const modalRef = useRef(null)

    const onHandleOnCloseFunction = useCallback((event: any) => {
        if (event.target.id === 'backdrop') onClose()
    }, [onClose])

    return (
        <CSSTransition nodeRef={modalRef} in={isOpen} timeout={200} classNames="modal-transition" unmountOnExit >
            <Container ref={modalRef} id="backdrop" onClick={(event) => onHandleOnCloseFunction(event)}>
                {children}
            </Container>
        </CSSTransition>
    )

}

export default Modal