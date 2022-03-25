import React, { useState, useCallback } from 'react'

import { Container } from './styles'

const Home:React.FC = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] =  useState(false)

    const onFetchDataHandler = useCallback(() => {
        try {

        }catch(error) {

        }
    },[])

    return (
        <Container>
            
        </Container>
    )
}


export default Home