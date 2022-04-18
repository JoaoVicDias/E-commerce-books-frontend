import React from 'react'

import { Container, Settings } from './styles'

interface IGridCategoriesItem {
    name: string;
    id: string;
    onEdit: (data: { id: string, name: string }) => void;
}

const gridCategoriesItem: React.FC<IGridCategoriesItem> = ({ id, name, onEdit }) => {
    return (
        <Container>
            <div></div>
            <span> {name} </span>
            <Settings>
                <button className='settings__edit__button' onClick={() => onEdit({ id, name })}>Editar</button>
            </Settings>
        </Container>
    )
}

export default gridCategoriesItem