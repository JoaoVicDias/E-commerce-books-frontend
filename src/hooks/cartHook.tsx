import jwtDecode from 'jwt-decode';
import React, { useCallback, useContext, useEffect, useState } from 'react'


interface ICart {
    id: string;
    title: string;
    img: string;
    amount: number;
    price: number;
}

interface ICartContext {
    cart: ICart[]
    onInsertItemInCartHandler: (data: ICart) => void;
    onIncreaseAmontHandler: (id: string) => void;
    onDecreaseAmontHandler: (id: string) => void;
    onClearCartHandler: () => void;
    onFetchSavedCartStorage: (id: string) => void;
    onDeleteCartStorage: () => void;
    onRemoveItemInCartHandler: (id: string) => void;
}

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


const CartContext = React.createContext({} as ICartContext)


export const CartContextProvider: React.FC = ({ children }) => {

    const [cart, setCart] = useState<ICart[]>([])

    const onSaveCartStorage = useCallback((cart: ICart[]) => {
        const userToken = localStorage.getItem('e-commerce-books-user-token')
        if (!userToken) return
        const decodeToken: IUserInfoState = jwtDecode(userToken)

        localStorage.setItem(`e-commerce-books-cart-${decodeToken.id}`, JSON.stringify(cart))
    }, [])

    const onDeleteCartStorage = useCallback(() => {
        const userToken = localStorage.getItem('e-commerce-books-user-token')
        if (!userToken) return

        const decodeToken: IUserInfoState = jwtDecode(userToken)

        localStorage.removeItem(`e-commerce-books-cart-${decodeToken.id}`)
    }, [])

    const onFetchSavedCartStorage = useCallback((id: string) => {
        const savedCart = localStorage.getItem(`e-commerce-books-cart-${id}`)

        return setCart(prevState => {
            const oldCart = JSON.parse(savedCart || '[]')

            let allItems = prevState.concat(oldCart)

            const newState = allItems.reduce((acc: ICart[], item) => {
                const existingItem = acc.find(accItem => accItem.id === item.id)

                if (existingItem) {
                    acc = acc.filter(accItem => accItem.id !== existingItem.id).concat({ ...existingItem, amount: existingItem.amount + item.amount })
                } else {
                    acc = acc.concat(item)
                }

                return acc
            }, [])
            onSaveCartStorage(newState)

            return newState
        })
    }, [onSaveCartStorage])

    const onInsertItemInCartHandler = useCallback((data: ICart) => {
        return setCart((prevState) => {
            const addedItem = prevState.find(item => item.id === data.id)

            if (addedItem) {
                const newState = prevState.filter(item => item.id !== data.id).concat({ ...data, amount: addedItem.amount + 1 })
                onSaveCartStorage(newState)
                return newState
            }

            const newState = prevState.concat(data)

            onSaveCartStorage(newState)

            return newState
        })
    }, [onSaveCartStorage])

    const onRemoveItemInCartHandler = useCallback((id: string) => {
        return setCart(prevState => {
            const newState = prevState.filter(item => item.id !== id)

            onSaveCartStorage(newState)

            return newState
        })
    }, [onSaveCartStorage])

    const onIncreaseAmontHandler = useCallback((id: string) => {
        return setCart(prevState => {
            const newState = prevState.map(item => {
                if (item.id === id) {
                    return { ...item, amount: item.amount + 1 }
                }

                return item
            })

            onSaveCartStorage(newState)
            return newState
        })
    }, [onSaveCartStorage])

    const onDecreaseAmontHandler = useCallback((id: string) => {
        return setCart(prevState => {
            const newState = prevState.map(item => {
                if (item.id === id) {
                    if (item.amount === 1) return item
                    return { ...item, amount: item.amount - 1 }
                }

                return item
            })

            onSaveCartStorage(newState)
            return newState
        })
    }, [onSaveCartStorage])

    const onClearCartHandler = useCallback(() => {
        return setCart([])
    }, [])

    useEffect(() => {
        const userToken = localStorage.getItem('e-commerce-books-user-token')
        if (!userToken) return
        const decodedToken: any = jwtDecode(userToken)
        onFetchSavedCartStorage(decodedToken.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <CartContext.Provider value={{
            cart,
            onInsertItemInCartHandler,
            onIncreaseAmontHandler,
            onDecreaseAmontHandler,
            onClearCartHandler,
            onFetchSavedCartStorage,
            onDeleteCartStorage,
            onRemoveItemInCartHandler
        }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => {
    const cartContext = useContext(CartContext)
    return { ...cartContext }
}

export default useCart
