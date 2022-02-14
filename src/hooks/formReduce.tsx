import { useCallback, useMemo, useReducer } from 'react'
import { cpf } from 'cpf-cnpj-validator'

const onValidationFormHandler = (validationRules: any, value: string) => {
    let isValid = true

    if (validationRules.isCpf) {
        isValid = cpf.isValid(value) && isValid
    }

    if (validationRules.isEmail) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        isValid = emailRegex.test(value) && isValid
    }

    if (validationRules.required) {
        isValid = value.trim() !== "" && isValid
    }

    if (validationRules.minLength) {
        isValid = value.trim().length >= validationRules.minLength && isValid
    }

    if (validationRules.maxLength) {
        isValid = value.trim().length <= validationRules.maxLength && isValid
    }

    return isValid
}


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'CHANGE_HANDLER':
            return {
                ...state,
                formInputs: {
                    ...state.formInputs,
                    [action.name]: {
                        ...state.formInputs[action.name],
                        value: state.formInputs[action.name].mask
                            ? state.formInputs[action.name].mask(action.value)
                            : action.value,

                        isValid: onValidationFormHandler(state.formInputs[action.name].validationRules, action.value),
                        bodyValue: state.formInputs[action.name].mask
                            ? state.formInputs[action.name].takeOffMask(action.value)
                            : action.value
                    }
                },
            }
        case "SET_INPUTS":
            return {
                ...state,
                formInputs: action.newStateInputs
            }

        default:
            return state
    }
}

export const useForm = (formInputs: any) => {

    const [formState, dispatch] = useReducer(reducer, { formInputs })

    const onChangeInputHandler = useCallback((value: string, name: string) => {
        dispatch({ type: 'CHANGE_HANDLER', value, name })
    }, [])

    const onSetInputsHandler = useCallback((newStateInputs: any) => {
        dispatch({ type: 'SET_INPUTS', newStateInputs })
    }, [])

    const formStateList = useMemo(() => {
        const keys = Object.keys(formState.formInputs)

        return keys.map(key => {
            if (!formState.formInputs[key]) return null
            return {
                ...formState.formInputs[key]
            }
        }).filter(input => input)
    }, [formState.formInputs])

    const formStateIsValid = useMemo(() => {
        return !!!formStateList.find(input => !input.isValid)
    }, [formStateList])

    return { formState, onChangeInputHandler, formStateList, onSetInputsHandler, formStateIsValid }
}


