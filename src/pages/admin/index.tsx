import React, { useCallback, useState } from 'react'
import axios from 'axios'

import FormDefault from '../../components/formDefault'
import MessageModal from '../../components/messageModal'

import { useForm } from '../../hooks/formReduce'
import useUser from '../../hooks/userContext'

import { maskCpf, takeOffMaskCpf } from '../../utils/inputMasks'

import { getApi } from '../../services/api'

import { Container, AdminForm } from './styles'

interface ErrorModalState {
    isOpen: boolean;
    errorMessage: string;
}

const Admin: React.FC = () => {

    const [triedSubmit, setTriedSubmit] = useState<boolean>(false)
    const [errorModal, setErrorModal] = useState<ErrorModalState>({ errorMessage: "", isOpen: false })
    const [loading, setLoading] = useState<boolean>(false)

    const { onSignInHandler } = useUser()

    const { formState, onChangeInputHandler, formStateList, formStateIsValid } = useForm({
        img: {
            type: "file",
            bodyValue: null,
            value: null,
            isValid: false,
            name: "img",
            validationRules: {
                required: true
            }
        },
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
        email: {
            type: "email",
            bodyValue: "",
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
        secretKey: {
            type: "password",
            bodyValue: "",
            value: "",
            errorMessage: "Palavra mágica incorreta, por favor digite algo valido!",
            isValid: false,
            label: "Palavra mágica",
            name: "secretKey",
            placeHolder: "********",
            validationRules: {
                required: true
            }
        },
        password: {
            type: "password",
            bodyValue: "",
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

    const onCloseErrorModal = useCallback(() => setErrorModal(prevState => ({ ...prevState, isOpen: false })), []);

    const onSubmitHandler = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        setTriedSubmit(true)
        if (!formStateIsValid) return

        try {
            setLoading(true)

            const formData = new FormData()

            formData.append("name", formState.formInputs.name.bodyValue)
            formData.append("cpf", formState.formInputs.cpf.bodyValue)
            formData.append("email", formState.formInputs.email.bodyValue)
            formData.append("password", formState.formInputs.password.bodyValue)
            formData.append("secretKey", formState.formInputs.secretKey.bodyValue)
            formData.append("image", formState.formInputs.img.bodyValue)
            formData.append("isAdmin", JSON.stringify(true))

            const res = await axios.post(getApi("/user/sign-up"), formData, { headers: { 'content-type': 'multipart/form-data' } })

            onSignInHandler(res.data)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            console.log(error)
            setErrorModal({
                errorMessage: error.response.data.message || "Algo deu errado, por favor tente novamente!",
                isOpen: true
            })
        }
    }, [formState, formStateIsValid, onSignInHandler])

    return (
        <>
            <MessageModal type="error" isOpen={errorModal.isOpen} message={errorModal.errorMessage} onClose={onCloseErrorModal} />
            <Container>
                <AdminForm>
                    <h4> Bem-vindo a área secreta, espero que você possa entrar aqui! </h4>
                    <FormDefault
                        inputsList={formStateList}
                        onChangeHandler={onChangeInputHandler}
                        onSubmit={(event: React.FormEvent) => onSubmitHandler(event)}
                        showErrorMessage={!formStateIsValid && triedSubmit}
                        contentButton="Criar conta"
                        loading={loading}
                        encType="multipart/form-data"
                    />
                </AdminForm>
            </Container>
        </>
    )
}

export default Admin