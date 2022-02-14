import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { Container } from './styles'

interface IBackdropProps {
    isOpen: boolean;
    onClose: () => void;
    [x:string]: any;
}

const Backdrop: React.FC<IBackdropProps> = ({ isOpen, onClose, ...rest }) => {

    const backdropRef = useRef(null)

    return (
        <CSSTransition nodeRef={backdropRef} in={isOpen} timeout={200} classNames="backdrop-transition" unmountOnExit >
            <Container ref={backdropRef} onClick={onClose} {...rest}>

            </Container>
        </CSSTransition>
    )
}

export default Backdrop