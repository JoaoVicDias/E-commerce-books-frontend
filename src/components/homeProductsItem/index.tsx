import React from 'react'

import { getApi } from '../../services/api';

import parseCurrency from '../../utils/parseCurrency'

import { Container, Informations } from './styles'

interface IHomeProductsItemProps {
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
    onClick: (data: {
        id: string;
        title: string;
        price: number;
        description: string;
        img: string;
    }) => void;
}

const HomeProductsItem: React.FC<IHomeProductsItemProps> = ({
    title,
    amount,
    categorys,
    description,
    id,
    img,
    price,
    onClick
}) => {
    if (amount === 0) return null

    return (
        <Container onClick={() => onClick({ id, title, img, description, price })}> 
            <img src={getApi(`/${img}`)} alt={title} />
            <Informations>
                <h2> {title} </h2>
                <strong> {parseCurrency(price)} </strong>
                <div>
                    {
                        categorys.map(category => (
                            <span key={category.Category.id}> {category.Category.name} </span>
                        ))
                    }
                </div>
            </Informations>
        </Container>
    )
}


export default HomeProductsItem