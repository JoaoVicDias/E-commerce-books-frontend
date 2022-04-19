import { createContext, useCallback, useContext, useEffect, useState } from "react"

import api from "../services/api"

interface ICategory {
    name: string;
    id: string;
}

interface ICategoryProvider {
    categorys: ICategory[]
    onFetchCategorysHandler: () => void;
}

const CategoryProvider = createContext( {} as ICategoryProvider )

const Categorys:React.FC = ({ children }) =>{

    const [categorys, setCategorys] = useState<ICategory[]>([])

    const onFetchCategorys = useCallback(async () => {
        try {
            const res = await api.get('/category/all')
            setCategorys(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const onFetchCategorysHandler = useCallback(async () => {
        try {
            const res = await api.get('/category/all')

            if(res.data.results.length > 0) {
                return res.data.results.map((category: any) => ({ label: category?.name, value: category?.id }))
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        onFetchCategorys()
    }, [onFetchCategorys])

    return (
        <CategoryProvider.Provider  value={{
            onFetchCategorysHandler,
            categorys
        }}>
            {children}
        </CategoryProvider.Provider>
    )
}

export default Categorys

const useCategory = () => useContext(CategoryProvider);

export { useCategory }