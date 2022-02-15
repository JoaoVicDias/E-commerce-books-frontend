import React, { useCallback, useState } from 'react'

import Modal from '../modal'
import FormDefault from '../formDefault'
import MessageModal from '../messageModal'

import { useForm } from '../../hooks/formReduce'

import { maskCpf, takeOffMaskCpf } from '../../utils/inputMasks'

import { Container, Main, Footer } from './styles'
import api from '../../services/api'

interface IAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IErrorState {
    isOpen: boolean;
    message: string;
}

const AuthModal: React.FC<IAuthModalProps> = ({ isOpen, onClose }) => {

    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [triedSubmit, setTriedSubmit] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<IErrorState>({ isOpen: false, message: "" })
    const [success, setSuccess] = useState<boolean>(false)

    const { formState, onChangeInputHandler, formStateList, onSetInputsHandler, formStateIsValid } = useForm({
        email: {
            type: "email",
            value: "",
            bodyValue: "",
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
            bodyValue: "",
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
        let newInputs: any = {}

        newInputs = {
            ...formState.formInputs,
            name: {
                type: "text",
                bodyValue: "",
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
                bodyValue: "",
                value: "",
                mask: maskCpf,
                takeOffMask: takeOffMaskCpf,
                errorMessage: "CPF incorreto, por favor digite um CPF valido!",
                isValid: false,
                label: "CPF",
                name: "cpf",
                placeHolder: "000.000.000-00",
                validationRules: {
                    isCpf: true
                }
            },
            img: {
                type: "file",
                value: null,
                bodyValue: null,
                isValid: false,
                name: "img",
                validationRules: {
                    required: true
                }
            },
        }

        return onSetInputsHandler(newInputs)

    }, [formState.formInputs, onSetInputsHandler])

    const onChangeToSignInInputsHandler = useCallback(() => {
        let newInputs: any = {}

        newInputs = {
            ...formState.formInputs,
            name: null,
            cpf: null,
            img: null
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

    const onSubmitSignInHandler = useCallback(async () => {
        try {
            setLoading(true)

            const formData = {
                email: formState.formInputs.email.bodyValue,
                password: formState.formInputs.password.bodyValue
            }

            await api.post("/user/sign-in", formData)

            setLoading(false)
            setSuccess(true)
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            setError({
                isOpen: true,
                message: error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!"
            })
        }
    }, [formState.formInputs.email.bodyValue, formState.formInputs.password.bodyValue])

    const onSubmitSignUpHandler = useCallback(async () => {
        try {
            setLoading(true)

            const formData = new FormData();

            formData.append("name", formState.formInputs.name.bodyValue)
            formData.append("cpf", formState.formInputs.cpf.bodyValue)
            formData.append("email", formState.formInputs.email.bodyValue)
            formData.append("password", formState.formInputs.password.bodyValue)
            formData.append("image", formState.formInputs.img.bodyValue)

            await api.post("/user/sign-up", formData)

            setLoading(false)
            setSuccess(true)

        } catch (error: any) {
            console.log(error)
            setLoading(false)
            setError({
                isOpen: true,
                message: error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!"
            })
        }
    }, [formState])

    const onCloseModalErrorHandler = useCallback(() => setError(prevState => ({ ...prevState, isOpen: false })), [])

    const onCloseModalSuccessHandler = useCallback(() => setSuccess(false), [])

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
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Container>
                    <Main>
                        <h1> {isSignUp ? 'Novo aqui ? crie uma conta!' : 'Bem-vindo de volta, faça o login para continuar!'} </h1>
                        <FormDefault
                            inputsList={formStateList}
                            onSubmit={(event: React.FormEvent) => onSubmitHandler(event)}
                            onChangeHandler={onChangeInputHandler}
                            showErrorMessage={triedSubmit && !formStateIsValid}
                            loading={loading}
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
            <MessageModal
                isOpen={success}
                message={isSignUp ? "Conta criada com sucesso!" : "Login feito com sucesso!"}
                onClose={onCloseModalSuccessHandler}
                type="success"
            />
            <MessageModal
                isOpen={error.isOpen}
                message={error.message}
                onClose={onCloseModalErrorHandler}
                type="error"
            />
        </>
    )
}

export default AuthModal