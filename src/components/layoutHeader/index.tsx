import React, { useRef } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group'

import LayoutHeaderNavigationList from '../layoutHeaderNavigationList'
import Backdrop from '../backdrop'

import { Container, Brand, Nav, NavMobile, HambugerButton } from './styles'

interface ILayoutHeaderProps {
    items: {
        onClick?: () => void;
        label: string;
        isNavigationButton?: boolean;
        href?: string;
        isBlueButton?: boolean;
    }[]
    mobileNavigation: boolean;
    onOpenMobileNavigation: () => void;
    onCloseMobileNavigation: () => void;
}

const LayoutHeader: React.FC<ILayoutHeaderProps> = ({
    items,
    mobileNavigation,
    onCloseMobileNavigation,
    onOpenMobileNavigation
}) => {

    const navigationRef = useRef(null)

    return (
        <>
         <Backdrop isOpen={mobileNavigation} onClose={onCloseMobileNavigation} style={{ top: "60px" }} />
          <Container>
            <Brand> ECB </Brand>
            <HambugerButton type="button" onClick={mobileNavigation ? onCloseMobileNavigation : onOpenMobileNavigation}>
                {
                    mobileNavigation ? <AiOutlineClose /> : <GiHamburgerMenu />
                }
            </HambugerButton>
            <CSSTransition
                nodeRef={navigationRef}
                in={mobileNavigation}
                timeout={200}
                classNames="mobile-navigation-transition"
                unmountOnExit>
                <NavMobile ref={navigationRef}>
                    <LayoutHeaderNavigationList items={items} />
                </NavMobile>
            </CSSTransition>

            <Nav>
                <LayoutHeaderNavigationList items={items} />
            </Nav>
        </Container>
        </>
    )
}



export default LayoutHeader