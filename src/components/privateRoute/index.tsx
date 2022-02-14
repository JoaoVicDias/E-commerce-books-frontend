import React, { useMemo } from 'react'
import { Navigate } from 'react-router-dom'

interface IPrivateRouteProps {
    element: any;
    shouldBeLogged?: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ element, shouldBeLogged }) => {
    const isLogged = true

    const routeTreated = useMemo(() => {

        if (shouldBeLogged) {
            if (isLogged) {
                return element
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

    }, [element, isLogged, shouldBeLogged])

    return routeTreated
}


export default PrivateRoute