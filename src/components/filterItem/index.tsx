import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

import { Container, Input } from './styles'

interface IFilterItemProps {
    label: string;
    type: string;
    objectKey: any;
    setFilter: any;
    min?: number;
    max?: number;
}

const FilterItem: React.FC<IFilterItemProps> = ({ objectKey, label, type, setFilter, min, max }) => {

    const [price, setPrice] = useState<{ min: number, max: number }>({ min: min || 0, max: max || 2000 })
    const [shouldActivePrice, setShouldActivePrice] = useState(false)

    const inputTextTimeout: { current: NodeJS.Timeout | null } = useRef(null)

    const onChangeTextHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (inputTextTimeout.current) clearTimeout(inputTextTimeout.current)

        inputTextTimeout.current = setTimeout(() => {
            return setFilter((prevState: any) => ({ ...prevState, [objectKey]: event.target.value }))
        }, 200)
    }, [objectKey, setFilter])

    const onChangePriceHandler = useCallback(() => {
        return setFilter((prevState: any) => ({ ...prevState, [objectKey.min]: price.min, [objectKey.max]: price.max }))
    }, [objectKey, price, setFilter])

    const filterType = useMemo(() => {
        switch (type) {

            case "text":
                return (
                    <Input type={type} onChange={(event) => onChangeTextHandler(event)} />
                )

            case "price":
                return (
                    <InputRange
                        maxValue={max}
                        minValue={min}
                        value={price}
                        onChange={(value: any) => { setShouldActivePrice(true); setPrice(value) }}
                    />
                )

            default:
                <></>
        }
    }, [max, min, onChangeTextHandler, price, type])

    useEffect(() => {
        if (!shouldActivePrice) return
        onChangePriceHandler()
    }, [onChangePriceHandler, shouldActivePrice])

    return (
        <Container>
            <label htmlFor={label}> {label} </label>
            {filterType}
        </Container>
    )
}

export default FilterItem