import React, { useCallback, useMemo, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Outlet } from 'react-router-dom'

import LayoutHeader from '../layoutHeader'
import AuthModal from '../authModal'
import CartModal from '../cartModal'

import useUser from '../../hooks/userContext'

import { getApi } from '../../services/api'

import { Container, Content, ImgCircle } from './styles'

interface IModals {
    auth: boolean;
    mobileNavigation: boolean;
    cart: boolean;
}

const Layout: React.FC = () => {

    const [modals, setModals] = useState<IModals>({ auth: false, mobileNavigation: false, cart: false })

    const { isLogged, userInfo, onLogoutHandler } = useUser()

    const onOpenModalHandler = useCallback((key: string) => setModals(prevState => ({ ...prevState, [key]: true })), [])
    const onCloseModalHandler = useCallback((key: string) => setModals(prevState => ({ ...prevState, [key]: false })), [])

    const headerNavigationItems = useMemo(() => [
        { label: `Olá ${userInfo.name}`, justText: true, isToHidden: !isLogged, image: <ImgCircle src={getApi(`/${userInfo.img}`)} alt={userInfo.name} /> },
        { label: 'Carrinho', image: <AiOutlineShoppingCart />, onClick: () => onOpenModalHandler('cart') },
        { label: 'Meus livros', isToHidden: !isLogged || !userInfo.isAdmin, href: '/my-products' },
        { label: 'Minhas categorias', isToHidden: !isLogged || !userInfo.isAdmin, href: '/my-categories' },
        { label: 'Meus pedidos', isToHidden: !isLogged },
        { label: 'Log in / Sign up', isBlueButton: true, onClick: () => onOpenModalHandler('auth'), isToHidden: isLogged },
        { label: 'Sair', isToHidden: !isLogged, redButton: true, onClick: onLogoutHandler }
    ], [isLogged, onLogoutHandler, onOpenModalHandler, userInfo.img, userInfo.isAdmin, userInfo.name])

    return (
        <Container>
            <AuthModal isOpen={modals.auth} onClose={() => onCloseModalHandler('auth')} />
            <CartModal
                isOpen={modals.cart}
                onClose={() => onCloseModalHandler('cart')}
                onOpenAuthModal={() => onOpenModalHandler('auth')}
            />
            <LayoutHeader
                items={headerNavigationItems}
                mobileNavigation={modals.mobileNavigation}
                onOpenMobileNavigation={() => onOpenModalHandler('mobileNavigation')}
                onCloseMobileNavigation={() => onCloseModalHandler('mobileNavigation')}
            />
            <Content>
                <Outlet />
            </Content>
        </Container>
    )
}

export default Layout