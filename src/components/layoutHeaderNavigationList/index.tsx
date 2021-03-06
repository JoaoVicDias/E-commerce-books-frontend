import React from 'react'

import LayoutHeaderNavigationItems from '../layoutHeaderNavigationItems'

import { Container } from './styles'

interface ILayoutHeaderNavigationListProps {
    items: {
        onClick?: () => void;
        label: string;
        isNavigationButton?: boolean;
        href?: string;
        isBlueButton?: boolean;
        image?: React.ReactNode;
        isToHidden?: boolean;
        justText?: boolean;
        redButton?: boolean;
    }[]
    onClose?: () => void;
}

const LayoutHeaderNavigationList: React.FC<ILayoutHeaderNavigationListProps> = ({ items, onClose }) => (
    <Container>
        {items.map(item => (
            <LayoutHeaderNavigationItems key={item.label} onClose={onClose} {...item} />
        ))}
    </Container>
)



export default LayoutHeaderNavigationList