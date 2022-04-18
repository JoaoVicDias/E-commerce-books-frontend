import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode'
import useCart from './cartHook';


interface IUserInfoState {
    id: string;
    name: string;
    cpf: number;
    email: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
    img: string;
}

interface IUserContext {
    isLogged: boolean;
    userInfo: IUserInfoState;
    onLogoutHandler: () => void;
    onSignInHandler: (token: string) => void;
}

const userContext = createContext({} as IUserContext)


export const UserContextProvider: React.FC = ({ children }) => {

    const userToken = localStorage.getItem("e-commerce-books-user-token")
    const expTimeTimeout = useRef<NodeJS.Timeout | any>()

    const { onClearCartHandler } = useCart()

    const [isLogged, setIsLogged] = useState<boolean>(!!userToken)
    const [userInfo, setUserInfo] = useState<IUserInfoState>(userToken ? jwtDecode(userToken) : {
        id: "",
        cpf: 0,
        email: "",
        exp: 0,
        iat: 0,
        isAdmin: false,
        name: "",
        img: ""
    })

    const onSignInHandler = useCallback((token: string) => {
        const decodedUser: IUserInfoState = jwtDecode(token)
        setIsLogged(true)
        localStorage.setItem("e-commerce-books-user-token", token)
        setUserInfo(decodedUser)
    }, [])

    const onLogoutHandler = useCallback(() => {
        setIsLogged(false)
        localStorage.removeItem("e-commerce-books-user-token")
        setUserInfo({
            id: "",
            cpf: 0,
            email: "",
            exp: 2376,
            iat: 0,
            isAdmin: false,
            name: "",
            img: ""
        })
        onClearCartHandler()
    }, [onClearCartHandler])

    const onCheckAutoLogin = useCallback(() => {
        if (!userToken) return

        const todayTime = new Date().getTime();
        const decodedToken: IUserInfoState = jwtDecode(userToken)

        if (todayTime < (decodedToken.exp * 1000)) {
            onSignInHandler(userToken)
        } else {
            onLogoutHandler()
        }

    }, [userToken, onSignInHandler, onLogoutHandler])

    const onExpirationTokenHandler = useCallback(() => {
        if (!userToken) return

        const decodedToken: IUserInfoState = jwtDecode(userToken)

        clearTimeout(expTimeTimeout.current)

        const todayTime = new Date().getTime()
        const tokenExpTime = decodedToken.exp * 1000

        const expTime = tokenExpTime - todayTime

        setTimeout(onLogoutHandler, expTime)

    }, [onLogoutHandler, userToken])

    useEffect(() => {
        onCheckAutoLogin()
    }, [onCheckAutoLogin])

    useEffect(() => {
        onExpirationTokenHandler()
    }, [onExpirationTokenHandler])

    return (
        <userContext.Provider value={{
            isLogged,
            onLogoutHandler,
            userInfo,
            onSignInHandler
        }}>
            {children}
        </userContext.Provider>
    )
}


const useUser = () => {
    const useUserContext = useContext(userContext)

    return { ...useUserContext }
}

export default useUser

