import React, { useMemo } from 'react'
import { Navigate } from 'react-router-dom'

import useUser from '../../hooks/userContext'

interface IPrivateRouteProps {
    element: any;
    shouldBeLogged?: boolean;
    shouldBeAdmin?: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ element, shouldBeLogged, shouldBeAdmin }) => {
    const { isLogged, userInfo } = useUser()

    const routeTreated = useMemo(() => {
        if (shouldBeLogged) {
            if (isLogged) {
                if (shouldBeAdmin) {
                    if (userInfo.isAdmin) {
                        return element
                    } else {
                        return <Navigate to='/' replace />
                    }
                } else {
                    return element
                }
            } else {
                return <Navigate to='/' replace />
            }
        } else {
            if (isLogged) {
                return <Navigate to='/' replace />
            } else {
                return element
            }
        }

    }, [element, isLogged, shouldBeLogged, userInfo, shouldBeAdmin])

    return routeTreated
}


export default PrivateRoute