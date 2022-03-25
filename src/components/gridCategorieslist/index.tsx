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
    onDeleteItem: (id: string) => void;
    onEdit: (data: { id: string, name: string }) => void;
}

const GridCategoriesList: React.FC<IGridCategoriesList> = ({ isEmpty, items, loading, onDeleteItem, onEdit }) => {


    return loading ? <Message> Carregando... </Message> : isEmpty ?  <Message> Nenhum item foi encontrado! </Message>: (
        <Container>
            {
                items.map(item => (
                    <GridCategoriesItem key={item.id} onDeleteItem={onDeleteItem} onEdit={onEdit} {...item} />
                ))
            }
        </Container>
    )
}

export default GridCategoriesList