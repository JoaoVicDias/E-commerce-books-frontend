import React from 'react'
import HomeProductsItem from '../homeProductsItem';

import { Container, Message } from './styles'

interface IHomeProductsListProps {
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
    onClick: (data: {
        id: string;
        title: string;
        price: number;
        description: string;
        img: string;
    }) => void;
}

const HomeProductsList: React.FC<IHomeProductsListProps> = ({ loading, products, isEmpty, onClick }) =>
    loading ? <Message> Carregando ... </Message> :
        isEmpty && !loading ? <Message> Nenhum livro encontrado! </Message> : (
            <Container>
                {
                    products.map(product => (
                        <HomeProductsItem key={product.id} onClick={onClick} {...product} />
                    ))
                }
            </Container>
        )


export default HomeProductsList