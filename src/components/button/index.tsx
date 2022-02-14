import React from 'react'

import { Container } from './styles'

interface IButtonProps {
    [x: string]: any;
    loading?: boolean ;
}

const Button: React.FC<IButtonProps> = ({ loading, children, ...rest }) => {
    return (
        <Container loading={loading ? 1 : 0} {...rest} >
            {!loading && children}
        </Container>
    )
}

export default Button