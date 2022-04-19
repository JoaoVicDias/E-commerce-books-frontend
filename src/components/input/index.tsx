import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import AsyncSelect from 'react-select/async';

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
    isTouched: boolean;
    onBlur: (name: string) => void;
    optionsItems?: () => void;
    imageUrl?: string;
    inputValue?: any;
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
    isTouched,
    onBlur,
    optionsItems,
}) => {

    const [file, setFile] = useState<any>('')
    const [previewUrl, setPreviewUrl] = useState<any>('')

    const inputImageRef = useRef<any>();

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
                    <input type="hidden" style={{ display: 'none' }} />
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
                        <Button type="button" onClick={onClickImageButton} className="img-button" > Escolha uma imagem de perfil! </Button>
                    </>
                )

            case "textarea":
                return (
                    <Textarea
                        name={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement> | any) => onChange(event.target.value, event.target.name)}
                        placeholder={placeHolder}
                        value={value}
                        showError={isTouched && !isValid}
                        onBlur={() => onBlur(name)}
                    >

                    </Textarea>
                )

            case "price":
                return (
                    <CurrencyInput
                        name={name}
                        placeholder={placeHolder}
                        decimalsLimit={2}
                        onValueChange={(value) => onChange(value, name)}
                        prefix="R$ "
                        className='input_price'
                        onBlur={() => onBlur(name)}
                        value={value}
                    />
                )

            case 'select':
                return (
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={optionsItems}
                        className="select_input"
                        name={name}
                        placeholder={placeHolder}
                        onBlur={() => onBlur(name)}
                        onChange={(event: any) => onChange(event.value, name)}
                        defaultValue={value}
                        isSearchable={false}
                    />
                )

            default:
                return <InputStyle
                    showError={isTouched && !isValid}
                    type={type}
                    name={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value, event.target.name)}
                    placeholder={placeHolder}
                    onBlur={() => onBlur(name)}
                    value={value}
                    autoComplete="on"
                />
        }
    }, [type, previewUrl, name, id, onClickImageButton, placeHolder, value, isTouched, isValid, optionsItems, onChangeInputImage, onChange, onBlur])

    return (
        <Container showError={isTouched && !isValid}>
            <label> {label} </label>
            {inputComponentHandler}
            {isTouched && !isValid && <span> {errorMessage} </span>}
        </Container>
    )
}

export default Input