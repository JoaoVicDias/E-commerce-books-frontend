import { useCallback, useEffect } from "react"

import api from "../services/api"

export default function Categorys() {

    const onFetchCategorysHandler = useCallback(async () => {
        try {
            const res = await api.get('/category/all')
            return res.data.results.map((category: any) => ({ label: category.name, value: category.id }))
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        onFetchCategorysHandler()
    }, [onFetchCategorysHandler])

    return {
        onFetchCategorysHandler
    }
}