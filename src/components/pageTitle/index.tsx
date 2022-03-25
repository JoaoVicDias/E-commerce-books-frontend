import React from 'react'

import { Container } from './styles'

const PageTitle: React.FC = ({ children }) => {

    return (
        <Container> { children } </Container>
    )
}

export default PageTitle