import React from 'react'

import Input from '../input'
import Button from '../button'

import { Container } from './styles'

interface IFormDefaultProps {
    inputsList: {
        type: string;
        value: string;
        placeHolder?: string;
        errorMessage: string;
        isValid: boolean;
        label: string;
        name: string;
    }[]
    onSubmit: (event: React.FormEvent) => void;
    contentButton?: string;
    onChangeHandler: (value: any, name: string) => void;
    showErrorMessage: boolean;
    loading: boolean;
}

const FormDefault: React.FC<IFormDefaultProps> = ({ inputsList, onSubmit, loading, contentButton, onChangeHandler, showErrorMessage }) => (
    <Container onSubmit={onSubmit} >
        {
            inputsList.map(input => (
                <Input
                    key={input.name}
                    onChange={onChangeHandler}
                    {...input} />
            ))
        }
        {showErrorMessage && <span> Algum campo esta invalido, por favor preeencha todos os campos com informações válidas! </span>}
        <Button type='submit' loading={loading} > {contentButton || 'Enviar'}  </Button>
    </Container>
)


export default FormDefault