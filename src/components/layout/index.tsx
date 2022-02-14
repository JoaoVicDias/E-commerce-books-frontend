import React, { useCallback, useMemo, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Outlet } from 'react-router-dom'

import LayoutHeader from '../layoutHeader'
import AuthModal from '../authModal'

import { Container, Content } from './styles'

const Layout: React.FC = () => {

    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false)
    const [mobileNavigation, setMobileNavigation] = useState<boolean>(false)

    const onOpenAuthModalHandler = useCallback(() => setAuthModalOpen(true), [])
    const onCloseAuthModalHandler = useCallback(() => setAuthModalOpen(false), [])

    const onOpenMobileNavigationHandler = useCallback(() => setMobileNavigation(true), [])
    const onCloseMobileNavigationHandler = useCallback(() => setMobileNavigation(false), [])



    const headerNavigationItems = useMemo(() => [
        { label: 'Sign in / Sign up', isBlueButton: true, onClick: onOpenAuthModalHandler },
        { label: 'Cart', image: <AiOutlineShoppingCart /> },
    ], [onOpenAuthModalHandler])

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