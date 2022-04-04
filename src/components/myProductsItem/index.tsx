import React from 'react'

import { getApi } from '../../services/api';

import ParseCurrency from '../../utils/parseCurrency';

import { Container, DivImage, RightContainer, Informations, Categorys, ButtonsContainer } from './styles'

interface IMyProductsItemProps {
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
    onDelete: (id: string) => void;
    onEdit: (data: any) => void;
}

const MyProductsItem: React.FC<IMyProductsItemProps> = ({
    amount,
    categorys,
    id,
    img,
    price,
    title,
    description,
    onDelete,
    onEdit
}) => {

    return (
        <Container>
            <DivImage imageUrl={getApi(`/${img}`).replace(/[\\]/g, '/')}>
            </DivImage>
            <RightContainer>
                <Informations>
                    <h4> {title} </h4>
                    <Categorys>
                        <p> Categoria: </p>
                        {
                            categorys.map(category => (
                                <span key={category.Category.id}> {category.Category.name} </span>
                            ))
                        }
                    </Categorys>
                    <p> Quantidade: {amount} </p>
                    <p> {ParseCurrency(price)} </p>
                </Informations>
                <ButtonsContainer>
                    <button className='edit__button' onClick={() => onEdit({ id, title, amount, price, description })}> Editar </button>
                    <button className='delete__button' onClick={() => onDelete(id)}> Excluir </button>
                </ButtonsContainer>
            </RightContainer>
        </Container>
    )
}

export default MyProductsItem