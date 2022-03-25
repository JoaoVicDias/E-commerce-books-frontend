import React from 'react'
import { Link } from 'react-router-dom'

import { Container } from './styles'

interface ILayoutHeaderNavigationItemsProps {
    onClick?: () => void;
    label: string;
    isNavigationButton?: boolean;
    href?: string;
    isBlueButton?: boolean;
    image?: React.ReactNode;
    isToHidden?: boolean;
    justText?: boolean;
    redButton?: boolean;
}

const LayoutHeaderNavigationItems: React.FC<ILayoutHeaderNavigationItemsProps> = ({
    label,
    href,
    isBlueButton,
    isNavigationButton,
    onClick,
    image,
    isToHidden,
    justText,
    redButton
}) => isToHidden ? null : href ? (
    <Container className={`${redButton ? 'redButton' : ''} ${isBlueButton ? 'isBlueButton' : ''} ${justText ? 'isText' : ''}`} click={!!href || !!onClick}>
        <Link to={href}>
            {label}
            {image}
        </Link>
    </Container>
)
        : (
            <Container className={`${redButton ? 'redButton' : ''} ${isBlueButton ? 'isBlueButton' : ''} ${justText ? 'isText' : ''}`} onClick={onClick} click={!!href || !!onClick} >
                {label}
                {image}
            </Container>
        )



export default LayoutHeaderNavigationItems