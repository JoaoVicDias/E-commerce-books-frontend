import React, { useCallback, useMemo, useRef } from 'react'

import { Container, Input } from './styles'

interface IFilterItemProps {
    label: string;
    type: string;
    objectKey: string;
    setFilter: any;
}

const FilterItem: React.FC<IFilterItemProps> = ({ objectKey, label, type, setFilter }) => {

    const inputTextTimeout: { current: NodeJS.Timeout | null } = useRef(null)

    const onChangeTextHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (inputTextTimeout.current) clearTimeout(inputTextTimeout.current)

        inputTextTimeout.current = setTimeout(() => {
            return setFilter((prevState: any) => ({ ...prevState, [objectKey]: event.target.value }))
        }, 200)
    }, [objectKey, setFilter])

    const filterType = useMemo(() => {
        switch (type) {

            case "text":
                return (
                    <Input type={type} onChange={(event) => onChangeTextHandler(event)} />
                )

            default:
                <></>
        }
    }, [onChangeTextHandler, type])

    return (
        <Container>
            <label htmlFor={label}> {label} </label>
            {filterType}
        </Container>
    )
}

export default FilterItem