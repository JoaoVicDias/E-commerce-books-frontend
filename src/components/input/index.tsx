import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import Button from '../button'

import { Container, ImgInput, Textarea, InputStyle } from './styles'

interface IInputProps {
    type: string;
    value: string;
    placeHolder?: string;
    onChange: (value: any, name: string) => void;
    errorMessage?: string;
    isValid: boolean;
    label: string;
    name: string;
    id?: string;
}

const Input: React.FC<IInputProps> = ({
    errorMessage,
    isValid,
    label,
    name,
    onChange,
    type,
    value,
    placeHolder,
    id,
}) => {

    const [isTouched, setIsTouched] = useState<boolean>(false)
    const [file, setFile] = useState<any>('')
    const [previewUrl, setPreviewUrl] = useState<any>('')

    const inputImageRef = useRef<any>();

    const onBlurInputHandler = useCallback(() => {
        return setIsTouched(true)
    }, [])

    const onClickImageButton = useCallback(() => {
        inputImageRef.current?.click()
    }, [])

    const onChangeInputImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length === 1) {
            setFile(event.target.files[0])
            onChange(event.target.files[0], event.target.name)
        }

    }, [onChange])

    useEffect(() => {
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const inputComponentHandler = useMemo(() => {
        switch (type) {
            case "hidden":
                return (
                    <input type="hidden" style={{display: 'none'}} />
                )
            case "file":
                return (
                    <>
                        {previewUrl && <ImgInput src={previewUrl} alt={name} />}
                        <input
                            type={type}
                            ref={inputImageRef}
                            id={id}
                            name={name}
                            accept=".jpg, .png, .jpeg"
                            style={{ display: 'none' }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInputImage(event)}
                        />
                        <Button type="button" onClick={onClickImageButton} className="img-button" > Escolha uma imagem! </Button>
                    </>
                )

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
                    value={value}
                    autoComplete="on"
                />
        }
    }, [type, previewUrl, name, id, isTouched, isValid, onClickImageButton, placeHolder, value, onBlurInputHandler, onChangeInputImage, onChange])

    return (
        <Container>
            <label> {label} </label>
            {inputComponentHandler}
            {isTouched && !isValid && <span> {errorMessage} </span>}
        </Container>
    )
}

export default Input