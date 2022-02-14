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
}

const LayoutHeaderNavigationItems: React.FC<ILayoutHeaderNavigationItemsProps> = ({
    label,
    href,
    isBlueButton,
    isNavigationButton,
    onClick,
    image
}) => href ? (
    <Container isBlueButton={isBlueButton} click={!!onClick}>
        <Link to={href}>
            {label}
            {image}
        </Link>
    </Container>
)
        : (
            <Container onClick={onClick} isBlueButton={isBlueButton} click={!!onClick} >
                {label}
                {image}
            </Container>
        )



export default LayoutHeaderNavigationItems