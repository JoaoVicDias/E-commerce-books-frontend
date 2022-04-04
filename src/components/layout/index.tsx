import React, { useCallback, useMemo, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Outlet } from 'react-router-dom'

import LayoutHeader from '../layoutHeader'
import AuthModal from '../authModal'

import useUser from '../../hooks/userContext'

import { getApi } from '../../services/api'

import { Container, Content, ImgCircle } from './styles'

const Layout: React.FC = () => {

    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false)
    const [mobileNavigation, setMobileNavigation] = useState<boolean>(false)

    const { isLogged, userInfo, onLogoutHandler } = useUser()

    const onOpenAuthModalHandler = useCallback(() => setAuthModalOpen(true), [])
    const onCloseAuthModalHandler = useCallback(() => setAuthModalOpen(false), [])

    const onOpenMobileNavigationHandler = useCallback(() => setMobileNavigation(true), [])
    const onCloseMobileNavigationHandler = useCallback(() => setMobileNavigation(false), [])

    const headerNavigationItems = useMemo(() => [
        { label: `Olá ${userInfo.name}`, justText: true, isToHidden: !isLogged, image: <ImgCircle src={getApi(`/${userInfo.img}`)} alt={userInfo.name} /> },
        { label: 'Carrinho', image: <AiOutlineShoppingCart /> },
        { label: 'Meus livros', isToHidden: !isLogged || !userInfo.isAdmin, href: '/my-products' },
        { label: 'Minhas categorias', isToHidden: !isLogged || !userInfo.isAdmin, href: '/my-categories' },
        { label: 'Meus pedidos', isToHidden: !isLogged },
        { label: 'Log in / Sign up', isBlueButton: true, onClick: onOpenAuthModalHandler, isToHidden: isLogged },
        { label: 'Sair', isToHidden: !isLogged, redButton: true, onClick: onLogoutHandler }
    ], [isLogged, onLogoutHandler, onOpenAuthModalHandler, userInfo])

    return (
        <Container>
            <AuthModal isOpen={authModalOpen} onClose={onCloseAuthModalHandler} />
            <LayoutHeader
                items={headerNavigationItems}
                mobileNavigation={mobileNavigation}
                onOpenMobileNavigation={onOpenMobileNavigationHandler}
                onCloseMobileNavigation={onCloseMobileNavigationHandler}
            />
            <Content>
                <Outlet />
            </Content>
        </Container>
    )
}

export default Layout