import React from 'react'

import MyProductsItem from '../myProductsItem';

import { Container, Message } from './styles'

interface IMyProductsListProps {
    products: {
        id: string;
        amount: number;
        img: string;
        price: number;
        title: string;
        categorys: {
            Category: {
                id: string;
                name: string;
            }
        }[]
        description: string;
    }[];
    loading: boolean;
    isEmpty: boolean;
    onDelete: (id: string) => void;
    onEdit: (data: any) => void;
}

const MyProductsList: React.FC<IMyProductsListProps> = ({ products, isEmpty, loading, onDelete, onEdit }) => {

    return (
        <Container>
            {loading && <Message> Carregando... </Message>}

            {!loading && isEmpty && <Message> Nenhum livro foi encontrado! </Message>}

            {
                products.map(product => (
                    <MyProductsItem key={product.id} onEdit={onEdit} onDelete={onDelete} {...product} />
                ))
            }
        </Container>
    )
}

export default MyProductsList