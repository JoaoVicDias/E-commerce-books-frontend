import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode'


interface IUserInfoState {
    id: string;
    name: string;
    cpf: number;
    email: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}

interface IUserContext {
    isLogged: boolean;
    userInfo: IUserInfoState;
    onLogoutHandler: () => void;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfoState>>;
}

const userContext = createContext({} as IUserContext)


export const UserContextProvider: React.FC = ({ children }) => {

    const userToken = localStorage.getItem("e-commerce-books-user-token")
    const expTimeTimeout = useRef<NodeJS.Timeout | any>()

    const [isLogged, setIsLogged] = useState<boolean>(!!userToken)
    const [userInfo, setUserInfo] = useState<IUserInfoState>({
        id: "",
        cpf: 0,
        email: "",
        exp: 0,
        iat: 0,
        isAdmin: false,
        name: ""
    })

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
            name: ""
        })
    }, [])

    const onCheckAutoLogin = useCallback(() => {
        if (!userToken) return

        const todayTime = new Date().getTime();
        const decodedToken: IUserInfoState = jwtDecode(userToken)

        if (todayTime < (decodedToken.exp * 1000)) {
            setUserInfo(decodedToken)
            setIsLogged(true)
        } else {
            onLogoutHandler()
        }

    }, [userToken, onLogoutHandler])

    const onExpirationTokenHandler = useCallback(() => {

        if(!isLogged) return
        clearTimeout(expTimeTimeout.current)

        const todayTime = new Date().getTime()
        const tokenExpTime = userInfo?.exp * 1000

        const expTime = tokenExpTime - todayTime

        setTimeout(onLogoutHandler, expTime)

    }, [onLogoutHandler, userInfo.exp, isLogged])

    // useEffect(() => {
    //     onCheckAutoLogin()
    // }, [onCheckAutoLogin])

    useEffect(() => {
        onExpirationTokenHandler()
    }, [onExpirationTokenHandler])

    console.log(isLogged, userInfo)


    return (
        <userContext.Provider value={{
            isLogged,
            setIsLogged,
            onLogoutHandler,
            userInfo,
            setUserInfo
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

