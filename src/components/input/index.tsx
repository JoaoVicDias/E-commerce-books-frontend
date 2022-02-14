import React, { useCallback, useMemo, useState } from 'react'

import { Container, Textarea, InputStyle } from './styles'

interface IInputProps {
    type: string;
    value: string;
    placeHolder?: string;
    onChange: (value: string, name: string) => void;
    errorMessage: string;
    isValid: boolean;
    label: string;
    name: string;
}

const Input: React.FC<IInputProps> = ({
    errorMessage,
    isValid,
    label,
    name,
    onChange,
    type,
    value,
    placeHolder
}) => {

    const [isTouched, setIsTouched] = useState<boolean>(false)

    const onBlurInputHandler = useCallback(() => {
        return setIsTouched(true)
    }, [])

    const inputComponentHandler = useMemo(() => {
        switch (type) {
            case "textarea":
                return (
                    <Textarea
                        name={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement> | any) => onChange(event.target.value, event.target.name)}
                        placeholder={placeHolder}
                        value={value}
                    >

                    </Textarea>
                )

            default:
                return <InputStyle
                    showError={isTouched && !isValid}
                    type={type}
                    name={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value, event.target.name)}
                    placeholder={placeHolder}
                    onBlur={onBlurInputHandler}
                    onInput={() => 'testando'}
                    value={value}
                />
        }
    }, [type, name, placeHolder, value, isTouched, isValid, onBlurInputHandler, onChange])

    return (
        <Container>
            <label> {label} </label>
            {inputComponentHandler}
            {isTouched && !isValid && <span> {errorMessage} </span>}
        </Container>
    )
}

export default Input