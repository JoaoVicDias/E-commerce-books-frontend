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
        isTouched: boolean;
    }[]
    onSubmit?: (event: React.FormEvent) => void;
    contentButton?: string;
    onChangeHandler: (value: any, name: string) => void;
    showErrorMessage: boolean;
    loading?: boolean;
    encType?: string;
    shouldNotUseButton?: boolean;
    onBlurHandler: (name: string) => void;
}

const FormDefault: React.FC<IFormDefaultProps> = ({
    inputsList,
    encType,
    onSubmit,
    loading,
    contentButton,
    onChangeHandler,
    showErrorMessage,
    shouldNotUseButton,
    onBlurHandler
}) => (
    <Container onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()} encType={encType} >
        {
            inputsList.map(input => (
                <Input
                    key={input.name}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    {...input} />
            ))
        }
        {showErrorMessage && <span> Algum campo esta invalido, por favor preeencha todos os campos com informações válidas! </span>}
        {!shouldNotUseButton && <Button type='submit' loading={loading} > {contentButton || 'Enviar'}  </Button>}
    </Container>
)


export default FormDefault