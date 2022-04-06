import React from 'react'
import { Link } from 'react-router-dom'

import { Container } from './styles'

interface ILayoutHeaderNavigationItemsProps {
    onClick?: () => void;
    label: string;
    href?: string;
    isBlueButton?: boolean;
    image?: React.ReactNode;
    isToHidden?: boolean;
    justText?: boolean;
    redButton?: boolean;
    onClose?: () => void;
}

const LayoutHeaderNavigationItems: React.FC<ILayoutHeaderNavigationItemsProps> = ({
    label,
    href,
    isBlueButton,
    onClick,
    image,
    isToHidden,
    justText,
    redButton,
    onClose
}) => isToHidden ? null : href ? (
    <Container className={`${redButton ? 'redButton' : ''} ${isBlueButton ? 'isBlueButton' : ''} ${justText ? 'isText' : ''}`} click={!!href || !!onClick}>
        <Link to={href} onClick={onClose}>
            {label}
            {image}
        </Link>
    </Container>
)
    : (
        <Container className={`${redButton ? 'redButton' : ''} ${isBlueButton ? 'isBlueButton' : ''} ${justText ? 'isText' : ''}`} onClick={() => {onClick && onClick(); onClose &&onClose()} } click={!!href || !!onClick} >
            {label}
            {image}
        </Container>
    )



export default LayoutHeaderNavigationItems