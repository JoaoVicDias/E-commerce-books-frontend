import React from 'react'

import GridCategoriesItem from '../gridCategoriesItem';

import { Container, Message } from './styles'

interface IGridCategoriesList {
    items: {
        name: string;
        id: string;
    }[];
    isEmpty: boolean;
    loading: boolean;
    onEdit: (data: { id: string, name: string }) => void;
}

const GridCategoriesList: React.FC<IGridCategoriesList> = ({ isEmpty, items, loading, onEdit }) => {
    return (
        <Container>
            {loading && <Message> Carregando... </Message>}

            {!loading && isEmpty && <Message> Nenhum item foi encontrado! </Message>}

            {
                items.map(item => (
                    <GridCategoriesItem key={item.id} onEdit={onEdit} {...item} />
                ))
            }
        </Container>
    )
}

export default GridCategoriesList