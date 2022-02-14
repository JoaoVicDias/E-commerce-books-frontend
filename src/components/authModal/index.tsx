import React, { useCallback, useState } from 'react'

import Modal from '../modal'
import FormDefault from '../formDefault'

import { useForm } from '../../hooks/formReduce'

import { Container, Main, Footer } from './styles'

interface IAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<IAuthModalProps> = ({ isOpen, onClose }) => {

    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [triedSubmit, setTriedSubmit] = useState<boolean>(false)

    const { formState, onChangeInputHandler, formStateList, onSetInputsHandler, formStateIsValid } = useForm({
        email: {
            type: "email",
            value: "",
            errorMessage: "E-mail incorreto, por favor digite um e-mail valido!",
            isValid: false,
            label: "E-mail",
            name: "email",
            placeHolder: "nome@exemplo.com",
            validationRules: {
                isEmail: true,
                required: true
            }
        },
        password: {
            type: "password",
            value: "",
            errorMessage: "Senha incorreta, por favor digite uma senha valida!",
            isValid: false,
            label: "Senha",
            name: "password",
            placeHolder: "********",
            validationRules: {
                minLength: 8
            }
        }
    })

    const onChangeToSignUpInputsHandler = useCallback(() => {
        let newInputs = {}

        newInputs = {
            ...formState.formInputs,
            name: {
                type: "text",
                value: "",
                errorMessage: "Nome incorreto, por favor digite um nome valido!",
                isValid: false,
                label: "Nome",
                name: "name",
                placeHolder: "Joãozinho da Silva",
                validationRules: {
                    required: true
                }
            },
            cpf: {
                type: "text",
                value: "",
                errorMessage: "CPF incorreto, por favor digite um CPF valido!",
                isValid: false,
                label: "CPF",
                name: "cpf",
                placeHolder: "000.000.000-00",
                validationRules: {
                }
            },
        }

        return onSetInputsHandler(newInputs)

    }, [formState.formInputs, onSetInputsHandler])

    const onChangeToSignInInputsHandler = useCallback(() => {
        let newInputs = {}

        newInputs = {
            ...formState.formInputs,
            name: null,
            cpf: null,
        }

        return onSetInputsHandler(newInputs)

    }, [formState.formInputs, onSetInputsHandler])

    const onChangeModalToSignUp = useCallback(() => {
        setIsSignUp(true)
        setTriedSubmit(false)
        onChangeToSignUpInputsHandler()
    }, [onChangeToSignUpInputsHandler])
    const onChangeModalToSignIn = useCallback(() => {
        setIsSignUp(false)
        setTriedSubmit(false)
        onChangeToSignInInputsHandler()
    }, [onChangeToSignInInputsHandler])

    const onSubmitSignInHandler = useCallback(() => {
        console.log('signin')
    }, [])

    const onSubmitSignUpHandler = useCallback(() => {
        console.log('signup')
    }, [])


    const onSubmitHandler = useCallback((event: React.FormEvent) => {
        setTriedSubmit(true)
        event.preventDefault()
        if (!formStateIsValid) return

        if (isSignUp) {
            onSubmitSignUpHandler()
        } else {
            onSubmitSignInHandler()
        }
    }, [formStateIsValid, isSignUp, onSubmitSignInHandler, onSubmitSignUpHandler])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container>
                <Main>
                    <h1> {isSignUp ? 'Novo aqui ? crie uma conta!' : 'Bem-vindo de volta, faça o login para continuar!'} </h1>
                    <FormDefault
                        inputsList={formStateList}
                        onSubmit={(event: React.FormEvent) => onSubmitHandler(event)}
                        onChangeHandler={onChangeInputHandler}
                        showErrorMessage={triedSubmit && !formStateIsValid}
                        loading={false}
                    />
                </Main>
                <Footer>
                    {
                        isSignUp
                            ? <span> Já tem uma conta ? <strong onClick={onChangeModalToSignIn}> Clique aqui </strong> para se autenticar. </span>
                            : <span> Não tem uma conta ? <strong onClick={onChangeModalToSignUp}> Clique aqui </strong> para criar. </span>
                    }

                </Footer>
            </Container>
        </Modal>
    )
}

export default AuthModal