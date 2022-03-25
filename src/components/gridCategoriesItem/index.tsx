import React from 'react'

import { Container, Settings } from './styles'

interface IGridCategoriesItem {
    name: string;
    id: string;
    onDeleteItem: (id: string) => void;
    onEdit: (data: { id: string, name: string }) => void;
}

const gridCategoriesItem: React.FC<IGridCategoriesItem> = ({ id, name, onDeleteItem, onEdit }) => {
    return (
        <Container>
            <div></div>
            <span> {name} </span>
            <Settings>
                <button className='settings__edit__button' onClick={() => onEdit({ id, name })}>Editar</button>
                <button className='settings__delete__button' onClick={() => onDeleteItem(id)}>Deletar</button>
            </Settings>
        </Container>
    )
}

export default gridCategoriesItem