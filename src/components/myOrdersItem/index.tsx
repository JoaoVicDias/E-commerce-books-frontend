import React, { useMemo, useRef, useState } from 'react'

import ParseCurrency from '../../utils/parseCurrency';
import months from '../../utils/months';

import { getApi } from '../../services/api';

import { Container, Informations, ProductsContainer, ProductsItem, ImageDiv } from './styles'
import { CSSTransition } from 'react-transition-group';


interface IMyOrdersItemProps {
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
}

const MyOrdersItem: React.FC<IMyOrdersItemProps> = ({ products, total_value, createdAt }) => {

    const nodeRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)

    const itemDate = useMemo(() => {
        const currentDate = new Date(createdAt)
        const day = currentDate.getDate()
        const year = currentDate.getFullYear()
        const month = months[currentDate.getMonth()]

        return `${day} de ${month} de ${year}`

    }, [createdAt])

    return (
        <Container>
            <Informations>
                <div>
                    <h6>Data do pedido</h6>
                    <p> {itemDate} </p>
                </div>
                <div>
                    <h6> Total </h6>
                    <p>{ParseCurrency(total_value)}</p>
                </div>
                <button onClick={() => setIsOpen(prevState => !prevState)}> Detalhes do pedido </button>
            </Informations>
            <CSSTransition nodeRef={nodeRef} in={isOpen} timeout={200} classNames="animation-height" unmountOnExit >
                <ProductsContainer ref={nodeRef}>
                    {
                        products.map(products => (
                            <ProductsItem key={products.Product.id}>
                                <ImageDiv path={getApi(`/${products.Product.img}`).replace(/[\\]/g, '/')}></ImageDiv>
                                <div>
                                    <h6>Nome</h6>
                                    <p>{products.Product.title}</p>
                                </div>
                                <div>
                                    <h6>UN</h6>
                                    <p>{products.amount}</p>
                                </div>
                                <div>
                                    <h6>Preço</h6>
                                    <p> {ParseCurrency(products.Product.price)} </p>
                                </div>
                            </ProductsItem>
                        ))
                    }
                </ProductsContainer>
            </CSSTransition>
        </Container>
    )
}

export default MyOrdersItem