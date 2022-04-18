import React from 'react'

import MyOrdersItem from '../myOrdersItem';

import { Container } from './styles'
import { Message } from '../homeProductsList/styles';

interface IMyOrdersListProps {
    items: {
        id: string;
        total_value: number;
        createdAt: string;
        products: {
            amount: number;
            Product: {
                id: string;
                img: string;
                price: number;
                title: string
            }
        }[]
    }[]
    loading: boolean;
}

const MyOrdersList: React.FC<IMyOrdersListProps> = ({ items, loading }) => {
    return (
        <Container>
            { loading && <Message> Carregando ... </Message> }
            { !loading && items.length === 0 && <Message> Nenhum pedido encontrado </Message>} 
            {
                items.map(item => (
                    <MyOrdersItem key={item.id} {...item} />
                ))
            }
        </Container>
    )
}

export default MyOrdersList